import { Component, Input } from '@angular/core';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SendEmailService } from '../../services/api/send-email.service';

@Component({
  selector: 'app-restore-password',
  standalone: true,
  imports: [PrimaryInputComponent, CommonModule, ReactiveFormsModule],
  providers: [
    SendEmailService,
    { provide: ToastrService, useClass: ToastrService },
  ],
  templateUrl: './restore-password.component.html',
  styleUrl: './restore-password.component.scss'
})
export class RestorePasswordComponent {

  emailForm: FormGroup;
  codeForm: FormGroup;

  firstStep: boolean = true;
  secondStep: boolean = false;

  constructor(
    private router: Router,
    private sendEmailService: SendEmailService,
    private toastService: ToastrService
  ) {
    this.emailForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });
    
    this.codeForm = new FormGroup({
      code: new FormControl('', [Validators.required])
    });
  }

  sendEmail() {
    console.log(this.emailForm.value.email);
    this.sendEmailService.execute(this.emailForm.value.email).subscribe({
      next: () => {
        this.firstStep = false;
        this.secondStep = true;
      },
      error: () =>  this.toastService.error('Error ao enviar email, tente mais tarde') 
    })
    
  }

  back() {
    if (!this.firstStep) {
      this.firstStep = true;
      this.secondStep = false;

    } else {
      this.router.navigate(['/login'])
    }
  }
}
