import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from "@env/environment";
import { ILogin, ICredentials } from '@core/interfaces/auth.interface';
import { IResponse } from '@core/interfaces/response.interface';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

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

    setAuthorizedUser(user: any): void {
        this.authorizedUser$.next(user);
    }

    isAuthorized(): Observable<IResponse<any>> {
        const url = `${this.API_URL}/is-authorized`;
        return this._httpClient.post<IResponse<any>>(url, {});
    }

}