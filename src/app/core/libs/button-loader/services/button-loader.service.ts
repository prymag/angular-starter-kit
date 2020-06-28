import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';

@Injectable()
export class ButtonLoaderService {

  showLoading$ = new Subject();

  constructor() {

  }

  show() {
    this.showLoading$.next(true);
  }

  hide() {
    this.showLoading$.next(false);
  }

}