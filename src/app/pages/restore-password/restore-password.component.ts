import { Component, Input } from '@angular/core';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';

@Component({
  selector: 'app-restore-password',
  standalone: true,
  imports: [PrimaryInputComponent],
  templateUrl: './restore-password.component.html',
  styleUrl: './restore-password.component.scss'
})
export class RestorePasswordComponent {
  @Input() email: string = ""
}
