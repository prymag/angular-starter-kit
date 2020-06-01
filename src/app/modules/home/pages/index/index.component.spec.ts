import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexComponent } from './index.component';
import { By } from '@angular/platform-browser';
import { AuthService } from '@core/auth/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('IndexComponent', () => {
  let component: IndexComponent;
  let fixture: ComponentFixture<IndexComponent>;
  let authService: AuthService;
  let spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexComponent ],
      providers: [ AuthService ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexComponent);
    authService = fixture.debugElement.injector.get(AuthService);
    component = fixture.componentInstance;
  });
  
  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();

    const h1 = fixture.debugElement.query(By.css('h1'))
    expect(h1).toBeFalsy();
  });

  it('Should display logged in user', () => {
    //
    const mockUser = {
      firstname: 'bea',
      lastname: 'alonzo'
    }
    spy = spyOn(authService, "getAuthorizedUser").and.callFake(() => mockUser);

    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();

    const h1 = fixture.debugElement.query(By.css('h1'));
    expect(h1).toBeTruthy();    

    const result = h1.nativeElement.innerHTML;
    expect(result).toBe('Welcome: bea alonzo!');
  });
});
