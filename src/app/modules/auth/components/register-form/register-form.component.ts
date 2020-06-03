import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormHelper } from '@core/helpers/form/form.helper';
import { environment as env } from "@env/environment";
import { IFormSubmit } from '@core/interfaces/form-submit.interface';
import { IRegister } from '../../interfaces/register.interface';
import { BaseFormComponent } from '@core/base-components/base-form/base-form.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
  providers: [ FormHelper ]
})
export class RegisterFormComponent extends BaseFormComponent {

  theForm: FormGroup;

  formValues$ = new Subject<IRegister>();

  @Output() eeFormSubmit: EventEmitter<IFormSubmit<IRegister>> = new EventEmitter();

  buildForm() {
    this.theForm = this._fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(env.MIN_PASSWORD_LENGTH)]],
      firstname: ['', Validators.required],
      lastname: [''],
      email: ['', [Validators.required, Validators.email]]
    });
  }

}
