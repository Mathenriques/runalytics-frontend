import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { UserProfileComponent } from './pages/user/user-profile/user-profile.component';
import { AuthGuard } from './services/auth-guard.service';
import { SignUpComponent } from './pages/signUp/signUp.component';
import { WorkoutCreationComponent } from './pages/workout/workout-creation/workout-creation.component';

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
    path: "criar-treino",
    component: WorkoutCreationComponent,
    canActivate: [AuthGuard]
  }
];
