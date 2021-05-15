import { HttpClient } from '@angular/common/http'
import { Injectable } from "@angular/core"

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(
    private http: HttpClient
  ) { }

  getScatterPlotData = () => {
    return this.http.get('assets/scatter-plot.json')
  }
}
