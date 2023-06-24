import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { catchError, map } from "rxjs";
import { UsersService } from "../services/users.service";


@Injectable({
    providedIn: 'root'
})

export class AllUsersResolverService {
    constructor(
        private _alluserService: UsersService
    ) { }
    // resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //     return this._alluserService.getPage(route.routeConfig?.path, route.params, route.queryParams,)?.pipe(
    //         map(res => {
    //             return res;
    //         }),
    //         catchError(error => {
    //             throw error
    //         })
    //     )
    // }
}