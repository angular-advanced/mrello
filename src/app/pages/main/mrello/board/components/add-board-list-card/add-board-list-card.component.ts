import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-board-list-card',
  templateUrl: './add-board-list-card.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddBoardListCardComponent implements OnInit {
  @Input() isBoardListHasCard = false;

  @ViewChild('textarea') textarea!: ElementRef<HTMLTextAreaElement>;
  @ViewChild('textareaAutosize') textareaAutosize!: CdkTextareaAutosize;

  @Output() onAdd: EventEmitter<string> = new EventEmitter<string>();

  form = this._fb.group({
    title: this._fb.control('', [Validators.required]),
  });
  formShow = false;

  constructor(private _cdr: ChangeDetectorRef, private _fb: FormBuilder) {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.form.invalid) return;

    // Get the new list title
    const title = this.form.get('title')?.value;

    // Execute the observable
    this.onAdd.next(title as string);

    // Clear the new list title and hide the form
    this.formShow = true;
    this.form.get('title')?.setValue('');

    // Reset the size of the textarea
    setTimeout(() => {
      this.textarea.nativeElement.value = '';
      this.textareaAutosize.reset();
    });

    // Mark for check
    this._cdr.markForCheck();
  }

  toggleFormVisibility() {
    // Toggle the visibility
    this.formShow = !this.formShow;

    if (!this.formShow) {
      this.textarea.nativeElement.focus();
    }
  }
}
