import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { Component, Output, EventEmitter } from '@angular/core';
import { IFormSubmit } from '@core/interfaces/form-submit.interface';
import { IRegister } from '../../interfaces/register.interface';
import { IUser } from '@core/interfaces/user.interface';
import { AuthService } from '@core/auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register-form',
  template: 'Mock Register Form'
})
class MockRegisterFormComponent {
  @Output() eeFormSubmit: EventEmitter<IFormSubmit<IRegister>> = new EventEmitter();
}

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  let authService: AuthService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent, MockRegisterFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
