import { Component, Input } from "@angular/core";

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

    // inject message service to be used
    constructor(private messageService: MessageService) {}
    
    // use editClicked eventemitter and emit a new event with arg
    onEdit() {
        this.messageService.editMessage(this.message);
    }

    // use messageService method and pass to it, the message that we get passed from outside- which is the currently loaded one
    onDelete() {
        this.messageService.deleteMessage(this.message)
            .subscribe(
                result => console.log(result)
            );
    }
}