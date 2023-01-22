import { RouterReducerState } from '@ngrx/router-store';
import { BoardStateModel } from 'src/app/interfaces/Board';
import { RouterStateUrl } from '../router/route.model';

export interface AppState {
  boards: BoardStateModel;
  router: RouterReducerState<RouterStateUrl>;
}
