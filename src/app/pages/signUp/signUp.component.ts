import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { CheckboxSelectComponent } from '../../components/checkbox-select/checkbox-select.component';
import { Router } from '@angular/router';
import { SignUpService } from '../../services/signUp.service';
import { ToastrService } from 'ngx-toastr';
import { DefaultSignUpLayoutComponent } from '../../components/default-signUp-layout/default-signUp-layout.component';
import { OptionsSelect } from '../../types/options-select.types';

@Component({
  selector: 'app-signUp',
  standalone: true,
  imports: [
    DefaultSignUpLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent,
    CheckboxSelectComponent,
    CommonModule,
  ],
  providers: [
    SignUpService,
    { provide: ToastrService, useClass: ToastrService },
  ],
  templateUrl: './signUp.component.html',
  styleUrls: ['./signUp.component.scss'],
})
export class SignUpComponent {
  genderOptions: OptionsSelect[] = [
    { label: 'Masculino', value: 'male' },
    { label: 'Feminino', value: 'female' },
  ];

  isOnBalancedDietOptions: OptionsSelect[] = [
    { label: 'Sim', value: true },
    { label: 'Não', value: false },
  ];

  conditioningOptions: OptionsSelect[] = [
    { label: 'Iniciante', value: 'rookie' },
    { label: 'Intermediário', value: 'intermediary' },
    { label: 'Avançado', value: 'advanced' },
  ];

  diseasesOptions: OptionsSelect[] = [
    { label: 'Diabetes', value: 'diabetes' },
    { label: 'Pressão Alta', value: 'highPressure' },
    { label: 'Pressão Baixa', value: 'lowPressure' },
    { label: 'Nenhuma', value: '' },
  ];

  signUpForm: FormGroup;
  isSecondStep: boolean = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private signUpService: SignUpService,
    private toastService: ToastrService
  ) {
    this.signUpForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
        ],
      ],
      birth_date: ['', Validators.required],
      gender: ['', Validators.required],
      weight: ['', [Validators.required]],
      height: ['', [Validators.required]],
      diseases: ['', [Validators.required]],
      past_injuries: ['',[Validators.required]],
      fitness_level: ['', [Validators.required]],
      isAdmin: [false],
      isOnBalancedDiet: ['', [Validators.required]],
    });
  }

  onOptionSelect(field: any, selectedOptions: OptionsSelect) {
    this.signUpForm.controls[field].setValue(selectedOptions.value);
  }

  navigate() {
    this.router.navigate(['/login']);
  }

  submit() {
    if (!this.isSecondStep) {
      this.isSecondStep = !this.isSecondStep;
    } else if (this.signUpForm.valid) {
      this.signUpService.signUp(this.signUpForm.value).subscribe({
        next: () => {
          this.toastService.success('Registro feito com sucesso!');
          this.navigate();
        },
        error: () =>
          this.toastService.error(
            'Erro ao registrar, tente novamente mais tarde'
          ),
      });
    } else {
      this.toastService.error(
        'Por favor, preencha todos os campos corretamente.'
      );
    }
  }
}
