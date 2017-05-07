import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

import { MessageService } from "./message.service";
import { Message } from "./message.model";

@Component({
	selector: 'app-message-input',
	templateUrl: './message-input.component.html',
})
export class MessageInputComponent implements OnInit {
	// represent the message loaded into input field
	// initially set to null
	message: Message;

	// this constructor will inject messageService service instance 
	constructor(private messageService: MessageService) {}

	onSubmit(form: NgForm) {
		if (this.message) {
			// Edit
			this.message.content = form.value.content;
			this.message = null;
		} else {
			// Create
			// form.value.content comes from the name="" on form, its the text that we input
		const message = new Message(form.value.content, 'Mark');
		this.messageService.addMessage(message) // we must subscribe to the observable to make things happen
			.subscribe( // 3 callbacks
				data => console.log(data),// success case, when we recieve new data thru obs
				error => console.log(error)// error function
				// complete function, called when obs knows no more data to come
				);
		}
		form.resetForm();
	}

	onClear(form: NgForm) {
		this.message = null;
		form.resetForm();
	}

	ngOnInit() {
		// sub to any event thats submitted, so this component gets informed when we click edit in any other component 
		this.messageService.messageIsEdit.subscribe(
			// if event fired and we get data, set this message equal to message from eventEmitter
			(message: Message) => this.message = message
		);
	}
}