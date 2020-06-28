import { Component, OnInit, Input } from '@angular/core';
import { slideDownUp } from '../../animations/slide-down-up.animation';
import { Subject } from 'rxjs';
import { LoadingIndicatorService } from '../../services/loading-indicator.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-loading-indicator',
  templateUrl: './loading-indicator.component.html',
  styleUrls: ['./loading-indicator.component.scss'],
  animations: [slideDownUp]
})
export class LoadingIndicatorComponent implements OnInit {

  destroy$ = new Subject<boolean>();

  @Input() size = '40px';
  @Input() bgColor = '#3e3e3e';
  @Input() color = 'red';
  @Input() highlightColor = 'transparent'
  @Input() width = '.3em';

  state = 'slideUp';

  indicatorStyle = {};
  spinnerStyle = {};

  constructor(private _loadingIndicatorService: LoadingIndicatorService) { }

  ngOnInit(): void {
    //
    this.listenToService();
    this.setIndicatorStyles();
    this.setSpinnerStyles();
  }

  setSpinnerStyles() {
    this.spinnerStyle = {
      borderTopColor: this.highlightColor,
      borderTopWidth: this.width,
      borderRightColor: this.highlightColor,
      borderRightWidth: this.width,
      borderBottomColor: this.highlightColor,
      borderBottomWidth: this.width,
      borderLeftWidth: this.width,
      borderLeftColor: this.color
    }
  }

  setIndicatorStyles() {
    this.indicatorStyle = {
      backgroundColor: this.bgColor,
      width: this.size,
      height: this.size,
    }
  }

  listenToService() {
    //
    this._loadingIndicatorService
      .showIndicator$
      .pipe(takeUntil(this.destroy$))
      .subscribe(show => {
        //
        this.state = show ? 'slideDown' : 'slideUp';
      })
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

}
