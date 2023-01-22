import { createSelector } from '@ngrx/store';
import { find, toArray } from 'lodash';
import { selectRouteParams } from '../../router/router.selectors';
import { selectBoardPageState } from './board.reducer';

export const selectBoards = createSelector(selectBoardPageState, (state) => toArray(state.listData));
export const selectBoardsPaginationMeta = createSelector(selectBoardPageState, (state) => state.meta);
export const selectBoardsLoadingStates = createSelector(
  selectBoardPageState,
  ({ isLoading, isSuccess, isFailure }) => ({ isLoading, isSuccess, isFailure }),
);

export const selectBoardByBoardIdParam = createSelector(
  selectBoardPageState,
  selectRouteParams,
  (state, params) => state.listData[params['boardId']],
);

export const selectBoardListByListIdParam = createSelector(
  selectBoardByBoardIdParam,
  selectRouteParams,
  (board, params) => find(board.lists, { id: params['listId'] }),
);

export const selectBoardListCardByCardIdParam = createSelector(
  selectBoardListByListIdParam,
  selectRouteParams,
  (list, params) => find(list?.cards, { id: params['cardId'] }),
);
