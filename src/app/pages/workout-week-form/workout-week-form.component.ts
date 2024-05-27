import { Component } from '@angular/core';
import { Form, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { CheckboxSelectComponent } from '../../components/checkbox-select/checkbox-select.component';

@Component({
  selector: 'app-workout-week-form',
  standalone: true,
  imports: [ReactiveFormsModule, PrimaryInputComponent, CheckboxSelectComponent],
  templateUrl: './workout-week-form.component.html',
  styleUrl: './workout-week-form.component.scss'
})
export class WorkoutWeekFormComponent {

  workoutWeekFrom: FormGroup;
  isDisabled: boolean = false;

  conditioningOptions = [
    { label: 'Sim', value: true },
    { label: 'Não', value: false },
  ]

  myofascialOptions = [
    { label: 'Sim', value: true },
    { label: 'Não', value: false },
  ]

  painOptions = [
    { label: 'Sim', value: true },
    { label: 'Não', value: false },
  ]

  sleepingOptions = [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
    { label: '5', value: 5 },
    { label: '6', value: 6 },
    { label: '7', value: 7 },
    { label: '8', value: 8 },
    { label: '9', value: 9 },
    { label: '10', value: 10 },
  ]
  constructor() {
    this.workoutWeekFrom = new FormGroup({
      start_date: new FormControl(''),
      end_date: new FormControl(''),
      weekly_training_volume: new FormControl(''),
      didConditioning: new FormControl(''),
      conditioning_frequency: new FormControl(''),
      sleep_hours: new FormControl(''),
      stress_level: new FormControl(''),
      didMyofascialRelease: new FormControl(''),
      feelPain: new FormControl(''),
      painLocal: new FormControl(''),
    });
  }
}
