import { DragDropModule } from '@angular/cdk/drag-drop';
import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { BoardComponent } from './board.component';
import { AddBoardListCardModule } from './components/add-board-list-card/add-board-list-card.module';
import { AddBoardListModule } from './components/add-board-list/add-board-list.module';

@NgModule({
  declarations: [BoardComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TextFieldModule,
    DragDropModule,
    AddBoardListCardModule,
    AddBoardListModule,
  ],
})
export class BoardModule {}
