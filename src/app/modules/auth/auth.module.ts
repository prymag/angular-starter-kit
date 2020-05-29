import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { LoginComponent } from './pages/login/login.component';
import { CoreModule } from '@core/core.module';
import { AuthRoutingModule } from './auth.routing.module';

@NgModule({
  declarations: [LoginFormComponent, LoginComponent],
  imports: [
    CommonModule,
    CoreModule,
    AuthRoutingModule
  ],
  exports: [
    LoginFormComponent,
    AuthRoutingModule
  ]
})
export class AuthModule { }
