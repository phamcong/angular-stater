import { createAction, props } from '@ngrx/store';

export const DATA_ACTIONS = {
  GET_CHART_DATA: createAction('get_chart_data'),
  GET_CHART_DATA_SUCCESS: createAction('get_chart_data_success', props<{ chartData: any[]; }>())
};
