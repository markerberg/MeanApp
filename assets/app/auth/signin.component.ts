import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";


@Component({
	selector: 'app-signin',
	templateUrl: './signin.component.html'
})
export class SigninComponent{
	myForm: FormGroup;

	onSubmit(){ 
		console.log(this.myForm);
		this.myForm.reset(); // reset form after submission
	}

	// when component is created, so is the form
	ngOnInit() {
		this.myForm = new FormGroup({ // pass obj filled with controls for form
			email: new FormControl(null, [
				Validators.required,
				Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
			]),
			password: new FormControl(null, Validators.required)
		});
	}
}