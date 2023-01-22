import { DialogModule } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BoardCardDetailComponent } from './board-card-detail.component';

@NgModule({
  declarations: [BoardCardDetailComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, DialogModule],
  exports: [BoardCardDetailComponent],
})
export class BoardCardDetailModule {}
