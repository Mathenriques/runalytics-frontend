import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { AuthGuard } from './services/auth-guard.service';
import { SignUpComponent } from './pages/signUp/signUp.component';
import { WorkoutWeekFormComponent } from './pages/workout-week-form/workout-week-form.component';

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
  },
  {
    path: "user/profile/:id",
    component: UserProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "user/definir-semana",
    component: WorkoutWeekFormComponent,
    // canActivate: [AuthGuard],
  }
];
