import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import * as Highcharts from 'highcharts'
import { BehaviorSubject } from 'rxjs'
import { AppState } from 'src/app/data/data.reducer'
import { randomTaskList } from 'src/app/data/data.utils'
import { DATA_ACTIONS } from './../../data/data.actions'
import { DataEffects } from './../../data/data.effects'
import { getChartOptions } from './data-viz.utils'

const ChartType = {
  Bar: 'bar',
  Column: 'column'
}

@Component({
  selector: 'app-data-viz',
  templateUrl: './data-viz.component.html',
  styleUrls: ['./data-viz.component.sass']
})

export class DataVizComponent implements OnInit {
  public chartData$ = this.store.select(state => state.data.chartData)
  public isHighcharts = typeof Highcharts === 'object';
  public Highcharts: typeof Highcharts = Highcharts;
  public chartOptions$ = new BehaviorSubject<any>(getChartOptions(ChartType.Bar, []))
  public chartModes = [
    { label: 'Bar', key: ChartType.Bar, icon: 'bi bi-filter-left' },
    { label: 'Column', key: ChartType.Column, icon: 'bi bi-bar-chart' },
  ]
  public chartData = []
  public sltChartType: string = ChartType.Bar

  public taskList = randomTaskList(100)

  constructor(
    private store: Store<AppState>,
    private dataEffects: DataEffects
  ) { }

  ngOnInit(): void {
    this.store.dispatch(DATA_ACTIONS.GET_CHART_DATA())
    this.chartData$.subscribe({
      next: chartData => {
        this.chartData = chartData
        this.updateChart()
      }
    })
  }

  onChangeChartType = (type: string) => {
    this.sltChartType = type
    this.updateChart()
  }
  updateChart = () => {
    const type = this.sltChartType
    const chartData = this.chartData
    const updatedOptions = getChartOptions(type, chartData)
    this.chartOptions$.next(updatedOptions)
  }
}
