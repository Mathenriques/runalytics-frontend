import { Component } from '@angular/core';
import { NavigationBarComponent } from '../../../components/navigation-bar/navigation-bar.component';
import { GetAllAthletesService } from '../../../services/get-all-athletes.service';
import { User } from '../../../types/get-all-users-response.types';
import { catchError, tap, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [NavigationBarComponent, CommonModule],
  providers: [GetAllAthletesService],
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.scss'
})
export class ListUsersComponent {
  userId: string | null = '';
  isDisabled: boolean = true;
  userType: string = 'admin';
  totalUsers: number = 100;
  users: User[] = [];
  list: number[] = []

  constructor(
    private getUsersService: GetAllAthletesService,
    private toastService: ToastrService
  ) {
    this.getUsersService.execute(1, 10).pipe(
      tap((workoutResponse: any) => workoutResponse),
      catchError((error) => {
        this.toastService.error('Ocorreu um erro ao buscar os treinos');
        return throwError(() => error);
      })
    ).subscribe((response) => {
      this.totalUsers = response.count;
      this.users = response.data;
      this.list = [...Array(5).keys()].map(i => i + 1);
    });


  }
}
