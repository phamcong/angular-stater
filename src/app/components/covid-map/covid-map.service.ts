import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CovidMapService {
  constructor(
    private http: HttpClient
  ) { }

  getCovidData = () => {
    const apiUrl = 'https://pomber.github.io/covid19/timeseries.json';
    return this.http.get(apiUrl);
  }

  getWorldPopulation = () => {
    const apiUrl = 'https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/world-population.json';
    return this.http.get(apiUrl) as Observable<any[]>;
  }

}

