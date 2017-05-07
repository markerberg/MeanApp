import { Component, OnInit } from "@angular/core";

import { Message } from "./message.model";
import { MessageService } from "./message.service";

@Component({
	selector: 'app-message-list',
	template: `
		<div class="col-md-8 col-md-offset-2">
		<!-- $event is the value we pass through the event in message.ts -->
			<app-message 
				[message]="message" 
				*ngFor="let message of messages"></app-message>
		</div>
	`
})
// implement lifecycle method OnInit to execute when component is initialized 
export class MessageListComponent implements OnInit {
    messages: Message[];

	constructor(private messageService: MessageService) {}

	// this will run automaticall after component/props are initialized
	ngOnInit() {
		this.messageService.getMessage()
			.subscribe(
				(messages: Message[]) => {
					this.messages = messages;
				}
				);
	}

}