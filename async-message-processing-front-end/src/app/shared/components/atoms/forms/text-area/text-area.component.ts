import { Component, ElementRef, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-area',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  template: `
    <label></label>
    <textarea></textarea>
  `,
  styleUrl: './text-area.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextAreaComponent),
      multi: true
    }
  ]
})
export class TextAreaComponent implements ControlValueAccessor {

  @ViewChild('textArea', { static: true }) 
  public textAreaRef!: ElementRef<HTMLTextAreaElement>;

  @Input()
  public label: string | null = null;

  @Input()
  public set disabled(value: boolean) {
    this.isDisabled = value;
  }

  value: string = '';
  isDisabled: boolean = false;
  textAreaId: string;
  currentLength: number = 0;

  private onChange = (value: string) => {};
  private onTouched = () => {};

  constructor() {
    this.textAreaId = `text-area-${Math.random().toString(36).substr(2, 9)}`;
  }

  // ControlValueAccessor implementation
  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onInput(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.value = target.value;
    this.currentLength = this.value.length;
    this.onChange(this.value);
  }

  onBlur(): void {
    this.onTouched();
  }

  onFocus(): void {
    // Can be used for additional focus handling if needed
  }

  focus(): void {
    this.textAreaRef?.nativeElement?.focus();
  }

  blur(): void {
    this.textAreaRef?.nativeElement?.blur();
  }

  clear(): void {
    this.value = '';
    this.currentLength = 0;
    this.onChange(this.value);
  }

}
