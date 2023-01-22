import { DialogRef } from '@angular/cdk/dialog';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { isEmpty } from 'lodash';
import * as moment from 'moment';
import { Subject, takeUntil } from 'rxjs';
import { selectBoardByBoardIdParam, selectBoardListCardByCardIdParam } from 'src/app/core/store/board/board.selectors';

@Component({
  selector: 'app-board-card-detail',
  templateUrl: './board-card-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardCardDetailComponent implements OnInit, OnDestroy {
  @ViewChild('labelInput') labelInput!: ElementRef<HTMLInputElement>;
  board$ = this.store.select(selectBoardByBoardIdParam);
  card$ = this.store.select(selectBoardListCardByCardIdParam);
  form = this._fb.group({
    id: [''],
    title: ['', Validators.required],
    description: [''],
  });

  private _unsubscribeAll = new Subject<any>();

  /**
   * Constructor
   */
  constructor(
    public store: Store,
    public _dialogRef: DialogRef<BoardCardDetailComponent>,
    private _cdr: ChangeDetectorRef,
    private _fb: FormBuilder,
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.card$.pipe(takeUntil(this._unsubscribeAll)).subscribe((card) => {
      if (!isEmpty(card)) {
        this.form.patchValue(card);
      }
    });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Check if the given date is overdue
   */
  isOverdue(date: string): boolean {
    return moment(date, moment.ISO_8601).isBefore(moment(), 'days');
  }

  /**
   * Track by function for ngFor loops
   *
   * @param index
   * @param item
   */
  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  close() {
    this._dialogRef.close();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Read the given file for demonstration purposes
   *
   * @param file
   */
  private _readAsDataURL(file: File): Promise<any> {
    // Return a new promise
    return new Promise((resolve, reject) => {
      // Create a new reader
      const reader = new FileReader();

      // Resolve the promise on success
      reader.onload = (): void => {
        resolve(reader.result);
      };

      // Reject the promise on error
      reader.onerror = (e): void => {
        reject(e);
      };

      // Read the file as the
      reader.readAsDataURL(file);
    });
  }
}
