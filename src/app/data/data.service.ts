import { HttpClient } from '@angular/common/http'
import { Injectable } from "@angular/core"
import { map } from "rxjs/operators"

@Injectable()
export class DataService {
  constructor(
    private http: HttpClient
  ) { }

  getEvalationData = (limit: number = 200) => {
    const apiUrl = 'https://raw.githubusercontent.com/webDepRes/data-source/main/elevationData.json'
    return this.http.get(apiUrl)
      .pipe(
        map((results: any[]) => results.slice(0, limit))
      )
  }
}
