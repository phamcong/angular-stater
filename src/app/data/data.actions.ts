import { createAction, props } from "@ngrx/store"

export const DATA_ACTIONS = {
  GET_ELEVATION_DATA_SUCCESS: createAction(
    'get_elevation_data_success',
    props<{ evalData: any[] }>()
  )
}
