import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
})

export class TokenInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('user_token');

        if (token) {
            request = request.clone({
                setHeaders: {
                    'Access-Control-Allow-Origin': '*',
                    Authorization: token
                }
            });
        } else {
            request = request.clone({
                setHeaders: {
                    'Access-Control-Allow-Origin': '*'
                }
            });
        }
        return next.handle(request);
    }
}