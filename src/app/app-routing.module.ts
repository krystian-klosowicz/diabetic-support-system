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
    canActivate: [
      (next: ActivatedRouteSnapshot, state: RouterStateSnapshot) =>
        inject(AuthGuard).canActivate(next, state),
    ],
  },
  {
    path: 'admin-panel',
    component: AdminPanelComponent,
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
  { path: '**', redirectTo: '/not-found' }, // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
