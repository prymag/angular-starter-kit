import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AuthService } from '@core/auth/auth.service';
import { IFormSubmit } from '@core/interfaces/form-submit.interface';
import { ICredentials } from '@core/interfaces/auth.interface';
import { IResponse } from '@core/interfaces/response.interface';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { Component, Output, EventEmitter } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ILogin } from '../../interfaces/login.interface';

/**
 * Create a mock of the child component under test
 * in this case we are mocking the `LoginFormComponent`
 * 
 * it is important to note the selector being used,
 * it should match the child component selector we are mocking
 * 
 * the parent component `LoginComponent` listens for the `loginFormSubmit` event
 * from the child component `LoginFormComponent` <app-login-form> 
 * this triggers the `doLogin` function of the parent component
 * hence, we need to implement the `loginFormSubmit` emitter on our mock
 */
@Component({
  selector: 'app-login-form',
  template: '<p>Mock Login Form Component</p>'
})
class MockLoginFormComponent {
  @Output() loginFormSubmit: EventEmitter<IFormSubmit<ILogin>> = new EventEmitter();
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let authService: AuthService;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  let mockLoginFormComponent: MockLoginFormComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent, MockLoginFormComponent ],
      imports: [ 
        HttpClientTestingModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = fixture.debugElement.injector.get(AuthService);
    router = fixture.debugElement.injector.get(Router);
    mockLoginFormComponent = fixture.debugElement.query(By.directive(MockLoginFormComponent)).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should process successful login', () => {
    //
    fixture.detectChanges();

    const mockResponse: IResponse<ICredentials> = {
      data: {
        'token': 'xeer.eawe.ee',
        user: {
          firstname: 'janna',
          lastname: 'garcia'
        }
      },
      message: 'Success',
      success: true
    }
    const spyLogin = spyOn(authService, 'login').and.callFake(() => of(mockResponse));
    const spyRouter = spyOn(router, 'navigate').and.callFake(() => Promise.resolve(true));

    const formData: IFormSubmit<ILogin> = {
      errors: [],
      values: {
        username: 'arci.munoz',
        password: 'ramonathornes'
      },
      valid: true
    }
    
    mockLoginFormComponent.loginFormSubmit.emit(formData)
    
    expect(spyLogin).toHaveBeenCalledWith(formData.values);
    expect(spyRouter).toHaveBeenCalledWith(['/home']);
    
  });

  it('Should redirect if user is authenticated', () => {
    //
    const spyGetAuthorizedUser = spyOn(authService, 'getAuthorizedUser').and.callFake(() => false);
    const spyGetRouterNavigate = spyOn(router, 'navigate');

    fixture.detectChanges();

    expect(spyGetAuthorizedUser).toHaveBeenCalled();
    expect(spyGetRouterNavigate).toHaveBeenCalledWith(['/']);
  })

});
