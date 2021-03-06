import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from "@env/environment";
import { ICredentials } from '@core/interfaces/auth.interface';
import { IResponse } from '@core/interfaces/response.interface';
import { Observable, Subject } from 'rxjs';
import { ILogin } from 'src/app/modules/auth/interfaces/login.interface';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private API_URL: string | null = env.API_URL;

    authorizedUser$: Subject<any | null> = new Subject<any | null>();
    
    constructor(
        private _httpClient: HttpClient,
    ){}

    login(postData: ILogin): Observable<IResponse<ICredentials>> {
        const url = `${this.API_URL}/login`;
        return this._httpClient.post<IResponse<ICredentials>>(url, postData);
    }

    setAuthorizedUser(creds: ICredentials): void {
        localStorage.setItem('c_user', JSON.stringify(creds.user));
        this.authorizedUser$.next(creds);
    }

    getAuthorizedUser() {
      const user = localStorage.getItem('c_user');
      //
      return user ? JSON.parse(user) : false;
    }

    isAuthorized(): Observable<IResponse<any>> {
        const url = `${this.API_URL}/is-authorized`;
        return this._httpClient.post<IResponse<any>>(url, {});
    }

}