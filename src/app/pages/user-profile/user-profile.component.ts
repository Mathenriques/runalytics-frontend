import { Component, Input, OnInit } from '@angular/core';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { CheckboxSelectComponent } from '../../components/checkbox-select/checkbox-select.component';
import { ActivatedRoute } from '@angular/router';
import { GetUserDataService } from '../../services/get-user-data.service';
import { UserProfileResponse } from '../../types/user-profile-response.types';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [PrimaryInputComponent, CheckboxSelectComponent],
  providers: [GetUserDataService],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit {
  userId: string | null = '';
  isDisabled: boolean = true;
  userData: UserProfileResponse | null = null;

  constructor(
    private route: ActivatedRoute,
    private userDataService: GetUserDataService,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.userId = params.get('id');
    });

    this.userDataService.getData(this.userId).subscribe(
      (userProfileResponse: UserProfileResponse) => this.userData = userProfileResponse,
      (error) => this.toastService.error('Usuário informado não existe')
    );


  }

  genderOptions = [
    { label: 'Masculino', value: 'male' },
    { label: 'Feminino', value: 'female' },
  ];

  isOnBalancedDietOptions = [
    { label: 'Sim', value: true },
    { label: 'Não', value: false },
  ];

  conditioningOptions = [
    { label: 'Iniciante', value: 'easy' },
    { label: 'Intermediário', value: 'medium' },
    { label: 'Avançado', value: 'hard' },
  ];

  diseasesOptions = [
    { label: 'Diabetes', value: 'diabetes' },
    { label: 'Pressão Alta', value: 'highPressure' },
    { label: 'Pressão Baixa', value: 'lowPressure' },
    { label: 'Nenhuma', value: null },
  ];

}
