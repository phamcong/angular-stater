import { Action, createReducer, on } from '@ngrx/store';
import { DATA_ACTIONS } from './data.actions';

export interface AppState {
  data: {
    chartData: any[];
  };
}

export interface DataState {
  chartData: any[];
}

export const initDataState: DataState = {
  chartData: []
};

const dataReducer = createReducer(
  initDataState,
  on(DATA_ACTIONS.GET_CHART_DATA_SUCCESS, (state, action) => {
    return {
      ...state,
      chartData: action.chartData
    };
  })
);

export function reducer(state: DataState | undefined, action: Action) {
  return dataReducer(state, action);
}
