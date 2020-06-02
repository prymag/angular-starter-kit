import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { LoginComponent } from './pages/login/login.component';
import { CoreModule } from '@core/core.module';
import { RegisterComponent } from './pages/register/register.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';

@NgModule({
  declarations: [LoginFormComponent, LoginComponent, RegisterComponent, RegisterFormComponent],
  imports: [
    CommonModule,
    CoreModule
  ]
})
export class AuthModule { }
