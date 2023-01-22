import * as moment from 'moment';
import { v4 } from 'uuid';
import { LoadingState, PaginationMeta } from './Common';

export interface IBoard {
  id: string;
  title: string;
  description?: string | null;
  lists: IBoardList[];
  createdAt: string;
  updatedAt: string;
}

export class Board implements IBoard {
  id: string;
  title: string;
  description?: string | null;
  lists: IBoardList[];
  createdAt: string;
  updatedAt: string;

  constructor(board?: Partial<IBoard>) {
    this.id = v4();
    this.title = board?.title || 'Untitled Board';
    this.description = board?.description || null;
    this.lists = [];
    this.createdAt = moment().toISOString();
    this.updatedAt = moment().toISOString();
  }
}

export interface IBoardList {
  id: string;
  boardId: string;
  position: number;
  title: string;
  cards: IBoardListCard[];
  createdAt: string;
  updatedAt: string;

  isFocused?: boolean;
}

export class BoardList implements IBoardList {
  id: string;
  boardId: string;
  title: string;
  position: number;
  cards: IBoardListCard[];
  createdAt: string;
  updatedAt: string;

  constructor(boardList: Partial<IBoardList> & Pick<IBoardList, 'boardId' | 'position'>) {
    this.id = v4();
    this.boardId = boardList.boardId;
    this.title = boardList?.title || 'Untitled List';
    this.position = boardList.position;
    this.cards = [];
    this.createdAt = moment().toISOString();
    this.updatedAt = moment().toISOString();
  }
}

export interface IBoardListCard {
  id: string;
  boardId: string;
  listId: string;
  position: number;
  title: string;
  description: string | null;
  due: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

export class BoardListCard implements IBoardListCard {
  id: string;
  boardId: string;
  listId: string;
  title: string;
  description: string | null;
  position: number;
  due: string | null;
  createdAt: string | null;
  updatedAt: string | null;

  constructor(boardList: Partial<IBoardListCard> & Pick<IBoardListCard, 'boardId' | 'listId' | 'position'>) {
    this.id = v4();
    this.boardId = boardList.boardId;
    this.listId = boardList.listId;
    this.title = boardList?.title || 'Untitled List Card';
    this.description = boardList?.description || null;
    this.position = boardList.position;
    this.due = boardList?.due || null;
    this.createdAt = moment().toISOString();
    this.updatedAt = moment().toISOString();
  }
}

export interface BoardStateModel extends LoadingState {
  listData: {
    [key: string]: IBoard;
  };
  meta: PaginationMeta;
}
