import { Action, createFeatureSelector, createReducer, on } from '@ngrx/store';
import { chain, keyBy } from 'lodash';
import { BoardStateModel } from 'src/app/interfaces/Board';
import { initialMetaState } from 'src/app/interfaces/Common';
import boardActions from './board.actions';
import { boardsList } from './board.data';

export const selectBoardPageState = createFeatureSelector<BoardStateModel>('boards');

export const initialState: BoardStateModel = {
  listData: chain(boardsList)
    // .map((board) => ({
    //   ...board,
    //   lists: chain(board.lists)
    //     .map((list) => ({
    //       ...list,
    //       cards: keyBy(list.cards, (card) => card.id),
    //     }))
    //     .keyBy((list) => list.id)
    //     .value(),
    // }))
    // .map((board) => ({
    //   ...board,
    //   lists: chain(board.lists)
    //     .map((list) => ({
    //       ...list,
    //       cards: keyBy(list.cards, (card) => card.id),
    //     }))
    //     .keyBy((list) => list.id)
    //     .value(),
    // }))
    .keyBy((board) => board.id)
    .value(),
  meta: initialMetaState,
  isLoading: true,
  isSuccess: false,
  isFailure: false,
};

const reducer = createReducer(
  initialState,

  /**
   * Fetch Boards
   */
  on(boardActions.fetchBoards.request, (state) => ({
    ...state,
    isLoading: true,
    isSuccess: false,
    isFailure: false,
  })),
  on(boardActions.fetchBoards.success, (state, { payload }) => ({
    ...state,
    listData: keyBy(payload.items, (contact) => contact.id),
    meta: payload.meta,
    isLoading: false,
    isSuccess: true,
    isFailure: false,
  })),
  on(boardActions.fetchBoards.failure, (state, _) => ({
    ...state,
    isLoading: false,
    isSuccess: false,
    isFailure: true,
  })),

  /**
   * Add Board
   */
  on(boardActions.addBoard.request, (state) => ({
    ...state,
  })),
  on(boardActions.addBoard.success, (state, { payload }) => ({
    ...state,
    listData: {
      ...state.listData,
      [payload.id]: payload,
    },
  })),
  on(boardActions.addBoard.failure, (state, _) => ({
    ...state,
  })),

  /**
   * Add Board List
   */
  on(boardActions.addBoardList.request, (state) => ({
    ...state,
  })),
  on(boardActions.addBoardList.success, (state, { payload }) => ({
    ...state,
    listData: {
      ...state.listData,
      [payload.boardId]: {
        ...state.listData[payload.boardId],
        lists: [...state.listData[payload.boardId].lists, payload],
      },
    },
  })),
  on(boardActions.addBoardList.failure, (state, _) => ({
    ...state,
  })),

  /**
   * Add Board List Card
   */
  on(boardActions.addBoardListCard.request, (state) => ({
    ...state,
  })),
  on(boardActions.addBoardListCard.success, (state, { payload }) => ({
    ...state,
    listData: {
      ...state.listData,
      [payload.boardId]: {
        ...state.listData[payload.boardId],
        lists: state.listData[payload.boardId].lists.map((list) => {
          if (list.id === payload.listId) {
            return { ...list, cards: [...list.cards, payload] };
          }
          return list;
        }),
      },
    },
  })),
  on(boardActions.addBoardListCard.failure, (state, _) => ({
    ...state,
  })),
);

export default (state: BoardStateModel | undefined, action: Action): BoardStateModel => reducer(state, action);
