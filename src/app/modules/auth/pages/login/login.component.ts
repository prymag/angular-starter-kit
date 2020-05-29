import { Component, OnInit } from '@angular/core';
import { IFormSubmit } from '@core/interfaces/form-submit.interface';
import { ILogin } from '@core/interfaces/auth.interface';
import { AuthService } from '@core/auth/auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  testing = '';

  constructor(
    private _router: Router,
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
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
