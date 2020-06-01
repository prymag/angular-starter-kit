import { Component, OnInit } from '@angular/core';
import { IUser } from '@core/interfaces/user.interface';
import { AuthService } from '@core/auth/auth.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  user: IUser | null;

  constructor(
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getLoggedInUser();
  }

  getLoggedInUser() {
    this.user = this._authService.getAuthorizedUser()
  }

}
