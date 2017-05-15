import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { AuthService } from "./auth.service";
import { User } from "./user.model";

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit{
	myForm: FormGroup;

	constructor(private authService: AuthService) {}

	onSubmit(){ 
		const user = new User( // pass values from the myForm fields
			this.myForm.value.email, 
			this.myForm.value.password,
			this.myForm.value.firstName,
			this.myForm.value.lastName
		);
		this.authService.signup(user) // signup meth return observable so we subscribe to it to send req and listen to data we get back
			.subscribe(
				data => console.log(data),
				error => console.error(error)
			);
		this.myForm.reset(); // reset form after submission
	}

	// when component is created, so is the form
	ngOnInit() {
		this.myForm = new FormGroup({ // pass obj filled with controls for form
			firstName: new FormControl(null, Validators.required),
			lastName: new FormControl(null, Validators.required),
			email: new FormControl(null, [
				Validators.required,
				Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
			]),
			password: new FormControl(null, Validators.required)
		});
	}
}