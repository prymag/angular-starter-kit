import { GuestGuard } from './guest.guard';
import { IUser } from '@core/interfaces/user.interface';

class MockRouter {
  navigate(route) {}
}

describe('GuestGuard', () => {
  let guard: GuestGuard;
  let authService;
  let router;

  beforeEach(() => {
    //
    authService = { getAuthorizedUser: () => {}}
    router = new MockRouter();
    guard = new GuestGuard(authService, router);
  });

  it('should redirect if authenticated', () => {
    //
    const mockUser: IUser = {
      firstname: 'kaye',
      lastname: 'abad'
    };

    const spyAuth = spyOn(authService, 'getAuthorizedUser').and.callFake(() => mockUser);
    const spyRouter = spyOn(router, 'navigate');

    guard.canActivate(null, null);

    expect(spyAuth).toHaveBeenCalled();
    expect(spyRouter).toHaveBeenCalledWith(['/']);
  });

  it('should not redirect if guest', () => {
    //
    spyOn(authService, 'getAuthorizedUser').and.callFake(() => false);
    const spyRouter = spyOn(router, 'navigate');

    const result = guard.canActivate(null, null);

    expect(spyRouter).not.toHaveBeenCalled();
    expect(result).toBeFalse();
  });
});
