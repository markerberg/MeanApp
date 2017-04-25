// blueprint for how a message should look like

export class Message { // we can replace all these props and constructor code with whats used in user.model.ts(using public)
	content: string;
	username: string;
	messageId?: string;
	userId?: string;

	constructor(content: string, username: string, messageId?: string, userId?: string){
		this.content = content;
		this.username = username;
		this.messageId = messageId;
		this.userId = userId;
	}
}