import { Directive, ElementRef, Renderer2, OnInit, OnDestroy } from '@angular/core';
import { ButtonLoaderService } from '../services/button-loader.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[button-loader]',
})
export class ButtonLoaderDirective implements OnInit, OnDestroy {

  destroy$ = new Subject<boolean>();
  _spinner;

  constructor(
    private _service: ButtonLoaderService,
    private _renderer: Renderer2,
    private _el: ElementRef
  ) {
  }

  ngOnInit() {
    this._renderer.addClass(this._el.nativeElement, 'btn-loader');

    this.listenToLoading();
    this.createSpinner();
  }

  run() {
    this.disable(1);
    this.addSpinner();
    this.addClasses();
  }

  stop() {
    this.disable(0);
    this.removeSpinner();
    this.removeClasses();
  }

  disable(disable) {
    this._el.nativeElement.disabled = disable;
  }

  createSpinner() {
    //
    this._spinner = this._renderer.createElement('div');
    this._renderer.addClass(this._spinner, 'spinner');
  }

  addSpinner() {    
    this._renderer.appendChild(this._el.nativeElement, this._spinner);
  }

  removeSpinner() {
    this._renderer.removeChild(this._el.nativeElement, this._spinner);
  }

  addClasses() {
    this._renderer.addClass(this._el.nativeElement, 'btn-loader-start');
  }

  removeClasses() {
    this._renderer.removeClass(this._el.nativeElement, 'btn-loader-start'); 
  }

  listenToLoading() {
    this._service
      .showLoading$
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        if (data) {
          this.run();
        } else {
          this.stop();
        }
      })
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
