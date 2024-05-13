import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-default-signUp-layout',
  standalone: true,
  imports: [],
  styleUrl: './default-signUp-layout.component.scss',
  templateUrl: './default-signUp-layout.component.html',
})
export class DefaultSignUpLayoutComponent {

  @Input() titleForm: string = "";
  @Input() primaryBtnText: string = "";
  @Input() advanceBtnText: string = "";
  @Output() submit = new EventEmitter<void>();
  @Output() advance = new EventEmitter<void>();

  onSubmitClick() {
    this.submit.emit();
  }

  onAdvanceClick() {
    this.advance.emit();
  }
}
