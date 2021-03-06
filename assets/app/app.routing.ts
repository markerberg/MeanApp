import { Routes, RouterModule } from "@angular/router";

import { MessagesComponent } from "./messages/messages.component";
import { AuthenticationComponent } from "./auth/authentication.component";
import { AUTH_ROUTES } from "./auth/auth.routes";

const APP_ROUTES: Routes = [
	// pathMatch tells ang2 to only redirect if '' is empty. we must include this for '' path
	{ path: '', redirectTo: '/messages', pathMatch: 'full' },
	{ path: 'messages', component: MessagesComponent },
	// register auth.routes array as children for /auth, so url will be auth/signup etc.
	{ path: 'auth', component: AuthenticationComponent, children: AUTH_ROUTES }
];

// this register our routes in ang2 router module
export const routing = RouterModule.forRoot(APP_ROUTES);