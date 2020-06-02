import { Component, OnInit } from '@angular/core';
import { IFormSubmit } from '@core/interfaces/form-submit.interface';
import { AuthService } from '@core/auth/auth.service';
import { Router } from '@angular/router';
import { ILogin } from '../../interfaces/login.interface';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private _router: Router,
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
    this.redirectIfAuthenticated();
  }

  redirectIfAuthenticated() {
    //
    if (!this._authService.getAuthorizedUser()) {
      //
      this._router.navigate(['/']);
    }
  }

  doLogin(formData: IFormSubmit<ILogin>) {
    //
    if (!formData.valid) {
      return;
    }

    this._authService
      .login(formData.values)
      .subscribe(response => {
        //
        if (response.success) {
          this._router.navigate(['/home'])
        }
        
      })
  }

}
