import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { User } from "./user.model";
import { ErrorService } from "../errors/error.service";

@Injectable()
export class AuthService {
	constructor(private http: Http, private errorService: ErrorService) {}

	signup(user: User){ // this service method will trigger when user hits signup button
		const body = JSON.stringify(user); // stringify user we pass to func
		const headers = new Headers({'Content-Type': 'application/json'});
		return this.http.post('http://localhost:3000/user', body, {headers: headers})
			.map((response: Response) => response.json()) // response.json to retreive data sent with response
			.catch((error: Response) => {
				this.errorService.handledError(error.json());
				return Observable.throw(error.json());
			});
	}

	signin(user: User){ 
		const body = JSON.stringify(user); 
		const headers = new Headers({'Content-Type': 'application/json'});
		return this.http.post('http://localhost:3000/user/signin', body, {headers: headers})
			.map((response: Response) => response.json()) 
			.catch((error: Response) => {
				this.errorService.handledError(error.json());
				return Observable.throw(error.json());
			});
	}

	logout() {
		localStorage.clear();// delete userid and token
	}

	isLoggedIn(){ // check if token exists, if no token-> not logged in
		return localStorage.getItem('token') !== null; // means we have token and return true
	}
}