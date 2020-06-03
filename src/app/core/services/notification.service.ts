import { Injectable } from "@angular/core";
import { ToastrService } from 'ngx-toastr';
import { IFormError } from '@core/interfaces/form-error.interface';

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

}