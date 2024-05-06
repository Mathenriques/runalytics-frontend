import { Component, Input } from '@angular/core';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [PrimaryInputComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {

  @Input() isDisabled: boolean = true;
}
