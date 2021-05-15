import { Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { Store } from "@ngrx/store"
import { EMPTY } from "rxjs"
import { catchError, exhaustMap, map } from "rxjs/operators"
import { DATA_ACTIONS } from './data.actions'
import * as fromData from "./data.reducer"
import { DataService } from "./data.service"

@Injectable()
export class DataEffects {
  getEvalationData$ = createEffect(
    () => this.actions$.pipe(
      ofType(DATA_ACTIONS.GET_CHART_DATA),
      exhaustMap(() => this.dataService.getScatterPlotData()
        .pipe(
          map((chartData: any[]) => {
            console.log(chartData)
            return DATA_ACTIONS.GET_CHART_DATA_SUCCESS({ chartData })
          }),
          catchError(() => EMPTY)
        ))
    ),
    { dispatch: true }
  )

  constructor(
    private actions$: Actions,
    private dataService: DataService,
    private store: Store<fromData.DataState>
  ) { }
}
