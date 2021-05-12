import { createReducer, on } from "@ngrx/store"
import { DATA_ACTIONS } from './data.actions'

export interface AppState {
  data: {
    evalationData: any[]
  }
}

export interface DataState {
  evalationData: any[]
}

export const initDataState = {
  evalationData: []
}


export const dataReducer = createReducer(
  initDataState,
  on(DATA_ACTIONS.GET_ELEVATION_DATA_SUCCESS, (state, action) => {
    return {
      ...state,
      evalationData: action.evalData
    }
  })
)