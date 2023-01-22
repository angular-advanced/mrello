import { routerReducer } from '@ngrx/router-store';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { debug } from '../meta-reducers/debug.reducer';
import boardReducer from './board/board.reducer';
import { AppState } from './store.state.model';

export const reducers: ActionReducerMap<AppState> = {
  boards: boardReducer,
  router: routerReducer,
};

export const metaReducers: MetaReducer<AppState>[] = [];

if (!environment.production) {
  metaReducers.unshift(debug);
}
