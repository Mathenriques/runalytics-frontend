import { Component, Input } from '@angular/core';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SendEmailService } from '../../services/api/send-email.service';
import { ValidateCodeService } from '../../services/api/validate-code.service';

@Component({
  selector: 'app-restore-password',
  standalone: true,
  imports: [PrimaryInputComponent, CommonModule, ReactiveFormsModule],
  providers: [
    SendEmailService,
    ValidateCodeService,
    { provide: ToastrService, useClass: ToastrService },
  ],
  templateUrl: './restore-password.component.html',
  styleUrl: './restore-password.component.scss'
})
export class RestorePasswordComponent {

  emailForm: FormGroup;
  codeForm: FormGroup;
  passwordForm: FormGroup;

  firstStep: boolean = true;
  secondStep: boolean = false;

  constructor(
    private router: Router,
    private sendEmailService: SendEmailService,
    private validateCodeService: ValidateCodeService,
    private toastService: ToastrService
  ) {
    this.emailForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });
    
    this.codeForm = new FormGroup({
      code: new FormControl('', [Validators.required])
    });
    
    this.passwordForm = new FormGroup({
      password: new FormControl('', [Validators.required])
    });
  }

  sendEmail() {
    this.firstStep = false;
    this.secondStep = true;

    // this.sendEmailService.execute(this.emailForm.value.email).subscribe({
    //   next: () => {
    //     this.toastService.success('Email enviado com sucesso');
    //     setTimeout(() => {
    //       this.firstStep = false;
    //       this.secondStep = true;
    //     }, 1300);
    //   },
    //   error: () =>  this.toastService.error('Email informado inválido') 
    // })
  }

  verifyCode() {
    this.validateCodeService.execute(this.codeForm.value.code).subscribe({
      next: () => {
        this.toastService.success('Codigo correto!');
        setTimeout(() => {
          this.firstStep = false;
          this.secondStep = false;
        }, 1300);
      },
      error: () =>  this.toastService.error('Codigo informado inválido') 
    })
  }
  
  changePassword() {
    this.validateCodeService.execute(this.codeForm.value.code).subscribe({
      next: () => {
        this.toastService.success('Codigo correto!');
        setTimeout(() => {
          this.firstStep = false;
          this.secondStep = false;
        }, 1300);
      },
      error: () =>  this.toastService.error('Codigo informado inválido') 
    })
  }

  back() {
    if (!this.firstStep && this.secondStep) {
      this.firstStep = true;
      this.secondStep = false;

    } else if (!this.firstStep && !this.secondStep) {
      this.firstStep = false;
      this.secondStep = true;
    } else {
      this.router.navigate(['/login'])
    }
  }
}
