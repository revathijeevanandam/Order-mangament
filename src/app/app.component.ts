import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // title = 'simplepjt';

  addUserForm: FormGroup;

  isFormSubmitted = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(){

    // Patterns
    const PAT_NAME = "^[a-zA-Z ]{2,20}$";
    const PAT_EMAIL = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.][a-zA-Z]{2,4}$";

    this.addUserForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(PAT_NAME)]],
      email: ['', [Validators.required, Validators.pattern(PAT_EMAIL)]],
      address: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
    
  }
   // Submit User Form
  submitUser() {

    // Set flag to true
    this.isFormSubmitted = true;

    // Return if form is invalid
    if (this.addUserForm.invalid) {
      return;
    }
    console.log('Submit', this.addUserForm.value);
  }
}
