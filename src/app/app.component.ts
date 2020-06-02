import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '@core/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-starter-kit';

  layout: "empty" | "default" = 'default';

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.shouldLoginFirst();
    this.listenToNavigation();
  }

  shouldLoginFirst() {
    //
    if (!this._authService.getAuthorizedUser()) {
      this._router.navigate(['/login']);
    }
  }


  listenToNavigation() {
    //
    this._router
      .events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe( (event: NavigationEnd) => {
          this.setLayout(event.url);
      });
  }

  setLayout(url) {
    switch(url) {
      case '/login':
        this.layout = 'empty';
        break;
      default:
        this.layout = 'default';
        break;
    }
  }

}
