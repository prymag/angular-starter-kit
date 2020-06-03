import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { GuestGuard } from '@core/guards/guest.guard';
import { LoginPageComponent } from './modules/auth/pages/login-page/login-page.component';
import { RegisterPageComponent } from './modules/auth/pages/register-page/register-page.component';

const routes: Routes = [
  { 
    path: 'login', 
    component: LoginPageComponent,
    canActivate: [GuestGuard]
  },
  {
    path: 'register',
    component: RegisterPageComponent,
    canActivate: [GuestGuard]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }