import { Dialog } from '@angular/cdk/dialog';
import { ScrollStrategyOptions } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { merge, Subject, takeUntil } from 'rxjs';
import { BoardCardDetailComponent } from './board-card-detail/board-card-detail.component';

@Component({
  selector: 'app-board-card',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardCardComponent implements OnInit, OnDestroy {
  private _unsubscribeAll = new Subject<any>();
  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _dialog: Dialog,
    private _sso: ScrollStrategyOptions,
    private _cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    const boardCardDetail = this._dialog.open(BoardCardDetailComponent, {
      // panelClass: ['max-w-screen', 'w-full', 'sm:max-w-192', 'rounded', 'overflow-y-auto'],
      autoFocus: false,
      scrollStrategy: this._sso.noop(),
    });

    merge(boardCardDetail.closed, boardCardDetail.backdropClick)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() =>
        this._router.navigate(['./../..'], {
          relativeTo: this._activatedRoute,
        }),
      );
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
