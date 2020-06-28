import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { LoadingIndicatorService } from '../services/loading-indicator.service';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class ToggleLoadingIndicatorInterceptor implements HttpInterceptor {
  //
  constructor(public _loadingIndicatorService: LoadingIndicatorService) {}
  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // 
    this._loadingIndicatorService.show();

    return next.handle(request)
      .pipe(
        map((event: HttpEvent<any>) => {
          //
          if (event instanceof HttpResponse) {
            this._loadingIndicatorService.hide();
          }
          return event;
        })
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          //
          this._loadingIndicatorService.hide();
          return throwError(error);
        })
      )
  }
}