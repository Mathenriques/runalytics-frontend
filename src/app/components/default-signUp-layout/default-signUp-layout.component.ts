import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-default-signUp-layout',
  templateUrl: './default-signUp-layout.component.html',
  standalone: true,
  styleUrls: ['./default-signUp-layout.component.scss']
})
export class DefaultSignUpLayoutComponent {
  @Input() titleForm: string = '';
  @Input() advanceBtnText: string = 'Avançar';
  @Input() primaryBtnText: string = 'SALVAR';
  @Input() isSecondStep: boolean = false;
  @Output() advance = new EventEmitter<void>();
  @Output() submit = new EventEmitter<void>();

  onAdvanceClick() {
    this.advance.emit();
  }

  onSubmitClick() {
    this.submit.emit();
  }
}
