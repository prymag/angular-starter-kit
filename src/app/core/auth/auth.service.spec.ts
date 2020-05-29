import { AuthService } from "./auth.service";
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { environment as env } from "@env/environment";
import { IResponse } from '@core/interfaces/response.interface';

describe("AuthService", () => {
    //
    let authService: AuthService,
        httpMock: HttpTestingController,
        httpClient: HttpClient;

    beforeEach(() => {
        //
        TestBed.configureTestingModule({
            providers:[ AuthService ],
            imports: [ HttpClientTestingModule ]
        });

        httpClient = TestBed.inject(HttpClient);
        authService = TestBed.inject(AuthService);
        /**
         * HttpTestingController is used to mock http requests
         * do not get it mixed up with the controller concept of `MVC`
         */
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    })

    it('Should be able to login and retrive token', (done) => {
        //
        const username = 'popoy.g',
            password = 'gonzles';

        const expected: IResponse<any> = {
                "success": true,
                "message": "Success",
                "data": {
                    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWFjYzYxNmIyOTkyZDRiZjAxMWU1MzgiLCJ1c2VybmFtZSI6InBsYXNtYSIsImVtYWlsIjoicGxhc21hQGxsLmNvbSIsIl9fdiI6MCwiZmlyc3RuYW1lIjoicmVuemQiLCJpYXQiOjE1OTAzOTQyODV9.Yg9s3-_LPKbnyibgjh5jFFETbZvWEk3g7e9k-PEH46k"
                }
            };

        authService.login({username, password})
            .subscribe(success => {
                expect(success).toEqual(expected);
                done();
            });

        const url = `${env.API_URL}/login`
        const req = httpMock.expectOne(url);
        
        expect(req.request.method).toEqual('POST');
        
        req.flush(expected);
    });

    it('Should set authorized user', (done) => {
        //
        const mockCredentials = {
            token: "abcde.ewefe.xxee",
            user: {
                firstname: 'karen',
                lastname: 'davila'
            }
        }

        authService.authorizedUser$.subscribe(credentials => {
            expect(credentials).toEqual(jasmine.objectContaining(mockCredentials));
            done();
        });

        authService.setAuthorizedUser(mockCredentials);
    });

    it('Should check if authorized', (done) => {
        //
        const mockResponse: IResponse<any> = {
            success: false,
            message: 'Success',
            data: {
                token: 'abxcd.cdd.cd',
                user: {
                    firstname: 'mike',
                    lastname: 'enriquez'
                }
            }
        }

        authService.isAuthorized().subscribe(success => {
            expect(success).toEqual(jasmine.objectContaining(mockResponse));
            done();
        });

        const url = `${env.API_URL}/is-authorized`
        const req = httpMock.expectOne(url);

        expect(req.request.method).toEqual('POST');
        req.flush(mockResponse);
    });
});