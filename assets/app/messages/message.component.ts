import { Component, Input, Output, EventEmitter } from "@angular/core";

import { Message } from "./message.model";
import { MessageService } from "./message.service";

@Component({
	selector: 'app-message',
	templateUrl: './message.component.html',
    styles: [`
    	.author{
    		display: inline-block;
    		font-style: italic;
    		font-size: 12px;
    		width: 80%;
    	}
    	.config{
    		display: inline-block;
    		text-align: right;
    		font-size: 12px;
    		width: 19%;
    	}
    `]
})
export class MessageComponent {
    // use @Input to make message assignable from outside
    @Input() message: Message;
    // output creates event to be passed = eventName which is an event emitter
    // <> specify type of data being used, you can use <any> if unsure of data type
    @Output() editClicked = new EventEmitter<string>();

    // inject message service to be used
    constructor(private messageService: MessageService) {}
    
    // use editClicked eventemitter and emit a new event with arg
    onEdit() {
        this.editClicked.emit('A new value');
    }

    // use messageService method and pass to it, the message that we get passed from outside- which is the currently loaded one
    onDelete() {
        this.messageService.deleteMessage(this.message);
    }
}