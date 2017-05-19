import { EventEmitter } from "@angular/core";

import { Error } from "./error.model";

export class ErrorService {
	errorOccured = new EventEmitter<Error>();

	handledError(error: any) {
		// backend sets up errors to have title, and error obj with message obj inside error obj 
		const errorData = new Error(error.title, error.error.message);
		this.errorOccured.emit(errorData); // emit error to be subscribed to in components
	}
}