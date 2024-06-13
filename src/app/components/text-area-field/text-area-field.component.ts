import { Component, Input } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-text-area-field',
  standalone: true,
  imports: [],
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
