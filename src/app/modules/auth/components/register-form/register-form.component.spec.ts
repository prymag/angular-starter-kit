import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFormComponent } from './register-form.component';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatFormFieldHarness, FormFieldControlHarness } from '@angular/material/form-field/testing';
import { ReactiveFormsModule, FormGroup, AbstractControl, FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule, MatInput } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonHarness } from '@angular/material/button/testing';
import { IFormSubmit } from '@core/interfaces/form-submit.interface';
import { IRegister } from '../../interfaces/register.interface';
import { BaseFormComponent } from '@core/base-components/base-form/base-form.component';
import { ToastrModule } from 'ngx-toastr';
import { MatInputHarness } from '@angular/material/input/testing';

describe('RegisterFormComponent', () => {
  let component: RegisterFormComponent;
  let fixture: ComponentFixture<RegisterFormComponent>;
  let loader: HarnessLoader;

  let usernameField:MatFormFieldHarness;
  let passwordField:MatFormFieldHarness;
  let firstnameField:MatFormFieldHarness;
  let lastnameField:MatFormFieldHarness;
  let emailField:MatFormFieldHarness;
  let submitBtn:MatButtonHarness;

  let usernameInput: MatInputHarness;
  let passwordInput: MatInputHarness;
  let firstnameInput: MatInputHarness;
  let lastnameInput: MatInputHarness;
  let emailInput: MatInputHarness;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterFormComponent, BaseFormComponent ],
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        ToastrModule.forRoot()
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterFormComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  }));

  beforeEach(async() => {
    //
    usernameField = await loader.getHarness(MatFormFieldHarness.with({floatingLabelText: 'Username'}));
    passwordField = await loader.getHarness(MatFormFieldHarness.with({floatingLabelText: 'Password'}));
    firstnameField = await loader.getHarness(MatFormFieldHarness.with({floatingLabelText: 'Firstname'}));
    lastnameField = await loader.getHarness(MatFormFieldHarness.with({floatingLabelText: 'Lastname'}));
    emailField = await loader.getHarness(MatFormFieldHarness.with({floatingLabelText: 'Email'}));
    submitBtn = await loader.getHarness(MatButtonHarness.with({selector: '.btn-submit'}));

    usernameInput = (await usernameField.getControl()) as MatInputHarness;
    passwordInput = (await passwordField.getControl()) as MatInputHarness;
    firstnameInput = (await firstnameField.getControl()) as MatInputHarness;
    lastnameInput = (await lastnameField.getControl()) as MatInputHarness;
    emailInput = (await emailField.getControl()) as MatInputHarness;
  });

  it('should display form', () => {
    //
    expect(usernameField).toBeTruthy();
    expect(passwordField).toBeTruthy();
    expect(firstnameField).toBeTruthy();
    expect(lastnameField).toBeTruthy();
    expect(emailField).toBeTruthy();
    
    expect(usernameInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(firstnameInput).toBeTruthy();
    expect(lastnameInput).toBeTruthy();
    expect(emailInput).toBeTruthy();
    
    expect(submitBtn).toBeTruthy();
  });

  it('should show form inputs', async() => {
    //
    expect(usernameField).toBeTruthy();
    expect(passwordField).toBeTruthy();
    expect(firstnameField).toBeTruthy();
    expect(lastnameField).toBeTruthy();
    expect(emailField).toBeTruthy();
    
    expect(usernameInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(firstnameInput).toBeTruthy();
    expect(lastnameInput).toBeTruthy();
    expect(emailInput).toBeTruthy();
    
    expect(submitBtn).toBeTruthy();
  });

  it('should show form errors', async() => {
    //
    await submitBtn.click();
    let usernameError = await usernameField.getTextErrors();
    let passwordError = await passwordField.getTextErrors();
    let firstnameError = await firstnameField.getTextErrors();
    let lastnameError = await lastnameField.getTextErrors();
    let emailError = await emailField.getTextErrors();

    expect(usernameError[0]).toBe('Required');
    expect(passwordError[0]).toBe('Required');
    expect(firstnameError[0]).toBe('Required');
    expect(lastnameError.length).toBe(0);
    expect(emailError[0]).toBe('Required');

    await emailInput.setValue('invalid-email-value');

    emailError = await emailField.getTextErrors();
    expect(emailError[0]).toBe('Should be a valid email address');
  });

  it('Should emit errors', async() => {
    //
    const expectedUntouched: IFormSubmit<IRegister> = {
      valid: false,
      values: {
        username: '',
        password: '',
        firstname: '',
        lastname: '',
        email: ''
      },
      errors: [
        {control: 'username', error: 'required', value: '', meta: true},
        {control: 'password', error: 'required', value: '', meta: true},
        {control: 'firstname', error: 'required', value: '', meta: true},
        {control: 'email', error: 'required', value: '', meta: true},
      ]
    }
    const emitter = spyOn(component.eeFormSubmit, 'emit');
    
    const submitBtn = await loader.getHarness(MatButtonHarness.with({selector: '.btn-submit'}));

    await submitBtn.click();
    expect(emitter).toHaveBeenCalledWith(expectedUntouched);
    
    await emailInput.setValue('invalidemail');

    const expectedWithInvalidEmail = {...expectedUntouched};
    expectedWithInvalidEmail.values.email = 'invalidemail';
    expectedWithInvalidEmail.errors[3].error = 'email';
    expectedWithInvalidEmail.errors[3].value = 'invalidemail';

    await submitBtn.click();
    expect(emitter).toHaveBeenCalledWith(expectedWithInvalidEmail);
  });

  it('should emit valid values', async() => {
    //
    const expectedValues: IFormSubmit<IRegister> = {
      valid: true,
      values: {
        username: 'bellap',
        password: 'bellap234',
        firstname: 'Bella',
        lastname: 'Padilla',
        email: 'bellap@mail.com'
      },
      errors:[]
    }

    const emitter = spyOn(component.eeFormSubmit, 'emit');

    await usernameInput.setValue('bellap');
    await passwordInput.setValue('bellap234');
    await firstnameInput.setValue('Bella');
    await lastnameInput.setValue('Padilla');
    await emailInput.setValue('bellap@mail.com');

    await submitBtn.click();

    expect(emitter).toHaveBeenCalledWith(expectedValues);
  });
  
});