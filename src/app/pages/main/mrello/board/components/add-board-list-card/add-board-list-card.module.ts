import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddBoardListCardComponent } from './add-board-list-card.component';

@NgModule({
  declarations: [AddBoardListCardComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TextFieldModule],
  exports: [AddBoardListCardComponent],
})
export class AddBoardListCardModule {}
