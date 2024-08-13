import { Component } from '@angular/core';
import { NavigationBarComponent } from '../../../components/navigation-bar/navigation-bar.component';
import { GetAllAthletesService } from '../../../services/api/get-all-athletes.service';
import { User } from '../../../types/get-all-users-response.types';
import { catchError, tap, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { SearchFilterComponent } from '../../../components/search-filter/search-filter.component';
import { FormsModule } from '@angular/forms';
import { DecodeJwtTokenService } from '../../../services/utils/decode-jwt-token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [
    NavigationBarComponent,
    CommonModule,
    SearchFilterComponent,
    FormsModule
  ],
  providers: [GetAllAthletesService, DecodeJwtTokenService],
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent {
  searchName: string = '';
  userId: string | null = '';
  userType: string = 'admin';
  totalUsers: number = 100;

  isDisabled: boolean = true;

  users: User[] = [];
  usersPaginated: User[] = [];
  list: number[] = []

  constructor(
    private getUsersService: GetAllAthletesService,
    private toastService: ToastrService,
    private decodeJwtTokenService: DecodeJwtTokenService,
    private router: Router
  ) {
    const { sub } = this.decodeJwtTokenService.execute();
    this.userId = sub;
    this.loadUsers(1);
  }

  onChildInputChange(newValue: string) {
    this.searchName = newValue;
    if (this.searchName !== '') {
      this.isDisabled = false;
      this.usersPaginated = this.users.filter(user =>
        user.name.toLowerCase().includes(this.searchName.toLowerCase())
      );
    } else {
      this.isDisabled = true;
      this.loadUsers(1);
    }
  }

  loadUsers(page: number): void {
    this.getUsersService.execute(page).pipe(
      tap((workoutResponse: any) => workoutResponse),
      catchError((error) => {
        this.toastService.error('Ocorreu um erro ao buscar os treinos');
        return throwError(() => error);
      })
    ).subscribe((response) => {
      this.totalUsers = response.count;
      const pages = Math.ceil(this.totalUsers / 10);
      this.users = response.data;
      this.list = [...Array(pages).keys()].map(i => i + 1);
      this.paginateUsers(page);
    });
  }

  onChangePage(page: number): void {
    this.paginateUsers(page);
  }

  paginateUsers(page: number): void {
    const startIndex = (page - 1) * 10;
    const endIndex = startIndex + 10;

    this.usersPaginated = this.users.slice(startIndex, endIndex);
  }

  viewWorkouts(userId: string) {
    this.router.navigate([`treinos/${userId}`])
  }
}
