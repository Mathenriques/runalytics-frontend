import { Component } from '@angular/core';
import { Form, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
      start_date: new FormControl('', [Validators.required]),
      end_date: new FormControl('', [Validators.required]),
      weekly_training_volume: new FormControl('', [Validators.required]),
      didConditioning: new FormControl('', [Validators.required]),
      conditioning_frequency: new FormControl(''),
      sleep_hours: new FormControl('', [Validators.required]),
      stress_level: new FormControl('', [Validators.required]),
      didMyofascialRelease: new FormControl('', [Validators.required]),
      feelPain: new FormControl('', [Validators.required]),
      painLocal: new FormControl(''),
    });
  }
}
