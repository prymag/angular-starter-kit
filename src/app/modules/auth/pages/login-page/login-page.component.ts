import { Component, OnInit } from '@angular/core';
import { IFormSubmit } from '@core/interfaces/form-submit.interface';
import { AuthService } from '@core/auth/auth.service';
import { Router } from '@angular/router';
import { ILogin } from '../../interfaces/login.interface';
import { NotificationService } from '@core/services/notification.service';
import { ButtonLoaderService } from '@core/libs/button-loader/services/button-loader.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(
    private _authService: AuthService,
    private _btnLoaderService: ButtonLoaderService,
    private _notificationService: NotificationService,
    private _router: Router
  ) { }

  ngOnInit(): void {}

  doLogin(formData: IFormSubmit<ILogin>) {
    //
    
    if (!formData.valid) {
      this._notificationService.notifyFormErrors(formData.errors);
      return;
    }

    this._btnLoaderService.show();

    this._authService
      .login(formData.values)
      .subscribe(response => {
        //
        if (response.success) {
          this._router.navigate(['/home'])
        }
        this._btnLoaderService.hide();
      }, fail => {
        //
        this._notificationService.notifyError(fail);
        this._btnLoaderService.hide();
      })
  }

}
