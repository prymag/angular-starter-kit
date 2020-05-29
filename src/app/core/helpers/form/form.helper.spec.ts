import { FormHelper } from "./form.helper";
import { async, TestBed } from '@angular/core/testing';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IFormError } from '@core/interfaces/form-error.interface';

describe("FormHelper", () => {
  //
  let formHelper: FormHelper;
  let fb: FormBuilder;
  let formGroup: FormGroup;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule],
      providers:[ FormHelper ],
    });

    formHelper = TestBed.inject(FormHelper);
    fb = TestBed.inject(FormBuilder);
    
    formGroup = fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      emailAddress: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.minLength(5)]]
    });
  }));

  it('Should get form errors', () => {
    //
    const expected: IFormError[] = [
      {
        control: 'firstname',
        value: '',
        error: 'required',
        meta: true
      },
      {
        control: 'lastname',
        value: '',
        error: 'required',
        meta: true
      },
      {
        control: 'emailAddress',
        value: 'hello',
        error: 'email',
        meta: true
      },
      {
        control: 'username',
        value: 'jak',
        error: 'minlength',
        meta: {
          requiredLength: 5,
          actualLength: 3
        }
      }
    ];

    formGroup.controls.emailAddress.setValue('hello');
    formGroup.controls.username.setValue('jak');

    const result = formHelper.getValidationErrors(formGroup);
    
    expect(result).toEqual(expected);
  });

  it('Shoud get error message', () => {
    //

    const formGroup = fb.group({
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required, Validators.min(18), Validators.max(30)] ]
    });
    
    let result = formHelper.getErrorMessage(formGroup, 'email');
    expect(result).toBe('Required');

    formGroup.controls['email'].setValue('hello');
    result = formHelper.getErrorMessage(formGroup, 'email');
    expect(result).toBe('Should be a valid email address');

    formGroup.controls['age'].setValue(4);
    result = formHelper.getErrorMessage(formGroup, 'age');
    expect(result).toBe('Value should not be less than 18');
    
    formGroup.controls['age'].setValue(34);
    result = formHelper.getErrorMessage(formGroup, 'age');
    expect(result).toBe('Value should not be greater than 30');
    
  });


});