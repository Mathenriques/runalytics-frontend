import { Component, Input } from '@angular/core';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restore-password',
  standalone: true,
  imports: [PrimaryInputComponent, CommonModule],
  templateUrl: './restore-password.component.html',
  styleUrl: './restore-password.component.scss'
})
export class RestorePasswordComponent {
  @Input() email: string = ""
  firstStep: boolean = true;
  secondStep: boolean = false;

  constructor(private router: Router) {}

  sendEmail() {
    this.firstStep = false;
    this.secondStep = true;
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
