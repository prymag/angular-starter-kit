import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { LoginFormComponent } from './login-form.component';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { CoreModule } from '@core/core.module';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatFormFieldHarness } from '@angular/material/form-field/testing';
import { IFormSubmit } from '@core/interfaces/form-submit.interface';
import { MatInputHarness } from '@angular/material/input/testing';
import { ILogin } from '../../interfaces/login.interface';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let loader: HarnessLoader;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginFormComponent ],
      imports: [ 
        CoreModule,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginFormComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
  }));

  it('Should display errors properly', async() => {
    //
    const usernameField = await loader.getHarness(MatFormFieldHarness.with({floatingLabelText: 'Username'}));
    const passwordField = await loader.getHarness(MatFormFieldHarness.with({floatingLabelText: 'Password'}));
    const submitBtn = await loader.getHarness(MatButtonHarness.with({selector: '.btn-submit'}));
    await submitBtn.click();

    let usernameErrors = await usernameField.getTextErrors();
    expect(usernameErrors[0]).toBe('Required');

    let passwordErrors = await passwordField.getTextErrors();
    expect(passwordErrors[0]).toBe('Required');

    const username = await usernameField.getControl() as any;
    await username.setValue('ivanaalawi');
    
    usernameErrors = await usernameField.getTextErrors();
    passwordErrors = await passwordField.getTextErrors();
    expect(usernameErrors.length).toBe(0);
    expect(passwordErrors[0]).toBe('Required');

    const password = await passwordField.getControl() as any;
    await password.setValue('ivanaalawi');
    passwordErrors = await passwordField.getTextErrors();
    expect(passwordErrors.length).toBe(0);

  });

  it('Should emit errors', async() => {
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
    const emitter = spyOn(component.loginFormSubmit, 'emit')
    
    const submitBtn = await loader.getHarness(MatButtonHarness.with({selector: '.btn-submit'}));

    await submitBtn.click();
    expect(emitter).toHaveBeenCalledWith(expectedUntouched);
  });

  it('Should emit values', async() => {
    //
    const emitter = spyOn(component.loginFormSubmit, 'emit')
    const submitBtn = await loader.getHarness(MatButtonHarness.with({selector: '.btn-submit'}));
    const username = await loader.getHarness(MatInputHarness.with({placeholder: 'username'}));
    const password = await loader.getHarness(MatInputHarness.with({placeholder: 'password'}));

    const expectedTouched: IFormSubmit<ILogin> = {
      valid: true,
      values: {
        username: 'main.mendoza',
        password: 'mainedcm'
      },
      errors: []
    }
    
    await username.setValue('main.mendoza');
    await password.setValue('mainedcm');
    await submitBtn.click();
    
    expect(emitter).toHaveBeenCalledWith(expectedTouched);
  });

  it('Should set values', async() => {
    //
    const values: ILogin = {
      username: 'catriona.gray',
      password: 'catriona_gray'
    }

    component.formValues = values;

    const username = await loader.getHarness(MatInputHarness.with({placeholder: 'username'}));
    const password = await loader.getHarness(MatInputHarness.with({placeholder: 'password'}));

    const usernameValue = await username.getValue();
    const passwordValue = await password.getValue();

    expect(usernameValue).toBe('catriona.gray');
    expect(passwordValue).toBe('catriona_gray')

  });

  
});
