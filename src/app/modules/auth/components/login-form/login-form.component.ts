import { Component, OnInit, EventEmitter, Output, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IFormSubmit } from '@core/interfaces/form-submit.interface';
import { FormHelper } from '@core/helpers/form/form.helper';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ILogin } from '../../interfaces/login.interface';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
  providers: [ FormHelper ]
})
export class LoginFormComponent implements OnInit, OnDestroy {

  theForm: FormGroup;

  formValues$ = new Subject<ILogin>();
  destroy$ = new Subject<boolean>();

  @Output() loginFormSubmit: EventEmitter<IFormSubmit<ILogin>> = new EventEmitter();

  constructor(
    private _fb: FormBuilder,
    private _formHelper: FormHelper
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  @Input() set formValues(values: ILogin) {
    this.formValues$.next(values);
  }

  buildForm() {
    this.theForm = this._fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.formValues$
      .pipe(takeUntil(this.destroy$))
      .subscribe(values => {
        this.theForm.setValue(values);
      });
  }

  displayControlError(controlName: string) {
    return this._formHelper.getErrorMessage(this.theForm, controlName);
  }

  onSubmit() {
    //
    this.loginFormSubmit.emit({
      valid: this.theForm.valid,
      values: this.theForm.value,
      errors: this._formHelper.getValidationErrors(this.theForm)
    });
  }

  ngOnDestroy() {
    //
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
