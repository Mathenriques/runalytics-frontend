import { Component } from '@angular/core';
import { NavigationBarComponent } from '../../components/navigation-bar/navigation-bar.component';
import { CheckboxSelectComponent } from '../../components/checkbox-select/checkbox-select.component';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TextAreaFieldComponent } from '../../components/text-area-field/text-area-field.component';

@Component({
  selector: 'app-workout-creation',
  standalone: true,
  imports: [PrimaryInputComponent, CheckboxSelectComponent, NavigationBarComponent, TextAreaFieldComponent, ReactiveFormsModule],
  templateUrl: './workout-creation.component.html',
  styleUrl: './workout-creation.component.scss'
})
export class WorkoutCreationComponent {
  workoutCreationForm: FormGroup;
  stress_levels = [...Array(10).keys()].map(i => ({ label: `${i + 1}`, value: `${i + 1}` }));

  constructor() {
    this.workoutCreationForm = new FormGroup({
      start_date: new FormControl('', [Validators.required]),
      end_date: new FormControl('', [Validators.required]),
      weekly_volume: new FormControl('', [Validators.required]),
      strengthening_workouts: new FormControl('', [Validators.required]),
      stress_level: new FormControl('', [Validators.required, Validators.min(1), Validators.max(10)]),
      sleep_hours: new FormControl('', [Validators.required]),
      didMyofascialRelease: new FormControl('', [Validators.required]),
      pain_discomfort: new FormControl('', [Validators.required])
    })
  }
}
