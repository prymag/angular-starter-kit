import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { FormHelper } from '@core/helpers/form/form.helper';
import { IFormError } from '@core/interfaces/form-error.interface';
import { IFormSubmit } from '@core/interfaces/form-submit.interface';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-base-form',
  template: ``,
  providers: [ FormHelper ]
})
export class BaseFormComponent implements OnInit {

  theForm: FormGroup;

  /**
   * use `ee` as event emitter prefix
   * to avoid clash with `on` events
   */
  eeFormSubmit: EventEmitter<IFormSubmit<any>> = new EventEmitter();

  formValues$ = new Subject<any>();
  destroy$ = new Subject<boolean>();

  constructor(
    protected _fb: FormBuilder,
    protected _formHelper: FormHelper,
    protected _toastr: ToastrService
  ) { }

  @Input() set formValues(values: any) {
    this.formValues$.next(values);
  }

  ngOnInit(): void {
    this.buildForm();
    this.willUpdateFormValues();
  }

  buildForm() {}

  willUpdateFormValues() {
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
    const errors = this._formHelper.getValidationErrors(this.theForm);

    this.emitFormValues(errors);
  }

  emitFormValues(errors: IFormError[]) {
    this.eeFormSubmit.emit({
      valid: this.theForm.valid,
      values: this.theForm.value,
      errors: errors
    });
  }

  ngOnDestroy() {
    //
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
