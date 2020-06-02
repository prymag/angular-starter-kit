import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormHelper } from '@core/helpers/form/form.helper';
import { environment as env } from "@env/environment";
import { IFormSubmit } from '@core/interfaces/form-submit.interface';
import { IRegister } from '../../interfaces/register.interface';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
  providers: [ FormHelper ]
})
export class RegisterFormComponent implements OnInit {

  theForm: FormGroup;

  @Output() registerFormSubmit: EventEmitter<IFormSubmit<IRegister>> = new EventEmitter();

  constructor(
    private _fb: FormBuilder,
    private _formHelper: FormHelper
  ) { }

  ngOnInit(): void {
    //
    this.buildForm();
  }

  buildForm() {
    this.theForm = this._fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(env.MIN_PASSWORD_LENGTH)]],
      firstname: ['', Validators.required],
      lastname: [''],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  displayControlError(controlName: string) {
    return this._formHelper.getErrorMessage(this.theForm, controlName);
  }

  onSubmit() {
    //
    this.registerFormSubmit.emit({
      valid: this.theForm.valid,
      values: this.theForm.value,
      errors: this._formHelper.getValidationErrors(this.theForm)
    });
  }

}
