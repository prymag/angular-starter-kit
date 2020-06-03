import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { LoginFormComponent } from './login-form.component';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatFormFieldHarness } from '@angular/material/form-field/testing';
import { IFormSubmit } from '@core/interfaces/form-submit.interface';
import { MatInputHarness } from '@angular/material/input/testing';
import { ILogin } from '../../interfaces/login.interface';
import { BaseFormComponent } from '@core/base-components/base-form/base-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let loader: HarnessLoader;

  let usernameField: MatFormFieldHarness;
  let passwordField: MatFormFieldHarness;
  let usernameInput: MatInputHarness;
  let passwordInput: MatInputHarness;
  let submitBtn: MatButtonHarness;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginFormComponent, BaseFormComponent ],
      imports: [ 
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        ToastrModule.forRoot()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginFormComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
  }));

  // get fields
  beforeEach(async() => {
    usernameField = await loader.getHarness(MatFormFieldHarness.with({floatingLabelText: 'Username'}));
    passwordField = await loader.getHarness(MatFormFieldHarness.with({floatingLabelText: 'Password'}));
    usernameInput = (await usernameField.getControl()) as MatInputHarness;
    passwordInput = (await passwordField.getControl()) as MatInputHarness;
    submitBtn = await loader.getHarness(MatButtonHarness.with({selector: '.btn-submit'}));
  });

  it('should display form', async() => {
    //
    expect(usernameField).toBeTruthy();
    expect(passwordField).toBeTruthy();
    expect(usernameInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(submitBtn).toBeTruthy();
  });

  it('should display errors', async() => {
    //
    let usernameErrors, passwordErrors;

    await submitBtn.click();

    usernameErrors = await usernameField.getTextErrors();
    expect(usernameErrors[0]).toBe('Required');
    
    passwordErrors = await passwordField.getTextErrors();
    expect(passwordErrors[0]).toBe('Required');
  });

  it('should handle error submission', async() => {
    //
    const expectedUntouched: IFormSubmit<ILogin> = {
      valid: false,
      values: {
        username: '',
        password: '',
      },
      errors: [
        {control: 'username', error: 'required', value: '', meta: true},
        {control: 'password', error: 'required', value: '', meta: true},
      ]
    }
    const emitter = spyOn(component.eeFormSubmit, 'emit');

    await submitBtn.click();
    expect(emitter).toHaveBeenCalledWith(expectedUntouched);
  });

  it('should submit form', async () => {
    //
    const emitter = spyOn(component.eeFormSubmit, 'emit');

    await usernameInput.setValue('ivana.alawi');
    await passwordInput.setValue('ivananana');

    let usernameErrors, passwordErrors;

    usernameErrors = await usernameField.getTextErrors();
    passwordErrors = await passwordField.getTextErrors();

    const expected: IFormSubmit<ILogin> = {
      valid: true,
      values: {
        username: 'ivana.alawi',
        password: 'ivananana'
      },
      errors: []
    }

    await submitBtn.click();

    expect(usernameErrors.length).toBe(0);
    expect(passwordErrors.length).toBe(0);
    expect(emitter).toHaveBeenCalledWith(expected);
  });

  it('Should set values', async() => {
    //
    const values: ILogin = {
      username: 'catriona.gray',
      password: 'catriona_gray'
    }

    component.formValues = values;

    const usernameValue = await usernameInput.getValue();
    const passwordValue = await passwordInput.getValue();

    expect(usernameValue).toBe('catriona.gray');
    expect(passwordValue).toBe('catriona_gray');
  });
  
});
