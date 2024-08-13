import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { UserProfileComponent } from './pages/user/user-profile/user-profile.component';
import { AuthGuard } from './services/guards/auth-guard.service';
import { SignUpComponent } from './pages/signUp/signUp.component';
import { WorkoutCreationComponent } from './pages/workout/workout-creation/workout-creation.component';
import { WorkoutListComponent } from './pages/workout/workout-list/workout-list.component';
import { ListUsersComponent } from './pages/admin/list-users/list-users.component';
import { AuthAdminGuard } from './services/guards/auth-admin-guard.service';
import { RestorePasswordComponent } from './pages/restore-password/restore-password.component';

export const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "login"
  },
  {
    path: "recuperar-senha",
    component: RestorePasswordComponent,
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
  },
  {
    path: "treinos",
    component: WorkoutListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "treinos/:athlete-id",
    component: WorkoutListComponent,
    canActivate: [AuthGuard]
  },
  {
    path:"admin/usuarios-ativos",
    component: ListUsersComponent,
    canActivate: [AuthAdminGuard]
  }
];
