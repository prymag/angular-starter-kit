import { Injectable } from "@angular/core";
import { ToastrService } from 'ngx-toastr';
import { IFormError } from '@core/interfaces/form-error.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  //
  constructor(private _toastr: ToastrService){}

  notifyFormErrors(errors: IFormError[]) {
    const count = errors.length;
    const errTxt = count > 1 ? 'fields' : 'field';
    this._toastr.error(`${count} ${errTxt} invalid`, 'Error');
  }

  notifyError(error: any, title = 'Error') {
    //
    let msg = '';
    if (error instanceof HttpErrorResponse) {
      //
      if (error.status == 504) {
        msg = error.statusText;
      } else {
        msg = error.message;
      }
    }

    console.error(error);
    return this._toastr.error(msg, title);
  }

}