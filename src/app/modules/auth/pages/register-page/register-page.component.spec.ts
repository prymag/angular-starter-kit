import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPageComponent } from './register-page.component';
import { Component, Output, EventEmitter } from '@angular/core';
import { IFormSubmit } from '@core/interfaces/form-submit.interface';
import { IRegister } from '../../interfaces/register.interface';
import { AuthService } from '@core/auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register-form',
  template: 'Mock Register Form'
})
class MockRegisterFormComponent {
  @Output() eeFormSubmit: EventEmitter<IFormSubmit<IRegister>> = new EventEmitter();
}

describe('RegisterPageComponent', () => {
  let component: RegisterPageComponent;
  let fixture: ComponentFixture<RegisterPageComponent>;

  let authService: AuthService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterPageComponent, MockRegisterFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
