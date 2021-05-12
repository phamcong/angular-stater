import { Injectable } from "@angular/core"
import { Actions, createEffect } from '@ngrx/effects'
import { EMPTY } from "rxjs"
import { catchError, map, mergeMap } from "rxjs/operators"
import { DATA_ACTIONS } from './data.actions'
import { DataService } from "./data.service"

@Injectable()
export class DataEffects {
  getEvalationData$ = createEffect(
    () => this.actions$.pipe(
      mergeMap(() => this.dataService.getEvalationData()
        .pipe(
          map(evalData => ({ type: DATA_ACTIONS.GET_ELEVATION_DATA_SUCCESS, payload: evalData })),
          catchError(() => EMPTY)
        ))
    ),
    { dispatch: false }
  )

  constructor(
    private actions$: Actions,
    private dataService: DataService
  ) { }
}
