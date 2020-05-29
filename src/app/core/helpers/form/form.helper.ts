import { FormGroup, ValidationErrors, AbstractControl } from '@angular/forms';
import { IFormError } from '../../interfaces/form-error.interface';

export class FormHelper {
  //
  // Modified from - https://gist.github.com/domagoj03/befeb17c17ff3ede2d36b8f59f0ad6a6
  getValidationErrors(form: FormGroup): IFormError[] {
    const result = [];
    Object.keys(form.controls).forEach(key => {
      const formProperty = form.get(key);
      if (formProperty instanceof FormGroup) {
        result.push(...this.getValidationErrors(formProperty))
      }
      const controlErrors: ValidationErrors = formProperty.errors;
      
      if (controlErrors) {
        Object.keys(controlErrors).forEach(keyError => {
          result.push({
            'control': key,
            'error': keyError,
            'value': formProperty.value,
            'meta': controlErrors[keyError]
          });
        });
      }
    });
  
    return result;
  }

  getErrorMessage(formGroup: FormGroup, controlName: string) {
    //
    const control = formGroup.controls[controlName];
    if (control) {
      if (control.hasError('required')) return 'Required';
      if (control.hasError('email')) return 'Should be a valid email address';
      if (control.hasError('min')) return `Value should not be less than ${control.errors.min.min}`;
      if (control.hasError('max')) return `Value should not be greater than ${control.errors.max.max}`;
    }

    return '';

  }
}
