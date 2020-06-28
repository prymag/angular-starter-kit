import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';

@Injectable()
export class LoadingIndicatorService {

  showIndicator$ = new Subject();

  show() {
    this.showIndicator$.next(true);
  }

  hide() {
    this.showIndicator$.next(false);
  }

}