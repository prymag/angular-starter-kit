import { Component, OnInit } from '@angular/core';
import { IFormSubmit } from '@core/interfaces/form-submit.interface';
import { AuthService } from '@core/auth/auth.service';
import { Router } from '@angular/router';
import { ILogin } from '../../interfaces/login.interface';
import { NotificationService } from '@core/services/notification.service';
import { ButtonLoaderService } from '@core/libs/button-loader/services/button-loader.service';
import { LoadingIndicatorService } from '@core/libs/loading-indicator/services/loading-indicator.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(
    private _authService: AuthService,
    private _btnLoaderService: ButtonLoaderService,
    private _loadingIndicatorService: LoadingIndicatorService,
    private _notificationService: NotificationService,
    private _router: Router
  ) { }

  ngOnInit(): void {}

  showFeedback() {
    //
    this._btnLoaderService.show();
    this._loadingIndicatorService.show();
  }

  hideFeedback() {
    this._btnLoaderService.hide();
    this._loadingIndicatorService.hide();
  }

  doLogin(formData: IFormSubmit<ILogin>) {
    //
    
    if (!formData.valid) {
      this._notificationService.notifyFormErrors(formData.errors);
      return;
    }

    this.showFeedback();

    this._authService
      .login(formData.values)
      .subscribe(response => {
        //
        if (response.success) {
          this._router.navigate(['/home'])
        }
        this.hideFeedback();
      }, fail => {
        //
        this._notificationService.notifyError(fail);
        this.hideFeedback();
      })
  }

}
