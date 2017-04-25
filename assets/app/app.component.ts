import { Component } from '@angular/core';

import { MessageService } from "./messages/message.service";

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    providers: [MessageService] // create one single instance of service for appcomponent and all its children components
})
export class AppComponent {

}