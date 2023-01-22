import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardCardComponent } from './board-card/board-card.component';
import { BoardComponent } from './board/board.component';
import { BoardsComponent } from './boards/boards.component';
import { MrelloComponent } from './mrello.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'boards' },
  {
    path: 'boards',
    component: MrelloComponent,
    children: [
      {
        path: '',
        component: BoardsComponent,
      },
      {
        path: ':boardId',
        component: BoardComponent,
        children: [
          {
            path: 'list/:listId',
            component: BoardCardComponent,
            children: [
              {
                path: 'card/:cardId',
                component: BoardCardComponent,
              },
            ],
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MrelloRoutingModule {}
