import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts/highmaps';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { CovidMapService } from './covid-map.service';

const geojson = require('@highcharts/map-collection/custom/world.geo.json');

const MapType = {
  Confirmed: 'confirmed',
  Death: 'deaths'
};

@Component({
  selector: 'app-covid-map',
  templateUrl: './covid-map.component.html',
  styleUrls: ['./covid-map.component.sass']
})

export class CovidMapComponent implements OnInit {
  public Highcharts = Highcharts;
  public covidData: any = {};
  public worldPopulation: any[] = [];
  public sltMapType = MapType.Confirmed;
  public chartOptions$ = new BehaviorSubject<any>({});
  public mapModes = [
    {
      key: MapType.Confirmed,
      day0Value: 200,
      header: 'Confirmed Covid-19 Cases',
      name: 'Confirmed cases',
      valueSuffix: 'confirmed cases'
    },
    {
      key: MapType.Death,
      day0Value: 10,
      header: 'Deaths caused by Covid-19',
      name: 'Deaths',
      valueSuffix: 'deaths'
    }
  ];
  public sltMapMode;

  constructor(
    private covidMapService: CovidMapService
  ) { }

  ngOnInit(): void {
    // Init map
    this.sltMapMode = this.mapModes[0];
    const param = { covidMapData: [], maxValue: 0 };
    const initMapOptions = this.getWorldmapOptions(param);
    this.chartOptions$.next(initMapOptions);

    const covidDataRq = this.covidMapService.getCovidData();
    const populationRq = this.covidMapService.getWorldPopulation();

    forkJoin([covidDataRq, populationRq]).subscribe({
      next: ([covidData, population]) => {
        this.covidData = covidData;
        this.worldPopulation = population;
        this.updateCovidMap();
      }
    });
  }

  updateCovidMap = () => {
    const { worldMapData, covidMapData, maxValue } = this.calculateMapData();
    const param = { worldMapData, covidMapData, maxValue };
    const updatedMapOptions = this.getWorldmapOptions(param);
    this.chartOptions$.next(updatedMapOptions);
  };

  onChangeMapType = (sltMapKey: string) => {
    this.sltMapMode = this.mapModes.find(item => item.key === sltMapKey);
    this.updateCovidMap();
  };

  // This code is inherited from
  // offical example: shorturl.at/ekwzW
  calculateMapData = () => {
    const { covidData, worldPopulation, sltMapMode } = this;
    const worldMapData = { ...geojson };
    const popByCtrNameDict = {};

    // Process country data
    worldMapData.features.forEach(country => {
      const hcKey = country.properties['hc-key'];
      const name = country.properties.name;
      country.id = hcKey;
      country.name = name;
      country.flag = country.id.replace('UK', 'GB').toLowerCase();

      const foundPop = worldPopulation.find(item => hcKey.toUpperCase() === item.code);
      popByCtrNameDict[country.name] = (foundPop && foundPop.z) || null;
    });

    // Calculate mapData
    covidData['United States of America'] = covidData.US;
    covidData['South Korea'] = covidData['Korea, South'];
    covidData['Czech Republic'] = covidData.Czechia;

    let maxValue = 0;
    const covidMapData = Object.keys(covidData).map(name => {
      const dataItems = covidData[name];
      const [lastItem] = dataItems.slice(-1);
      const total = lastItem && lastItem[sltMapMode.key];
      if (total && popByCtrNameDict[name]) {
        const value = total / popByCtrNameDict[name];
        maxValue = Math.max(value, maxValue);
        return { name, value, total };
      }
      return { name, value: null, total: null };
    });
    return { worldMapData, covidMapData, maxValue };
  };

  getWorldmapOptions = ({
    worldMapData = geojson,
    covidMapData = [],
    maxValue = 0
  }) => {
    const mapMode = this.sltMapMode;
    return {
      chart: {
        type: 'map',
        spacingLeft: 1,
        spacingRight: 1
      },
      title: {
        text: null
      },

      mapNavigation: {
        enabled: true,
        buttonOptions: {
          verticalAlign: 'bottom'
        }
      },

      colorAxis: {
        max: maxValue
      },

      tooltip: {
        pointFormat: '<b>{point.total}</b> ' + mapMode.valueSuffix + '<br>' +
          '<b>{point.value:.2f}</b> per 1000 inhabitants<br>'
      },
      legend: {
        title: {
          text: 'Per 1000 inhabitants',
          style: {
            fontWeight: 'normal'
          }
        }
      },

      series: [{
        id: 'map',
        data: covidMapData,
        mapData: worldMapData,
        joinBy: ['name', 'name'],
        cursor: 'pointer',
        states: {
          select: {
            color: undefined,
            borderColor: '#333'
          }
        },
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.05)'
      }]

    };
  };

}
