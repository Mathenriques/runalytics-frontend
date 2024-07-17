import { Component } from '@angular/core';
import { NavigationBarComponent } from '../../../components/navigation-bar/navigation-bar.component';
import { CheckboxSelectComponent } from '../../../components/checkbox-select/checkbox-select.component';
import { PrimaryInputComponent } from '../../../components/primary-input/primary-input.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TextAreaFieldComponent } from '../../../components/text-area-field/text-area-field.component';
import { CreateWorkoutService } from '../../../services/api/create-workout.service';
import { ToastrService } from 'ngx-toastr';
import { OptionsSelect } from '../../../types/options-select.types';
import { DecodeJwtTokenService } from '../../../services/utils/decode-jwt-token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workout-creation',
  standalone: true,
  imports: [PrimaryInputComponent, CheckboxSelectComponent, NavigationBarComponent, TextAreaFieldComponent, ReactiveFormsModule],
  providers: [
    CreateWorkoutService,
    { provide: ToastrService, useClass: ToastrService },
    DecodeJwtTokenService
  ],
  templateUrl: './workout-creation.component.html',
  styleUrl: './workout-creation.component.scss'
})
export class WorkoutCreationComponent {
  workoutCreationForm: FormGroup;
  userId: string = ''
  userType: string = 'athlete'

  stress_levels = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: '6', value: '6' },
    { label: '7', value: '7' },
    { label: '8', value: '8' },
    { label: '9', value: '9' },
    { label: '10', value: '10' },
  ]
  miofascial_releases = [
    { label: 'Sim', value: 'true' },
    { label: 'Não', value: 'false' },
  ];

  constructor(
    private createWorkoutService: CreateWorkoutService,
    private router: Router,
    private decodeJwtTokenService: DecodeJwtTokenService,
    private toastService: ToastrService,
    private fb: FormBuilder,
  ) {
    const { sub, isAdmin } = this.decodeJwtTokenService.execute();
    this.userId = sub;

    this.workoutCreationForm = this.fb.group({
      start_date: ['', [Validators.required]],
      end_date: ['', [Validators.required]],
      weekly_volume: ['', [Validators.required]],
      strengthening_workouts: ['', [Validators.required]],
      stress_level: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
      sleep_hours: ['', [Validators.required]],
      didMyofascialRelease: ['', [Validators.required]],
      pain_discomfort: ['', [Validators.required]],
      user_id: sub
    })

    if (isAdmin) {
      this.userType = 'admin';
    }

  }

  onOptionSelect(field: any, selectedOptions: OptionsSelect) {
    this.workoutCreationForm.controls[field].setValue(selectedOptions.value);
  }

  navigate() {
    this.router.navigate(['/treinos'])
  }

  submit() {
    this.createWorkoutService.createWorkout(this.workoutCreationForm.value).subscribe({
      next: () => {
        this.toastService.success('Registro feito com sucesso!');
        this.navigate();
      },
      error: () =>
        this.toastService.error(
          'Erro ao registrar, tente novamente mais tarde'
        ),
    });
  }
}
