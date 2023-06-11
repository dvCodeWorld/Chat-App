import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthLayoutComponent } from "./auth-layout/auth-layout.component";
import { ForgotPasswordComponent } from "./pages/forgot-password/forgot-password.component";
import { LoginComponent } from "./pages/login/login.component";
import { OtpVerifiedComponent } from "./pages/otp-verified/otp-verified.component";
import { SignupComponent } from "./pages/signup/signup.component";
import { UpdatePasswordComponent } from "./pages/update-password/update-password.component";
import { UpdateProfileComponent } from "./pages/update-profile/update-profile.component";

const routes: Routes = [
    {
        path: '', component: AuthLayoutComponent, children:
            [
                { path: '', redirectTo: 'login', pathMatch: 'full' },
                { path: 'login', component: LoginComponent },
                { path: 'sign-up', component: SignupComponent },
                { path: 'otp-verify', component: OtpVerifiedComponent },
                { path: 'update-password', component: UpdatePasswordComponent },
                { path: 'forgot-password', component: ForgotPasswordComponent },
                { path: 'profile-update', component: UpdateProfileComponent },

            ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AuthRoutingModule { }