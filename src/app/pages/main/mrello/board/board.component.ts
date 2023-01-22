import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { cloneDeep } from 'lodash';
import { lastValueFrom, map, Subject, take, takeUntil } from 'rxjs';
import boardActions from 'src/app/core/store/board/board.actions';
import { selectBoardByBoardIdParam } from 'src/app/core/store/board/board.selectors';
import { BoardList, BoardListCard, IBoardList, IBoardListCard } from 'src/app/interfaces/Board';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardComponent implements OnInit, OnDestroy {
  @ViewChild('boardListGroup') boardListGroup!: ElementRef<HTMLElement>;
  board$ = this._store.select(selectBoardByBoardIdParam).pipe(map((board) => cloneDeep(board)));

  private _unsubscribeAll = new Subject<any>();
  constructor(
    private _store: Store,
    private _actions: Actions,
    private _cdr: ChangeDetectorRef,
    private _fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this._actions.pipe(ofType(boardActions.addBoardList.success), takeUntil(this._unsubscribeAll)).subscribe(() => {
      setTimeout(() => {
        this.scrollToRightListSection();
      });
    });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  renameList(listTitleInput: HTMLElement): void {
    // Use timeout so it can wait for menu to close
    setTimeout(() => {
      listTitleInput.focus();
    });
  }

  async addList(title: string) {
    const board = await lastValueFrom(this.board$.pipe(take(1)));
    const payload = new BoardList({
      boardId: board.id,
      position: board?.lists?.length ? board.lists[board.lists.length - 1].position + 1 : 1,
      title: title,
      cards: [],
    });

    this._store.dispatch(boardActions.addBoardList.request({ payload }));
  }

  async onChangeFormVisibility(formVisible: boolean) {
    if (formVisible) {
      this.scrollToRightListSection();
    }
  }

  updateListTitle(event: any, list: IBoardList): void {
    // Get the target element
    const element: HTMLInputElement = event.target;

    // Get the new title
    const newTitle = element.value;

    // If the title is empty...
    if (!newTitle || newTitle.trim() === '') {
      // Reset to original title and return
      element.value = list.title;
      return;
    }

    // Update the list title and element value
    list.title = element.value = newTitle.trim();

    // Update the list
  }

  deleteList(id: string): void {
    // Open the confirmation dialog
    // const confirmation = this._fuseConfirmationService.open({
    //   title: 'Delete list',
    //   message: 'Are you sure you want to delete this list and its cards? This action cannot be undone!',
    //   actions: {
    //     confirm: {
    //       label: 'Delete',
    //     },
    //   },
    // });
    // // Subscribe to the confirmation dialog closed action
    // confirmation.afterClosed().subscribe((result: any) => {
    //   // If the confirm button pressed...
    //   if (result === 'confirmed') {
    //     // Delete the list
    //     this._scrumboardService.deleteList(id).subscribe();
    //   }
    // });
  }

  async addCard(list: IBoardList, title: string) {
    const board = await lastValueFrom(this.board$.pipe(take(1)));
    const payload = new BoardListCard({
      boardId: board.id,
      listId: list.id,
      position: list.cards.length ? list.cards[list.cards.length - 1].position + 1 : 1,
      title: title,
    });

    this._store.dispatch(boardActions.addBoardListCard.request({ payload }));
  }

  listDropped(event: CdkDragDrop<IBoardList[]>): void {
    console.log(event);
    const data = [...event.container.data];
    // Move the item
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

    // Calculate the positions
    const updated = this._calculatePositions(event);

    // Update the lists
    console.log('list: ', updated);
  }

  cardDropped(event: any): void {
    console.log(event);
    // Move or transfer the item
    if (event.previousContainer === event.container) {
      // Move the item
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // Transfer the item
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);

      // Update the card's list it
      event.container.data[event.currentIndex].listId = event.container.id;
    }

    // Calculate the positions
    const updated = this._calculatePositions(event);

    // Update the cards
    console.log('card: ', updated);
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  private scrollToRightListSection() {
    this.boardListGroup.nativeElement.scrollLeft = this.boardListGroup.nativeElement.scrollWidth;
  }

  private _calculatePositions(event: CdkDragDrop<IBoardList[]> | CdkDragDrop<IBoardListCard[]>) {
    // Get the items
    const items = event.container.data;
    const currentItem = items[event.currentIndex];
    const prevItem = items[event.currentIndex - 1] || null;
    const nextItem = items[event.currentIndex + 1] || null;

    // If the item moved to the top...
    if (!prevItem) {
      // If the item moved to an empty container
      if (!nextItem) {
        currentItem.position = 1;
      } else {
        currentItem.position = nextItem.position / 2;
      }
    }
    // If the item moved to the bottom...
    else if (!nextItem) {
      currentItem.position = prevItem.position + 1;
    }
    // If the item moved in between other items...
    else {
      currentItem.position = (prevItem.position + nextItem.position) / 2;
    }

    // // Check if all item positions need to be updated
    // if (!Number.isInteger(currentItem.position) || currentItem.position >= this._maxPosition) {
    //   // Re-calculate all orders
    //   return items.map((value, index) => {
    //     value.position = (index + 1) * this._positionStep;
    //     return value;
    //   });
    // }

    // Return currentItem
    return [currentItem];
  }
}
