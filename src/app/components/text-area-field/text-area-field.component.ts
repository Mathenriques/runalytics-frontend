import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-area-field',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextAreaFieldComponent),
      multi: true
    }
  ],
  templateUrl: './text-area-field.component.html',
  styleUrl: './text-area-field.component.scss'
})
export class TextAreaFieldComponent implements ControlValueAccessor{
  @Input() label: string = "";
  @Input() inputName: string = "";
  @Input() value: string | number | null = "";
  @Input() isDisabled: boolean = false;
  @Input() placeholder: string = "";


  onChange: any = () => {}
  onTouched: any = () => {}

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.onChange(value);
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {}
}
