import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddBoardListComponent } from './add-board-list.component';

@NgModule({
  declarations: [AddBoardListComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TextFieldModule],
  exports: [AddBoardListComponent],
})
export class AddBoardListModule {}
