import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { CoreModule } from '@core/core.module';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';

@NgModule({
  declarations: [
    LoginFormComponent, 
    LoginPageComponent, 
    RegisterPageComponent, 
    RegisterFormComponent
  ],
  imports: [
    CommonModule,
    CoreModule
  ]
})
export class AuthModule { }
