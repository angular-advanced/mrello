import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, of } from 'rxjs';
import { initialMetaState } from 'src/app/interfaces/Common';
import boardActions from './board.actions';
import { boardsList } from './board.data';

@Injectable()
export class BoardEffects {
  fetchBoards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(boardActions.fetchBoards.request),
      exhaustMap(() =>
        of(boardActions.fetchBoards.success({ payload: { items: boardsList, meta: initialMetaState } })),
      ),
    ),
  );

  addBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(boardActions.addBoard.request),
      exhaustMap(({ payload }) => of(boardActions.addBoard.success({ payload }))),
    ),
  );

  addBoardList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(boardActions.addBoardList.request),
      exhaustMap(({ payload }) => of(boardActions.addBoardList.success({ payload }))),
    ),
  );

  addBoardListCard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(boardActions.addBoardListCard.request),
      exhaustMap(({ payload }) => of(boardActions.addBoardListCard.success({ payload }))),
    ),
  );

  constructor(private actions$: Actions) {}
}
