import { ActionReducer } from '@ngrx/store';

import { AppState } from '../store/store.state.model';

export const debug =
  (reducer: ActionReducer<AppState>): ActionReducer<AppState> =>
  (state, action: any) => {
    const newState = reducer(state, action);
    console.log(`[DEBUG] action: ${action.type}`, {
      payload: action.payload,
      oldState: state,
      newState,
    });
    return newState;
  };
