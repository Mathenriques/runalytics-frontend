import { Component } from '@angular/core';
import { DecodeJwtTokenService } from '../../../services/decode-jwt-token.service';
import { NavigationBarComponent } from '../../../components/navigation-bar/navigation-bar.component';
import { ToastrService } from 'ngx-toastr';
import { GetAllWorkoutsService } from '../../../services/get-all-workouts.service';
import { catchError, tap, throwError } from 'rxjs';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-workout-list',
  standalone: true,
  imports: [NavigationBarComponent, CommonModule],
  providers: [
    DecodeJwtTokenService, GetAllWorkoutsService, DatePipe
  ],
  templateUrl: './workout-list.component.html',
  styleUrl: './workout-list.component.scss'
})
export class WorkoutListComponent {
  userId: string = ''
  userType: string = 'athlete'
  workoutsData: any[] = []

  constructor(
    private decodeJwtTokenService: DecodeJwtTokenService,
    private getAllWorkoutsService: GetAllWorkoutsService,
    private toastService: ToastrService,
    private datePipe: DatePipe
  ) {
    const { sub, isAdmin } = this.decodeJwtTokenService.execute();
    this.userId = sub;

    if (isAdmin) {
      this.userType = 'admin';
    }

    this.getAllWorkoutsService.getData(this.userId).pipe(
      tap((workoutResponse: any) => workoutResponse),
      catchError((error) => {
        this.toastService.error('Ocorreu um erro ao buscar os treinos');
        return throwError(() => error);
      })
    ).subscribe((workoutsData) => {
      this.workoutsData = workoutsData;
    });
  }

  getFormattedDateRange(startDate: Date | string | null, endDate: Date | string | null): string {
    if (!startDate || !endDate) {
      return 'N/A';
    }

    const formattedStartDate = this.datePipe.transform(startDate, 'd-MM-yyyy');
    const formattedEndDate = this.datePipe.transform(endDate, 'd-MM-yyyy');

    return `${formattedStartDate} à ${formattedEndDate}`;
  }

  transformWorkoutMyofascialRelease(data: boolean): string {
    if (data) {
      return 'Sim';
    } else {
      return 'Não';
    }
  }

  transformPainDiscomfort(data: string): string {
    if (!data) {
      return 'Não';
    }

    return data;
  }
}
