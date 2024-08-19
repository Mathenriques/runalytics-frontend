import { Component, OnInit, Renderer2 } from '@angular/core';
import { DecodeJwtTokenService } from '../../../services/utils/decode-jwt-token.service';
import { NavigationBarComponent } from '../../../components/navigation-bar/navigation-bar.component';
import { ToastrService } from 'ngx-toastr';
import { GetAllWorkoutsService } from '../../../services/api/get-all-workouts.service';
import { catchError, tap, throwError } from 'rxjs';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteWorkoutService } from '../../../services/api/delete-workout.service';
import { GetUserDataService } from '../../../services/api/get-user-data.service';
import { Workout, WorkoutFeedbackResponse } from '../../../types/workouts-types';
import { SetGetLocalStorageService } from '../../../services/utils/set-get-local-storage.service';

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
export class WorkoutListComponent implements OnInit{
  userId: string = ''
  userType: string = 'athlete'
  workoutsData: Workout[] = []
  workoutFeedback: WorkoutFeedbackResponse = {
    weekly_volume: {
      status: 'Médio',
      value: 0
    },
    strengthening_workouts: {
      status: 'Médio',
      value: 0
    },
    diet_level: {
      status: 'Médio',
      value: 0
    },
    stress_level: {
      status: 'Médio',
      value: 0
    },
    sleep_hours: {
      status: 'Médio',
      value: 0
    },
  };
  paramAthleteIdExists: string | null = null;
  userName: string | null = null;

  constructor(
    private decodeJwtTokenService: DecodeJwtTokenService,
    private getAllWorkoutsService: GetAllWorkoutsService,
    private getUserDataService: GetUserDataService,
    private deleteWorkoutService: DeleteWorkoutService,
    private localStorageService: SetGetLocalStorageService,
    private toastService: ToastrService,
    private datePipe: DatePipe,
    private router: Router,
    private route: ActivatedRoute,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    const { sub, isAdmin } = this.decodeJwtTokenService.execute();
    this.paramAthleteIdExists = this.route.snapshot.paramMap.get('athlete-id');

    if (isAdmin) {
      this.userType = 'admin';
    }

    if (this.paramAthleteIdExists) {
      this.userId = this.paramAthleteIdExists
      this.getUserDataService.getData(this.userId).pipe(
        tap((workoutResponse: any) => workoutResponse),
        catchError((error) => {
          this.toastService.error('Ocorreu um erro ao buscar os dados do usuário');
          return throwError(() => error);
        })
      ).subscribe((response) => {
        this.userName = response.name;
      });
    } else {
      this.userId = sub;
    }

    this.getAllWorkoutsService.getData(this.userId).pipe(
      tap((workoutResponse: any) => workoutResponse),
      catchError((error) => {
        this.toastService.error('Ocorreu um erro ao buscar os treinos');
        return throwError(() => error);
      })
    ).subscribe((workoutsData) => {
      this.workoutsData = workoutsData.workouts;
      this.workoutFeedback = workoutsData.compareWorkouts;
    });

    if (!this.localStorageService.getLocalStorage('modal_feedback_seen') && this.workoutsData.length > 1) {
      console.log('abrir modal')
      this.openModal();
    }
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

  transformDietLevelIntoText(data: number): string {
    if (data === 1) {
      return 'Não segui nada';
    } else if(data === 2){
      return 'Segui por volta de 50%';
    } else {
      return 'Segui de 80% a 100% da dieta';
    }
  }

  transformPainDiscomfort(data: string): string {
    if (!data) {
      return 'Não';
    }

    return data;
  }

  createWorkout() {
    this.router.navigate(['/criar-treino'])
  }

  deleteWorkout(id: string) {
    console.log(id)
    this.deleteWorkoutService.execute(id).pipe(
      tap((workoutResponse: any) => workoutResponse),
      catchError((error) => {
        this.toastService.error('Ocorreu um erro ao deletar o treino');
        return throwError(() => error);
      })
    ).subscribe(() => {
      this.toastService.success('Treino deletado com sucesso');
      this.workoutsData = this.workoutsData.filter(item => item.id != id);
      id = '';

    });
  }

  openModal(): void {
    const modalTrigger = this.renderer.selectRootElement('#autoModalTrigger');
    modalTrigger.click();
  }

  closeModal(): void {
    this.localStorageService.setLocalStorage('modal_feedback_seen', true)
  }

  checkIfIsPositive(value: number): string | number {
    if(value > 0) {
      return `+${value}`;
    }

    return value;
  }

}
