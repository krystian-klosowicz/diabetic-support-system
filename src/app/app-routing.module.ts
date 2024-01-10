import { NgModule, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterModule,
  RouterStateSnapshot,
  Routes,
} from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { EditUserComponent } from './components/admin-panel/edit-user/edit-user.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login Page',
    canActivate: [
      (next: ActivatedRouteSnapshot, state: RouterStateSnapshot) =>
        inject(AuthGuard).canActivate(next, state),
    ],
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Register Page',
    canActivate: [
      (next: ActivatedRouteSnapshot, state: RouterStateSnapshot) =>
        inject(AuthGuard).canActivate(next, state),
    ],
  },
  {
    path: 'home',
    component: HomeComponent,
    title: 'Home Page',
    canActivate: [
      (next: ActivatedRouteSnapshot, state: RouterStateSnapshot) =>
        inject(AuthGuard).canActivate(next, state),
    ],
  },
  {
    path: 'admin-panel',
    component: AdminPanelComponent,
    title: 'Admin Page',
    canActivate: [
      (next: ActivatedRouteSnapshot, state: RouterStateSnapshot) =>
        inject(AuthGuard).canActivate(next, state),
    ],
  },
  {
    path: 'admin-panel/edit-user/:userId',
    component: EditUserComponent,
    title: 'Admin Page',
    canActivate: [
      (next: ActivatedRouteSnapshot, state: RouterStateSnapshot) =>
        inject(AuthGuard).canActivate(next, state),
    ],
  },
  {
    path: 'my-profile',
    component: MyProfileComponent,
    title: 'My Profile Page',
    canActivate: [
      (next: ActivatedRouteSnapshot, state: RouterStateSnapshot) =>
        inject(AuthGuard).canActivate(next, state),
    ],
  },
  {
    path: 'logout',
    component: LoginComponent,
    canActivate: [
      (next: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        const auth = inject(AuthService);
        auth.logoutUser(); // Dodaj odpowiednią metodę do AuthService obsługującą wylogowanie
        return false; // Zwróć false, ponieważ canActivate nie pozwala na dostęp
      },
    ],
  },
  { path: 'not-found', component: NotFoundComponent, title: 'Not found' },
  { path: '**', redirectTo: '/not-found' }, // Przekierowanie każdego złego linku do not-found page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
