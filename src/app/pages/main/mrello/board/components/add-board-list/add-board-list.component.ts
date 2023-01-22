import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-board-list',
  templateUrl: './add-board-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddBoardListComponent implements OnInit, OnDestroy {
  @ViewChild('titleInput') titleInput!: ElementRef;
  @Input() isBoardHasList!: boolean;
  @Output() readonly onAdd = new EventEmitter<string>();
  @Output() readonly onChangeFormVisibility = new EventEmitter<boolean>();

  formTitle = this._formBuilder.control('', [Validators.required]);
  formVisible = false;

  /**
   * Constructor
   */
  constructor(private _changeDetectorRef: ChangeDetectorRef, private _formBuilder: FormBuilder) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  save(event: KeyboardEvent): void {
    if (event.code !== 'Enter') {
      return;
    }

    if (this.formTitle.valid && this.formTitle.value) {
      this.onAdd.next(this.formTitle.value?.trim());
    }

    this.formTitle?.setValue('');
    this.formVisible = false;

    this._changeDetectorRef.markForCheck();
  }

  submit() {
    if (this.formTitle.valid && this.formTitle.value) {
      this.onAdd.next(this.formTitle.value?.trim());
    }

    this.formTitle?.setValue('');
    this.formVisible = false;

    this._changeDetectorRef.markForCheck();
  }

  toggleFormVisibility(forceUpdate = false, formVisible?: boolean): void {
    if (forceUpdate) {
      this.formVisible = !!formVisible;
    } else {
      this.formVisible = !this.formVisible;
    }

    setTimeout(() => {
      if (this.formVisible) {
        this.titleInput.nativeElement.focus();
      }
    });

    this.onChangeFormVisibility.next(this.formVisible);
  }
}
