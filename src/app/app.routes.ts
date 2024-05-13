import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/signUp/signUp.component';

export const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "login"
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path:"cadastro",
    component: SignUpComponent,
  }
];
