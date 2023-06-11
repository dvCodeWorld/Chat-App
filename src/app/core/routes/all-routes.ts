import { Routes } from "@angular/router";
import { AuthGuardService } from "../services/auth-guard.service"

export const ALL_ROUTES: Routes = [
    {
        path: 'Users',
        loadChildren: () => import('../../user-list/user-list.module').then(m => m.UserListModule),
        // canActivate: [AuthGuardService]
    }
]