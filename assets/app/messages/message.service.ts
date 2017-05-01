import { Http, Response, Headers } from "@angular/http";
import { Injectable } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { Message } from "./message.model";

// ang2 service injector only works if theres metadata
// we use @Injectable to be able to use service inside this service
@Injectable()
export class MessageService{
	private messages: Message[] = [];

	// this constructor now allows us to use http service
	constructor(private http: Http) {}

	addMessage(message: Message) {
		this.messages.push(message);
		const body = JSON.stringify(message);
		const headers = new Headers({'Content-Type': 'application/json'});// change headers w/ang2
		// .map allow us to transform data once it comes back from server
		// we set up how data should transform here, so funcs can use this transformed format
		// we then configure req headers to have the headers we set 
		return this.http.post('http://localhost:3000/message', body, {headers: headers})
			.map((response: Response) => response.json()) // give us data attach from response in json
			// we return observable, map func converts to observable automatically but catch doesn't, so we call it
			.catch((error: Response) => Observable.throw(error.json())); // extract data obj from error response
	}

	getMessage() {
		return this.messages;
	}

	deleteMessage(message: Message) {
		this.messages.splice(this.messages.indexOf(message), 1);
	}
}