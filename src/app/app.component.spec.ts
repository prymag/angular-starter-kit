import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, NavigationEnd, RouterEvent } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from '@core/auth/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';


// mocked source of events
const routerEventsSubject = new Subject<RouterEvent>();
const spyNavigate = jasmine.createSpy('navigate');

const routerStub = {
    navigate: spyNavigate,
    events: routerEventsSubject.asObservable()
};

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: Router, useValue: routerStub}
      ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('Should set the layout', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    const event = new NavigationEnd(42, '/login', '/');

    expect(component.layout).toBe('default');

    fixture.detectChanges();
    routerEventsSubject.next(event);

    expect(component.layout).toBe('empty');
  });

  it('Should redirect to login page', () => {
    //
    spyNavigate.calls.reset();
    
    const fixture = TestBed.createComponent(AppComponent);
    const authService = fixture.debugElement.injector.get(AuthService);
    
    const spyGetAuthorizedUser = spyOn(authService, 'getAuthorizedUser').and.callFake(() => '');

    fixture.detectChanges();

    expect(spyGetAuthorizedUser).toHaveBeenCalled();
    
    expect(spyNavigate).toHaveBeenCalledWith(['/login']);
    expect(spyNavigate).toHaveBeenCalledTimes(1);
  })

});
