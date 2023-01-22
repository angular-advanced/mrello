import { DialogModule } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BoardCardComponent } from './board-card.component';

@NgModule({
  declarations: [BoardCardComponent],
  imports: [CommonModule, DialogModule],
  exports: [BoardCardComponent],
})
export class BoardCardModule {}
