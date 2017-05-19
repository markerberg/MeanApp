import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'; 
import { HttpModule } from '@angular/http';

import { AppComponent } from "./app.component";
import { AuthenticationComponent } from "./auth/authentication.component";
import { HeaderComponent } from "./header.component";
import { routing } from "./app.routing";
import { LogoutComponent } from "./auth/logout.component";
import { SignupComponent } from "./auth/signup.component";
import { SigninComponent } from "./auth/signin.component";
import { AuthService } from "./auth/auth.service";
import { ErrorComponent } from "./errors/error.component";
import { ErrorService } from "./errors/error.service";
import { MessageModule } from "./messages/message.module";

@NgModule({
    declarations: [ // components/directives/pipes that make up our app
        AppComponent,
        AuthenticationComponent,
        HeaderComponent,
        LogoutComponent,
        SignupComponent,
        SigninComponent,
        ErrorComponent
    ],
    imports: [BrowserModule, 
              routing, 
              ReactiveFormsModule,
              HttpModule,
              MessageModule
    ], // built in modules we import for functionality
    providers: [AuthService, ErrorService], // what goes in here is available in whole app module/ the whole application 
    bootstrap: [AppComponent] //  which component is the root component 
})
export class AppModule {
	content = 'some content';
}