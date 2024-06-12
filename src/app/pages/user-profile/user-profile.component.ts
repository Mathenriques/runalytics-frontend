import { Component, Input, OnInit } from '@angular/core';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { CheckboxSelectComponent } from '../../components/checkbox-select/checkbox-select.component';
import { ActivatedRoute } from '@angular/router';
import { GetUserDataService } from '../../services/get-user-data.service';
import { UserFitnessLevel, UserGender, UserProfileResponse } from '../../types/user-profile-response.types';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap, throwError } from 'rxjs';
import { NavigationBarComponent } from '../../components/navigation-bar/navigation-bar.component';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [PrimaryInputComponent, CheckboxSelectComponent, NavigationBarComponent],
  providers: [GetUserDataService],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit {
  userId: string | null = '';
  isDisabled: boolean = true;
  userData: UserProfileResponse = {
    id: '',
    name: '',
    email: '',
    password_hash: undefined,
    gender: UserGender.FEMALE,
    birth_date: '00-00-0000',
    diseases: '',
    past_injuries: '',
    weight: 0,
    height: 0,
    fitness_level: UserFitnessLevel.ADVANCED,
    isOnBalancedDiet: false,
    isAdmin: false
  };

  genderOptions = [
    { label: 'Masculino', value: 'male', selected: false},
    { label: 'Feminino', value: 'female', selected: false},
  ];

  isOnBalancedDietOptions = [
    { label: 'Sim', value: true, selected: false},
    { label: 'Não', value: false, selected: false},
  ];

  conditioningOptions = [
    { label: 'Iniciante', value: 'rookie', selected: false},
    { label: 'Intermediário', value: 'intermediary', selected: false},
    { label: 'Avançado', value: 'advanced', selected: false},
  ];

  diseasesOptions = [
    { label: 'Diabetes', value: 'diabetes', selected: false},
    { label: 'Pressão Alta', value: 'highPressure', selected: false},
    { label: 'Pressão Baixa', value: 'lowPressure', selected: false},
    { label: 'Nenhuma', value: null, selected: false},
  ];

  constructor(
    private route: ActivatedRoute,
    private userDataService: GetUserDataService,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.userId = params.get('id');
    });

    this.userDataService.getData(this.userId).pipe(
      tap((userProfileResponse: UserProfileResponse) => userProfileResponse),
      catchError((error) => {
        this.toastService.error('Usuário informado não existe');
        return throwError(() => error);
      })
    ).subscribe((updateUserProfile) => {
      this.userData = updateUserProfile;
      this.genderOptions.forEach(label => label.selected = label.value === this.userData.gender);
      this.isOnBalancedDietOptions.forEach(label => label.selected = label.value === this.userData.isOnBalancedDiet);
      this.conditioningOptions.forEach(label => label.selected = label.value === this.userData.fitness_level);
      this.diseasesOptions.forEach(label => label.selected = label.value === this.userData.diseases);
    });
  }
}
