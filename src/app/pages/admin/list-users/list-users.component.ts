import { Component } from '@angular/core';
import { NavigationBarComponent } from '../../../components/navigation-bar/navigation-bar.component';

@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [NavigationBarComponent],
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.scss'
})
export class ListUsersComponent {
  userId: string | null = '';
  isDisabled: boolean = true;
  userType: string = 'admin';
}
