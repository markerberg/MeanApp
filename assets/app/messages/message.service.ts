import { Http, Response, Headers } from "@angular/http";
import { Injectable, EventEmitter } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { Message } from "./message.model";

// ang2 service injector only works if theres metadata
// we use @Injectable to be able to use service inside this service
@Injectable()
export class MessageService{
	private messages: Message[] = [];
	messageIsEdit = new EventEmitter<Message>();

	// this constructor now allows us to use http service
	constructor(private http: Http) {}

	// SAVE MESSAGE
	addMessage(message: Message) {
		const body = JSON.stringify(message);
		const headers = new Headers({'Content-Type': 'application/json'});// change headers w/ang2
		// .map allow us to transform data once it comes back from server
		// we set up how data should transform here, so funcs can use this transformed format
		// we then configure req headers to have the headers we set 
		return this.http.post('http://localhost:3000/message', body, {headers: headers})
			.map((response: Response) => {
				var result = response.json()  // give us data attach from response in json
				const message = new Message(result.obj.content, 'Dummy', result.obj._id, null); // created msg is stored in obj field on backend
				this.messages.push(message);
				return message;
			})
			// we return observable, map func converts to observable automatically but catch doesn't, so we call it
			.catch((error: Response) => Observable.throw(error.json())); // extract data obj from error response
	}

	// RETURN IT 
	getMessage() {
		return this.http.get('http://localhost:3000/message')
			.map((response: Response) => {
				// retrieve message with json response and access .obj field(routes/message)
				const messages = response.json().obj;
				// transform message structure to look like our message.model.ts
				let transformedMessages: Message[] = [];
				// loop through messages array from server, transform and push into new transformed array
				for (let message of messages) { //forOf is es6 syntax supported by ts to loop through const messages 
					// assign name/value based on message model
					transformedMessages.push(new Message(message.content, 'TestName', message._id, null));
				}
				this.messages = transformedMessages;
				return transformedMessages;
			})
			.catch((error: Response) => Observable.throw(error.json()));
	}

	editMessage(message: Message) {
		// this will let us act as a middleman btwn message component and input component
		this.messageIsEdit.emit(message);
	}

	updateMessage(message: Message) {
		const body = JSON.stringify(message);
		const headers = new Headers({'Content-Type': 'application/json'});
		return this.http.patch('http://localhost:3000/message/' + message.messageId, body, {headers: headers})
			.map((response: Response) => response.json()) 
			.catch((error: Response) => Observable.throw(error.json())); 
	}

	deleteMessage(message: Message) {
		this.messages.splice(this.messages.indexOf(message), 1);
	}
}