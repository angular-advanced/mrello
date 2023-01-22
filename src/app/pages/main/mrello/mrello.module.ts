import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BoardCardDetailModule } from './board-card/board-card-detail/board-card-detail.module';
import { BoardCardModule } from './board-card/board-card.module';
import { BoardModule } from './board/board.module';
import { BoardsModule } from './boards/boards.module';

import { MrelloRoutingModule } from './mrello-routing.module';
import { MrelloComponent } from './mrello.component';

@NgModule({
  declarations: [MrelloComponent],
  imports: [CommonModule, MrelloRoutingModule, BoardsModule, BoardModule, BoardCardDetailModule, BoardCardModule],
})
export class MrelloModule {}
