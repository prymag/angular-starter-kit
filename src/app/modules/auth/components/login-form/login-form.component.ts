import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { IFormSubmit } from '@core/interfaces/form-submit.interface';
import { FormHelper } from '@core/helpers/form/form.helper';
import { Subject } from 'rxjs';
import { ILogin } from '../../interfaces/login.interface';
import { BaseFormComponent } from '@core/base-components/base-form/base-form.component';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
  providers: [ FormHelper ]
})
export class LoginFormComponent extends BaseFormComponent {

  theForm: FormGroup;
  formValues$ = new Subject<ILogin>();

  @Output() eeFormSubmit: EventEmitter<IFormSubmit<ILogin>> = new EventEmitter();

  @Input() set formValues(values: ILogin) {
    this.formValues$.next(values);
  }

  buildForm() {
    //
    this.theForm = this._fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

}
