import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { User } from "./user.model";

@Injectable()
export class AuthService {
	constructor(private http: Http) {}

	signup(user: User){ // this service method will trigger when user hits signup button
		const body = JSON.stringify(user); // stringify user we pass to func
		const headers = new Headers({'Content-Type': 'application/json'});
		return this.http.post('http://localhost:3000/user', body, {headers: headers})
			.map((response: Response) => response.json()) // response.json to retreive data sent with response
			.catch((error: Response) => Observable.throw(error.json()));;
	}

	signin(user: User){ 
		const body = JSON.stringify(user); 
		const headers = new Headers({'Content-Type': 'application/json'});
		return this.http.post('http://localhost:3000/user/signin', body, {headers: headers})
			.map((response: Response) => response.json()) 
			.catch((error: Response) => Observable.throw(error.json()));;
	}
}