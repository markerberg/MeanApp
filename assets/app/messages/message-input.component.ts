import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";

import { MessageService } from "./message.service";
import { Message } from "./message.model";

@Component({
	selector: 'app-message-input',
	templateUrl: './message-input.component.html',
})
export class MessageInputComponent {
	// this constructor will inject messageService service instance 
	constructor(private messageService: MessageService) {}

	onSubmit(form: NgForm) {
		// form.value.content comes from the name="" on form, its the text that we input
		const message = new Message(form.value.content, 'Mark');
		this.messageService.addMessage(message);
		form.resetForm();
	}
}