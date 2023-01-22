import { createAction, props } from '@ngrx/store';
import { IBoard, IBoardList, IBoardListCard } from 'src/app/interfaces/Board';
import { PaginationMeta } from 'src/app/interfaces/Common';

const fetchBoards = {
  request: createAction('[Board] Fetch Boards'),
  success: createAction(
    '[Board] Fetch Boards Success',
    props<{ payload: { items: IBoard[]; meta: PaginationMeta } }>(),
  ),
  failure: createAction('[Board] Fetch Boards Failure', props<{ payload: { error: string } }>()),
};

const fetchBoard = {
  request: createAction('[Board] Fetch Board'),
  success: createAction('[Board] Fetch Board Success', props<{ payload: { items: IBoard[]; meta: PaginationMeta } }>()),
  failure: createAction('[Board] Fetch Board Failure', props<{ payload: { error: string } }>()),
};

const addBoard = {
  request: createAction('[Board] Add Board', props<{ payload: IBoard }>()),
  success: createAction('[Board] Add Board Success', props<{ payload: IBoard }>()),
  failure: createAction('[Board] Add Board Failure', props<{ payload: { error: string } }>()),
};

const addBoardList = {
  request: createAction('[Board] Add Board List', props<{ payload: IBoardList }>()),
  success: createAction('[Board] Add Board List Success', props<{ payload: IBoardList }>()),
  failure: createAction('[Board] Add Board List Failure', props<{ payload: { error: string } }>()),
};

const addBoardListCard = {
  request: createAction('[Board] Add Board List Card', props<{ payload: IBoardListCard }>()),
  success: createAction('[Board] Add Board List Card Success', props<{ payload: IBoardListCard }>()),
  failure: createAction('[Board] Add Board List Card Failure', props<{ payload: { error: string } }>()),
};

export default {
  fetchBoards,
  fetchBoard,
  addBoard,
  addBoardList,
  addBoardListCard,
};
