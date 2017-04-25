// assign each var public to make it a property of this class and assign the value automatically
// this is a short version of what we did in first 10 lines of message.model.ts
export class User {
	constructor(
		public email: string,
		public password: string,
		public firstName?: string, // ? means arg is optional
		public lastName?: string) {} // this goes undefined by default
}