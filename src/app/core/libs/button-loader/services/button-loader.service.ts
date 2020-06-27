import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';

@Injectable()
export class ButtonLoaderService {

  showLoading$ = new Subject();

  constructor() {

  }

  showLoading() {
    this.showLoading$.next(true);
  }

  hideLoading() {
    this.showLoading$.next(false);
  }

}