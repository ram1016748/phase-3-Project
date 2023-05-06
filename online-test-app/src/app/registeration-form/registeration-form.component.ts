import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-registeration-form',
  templateUrl: './registeration-form.component.html',
  styleUrls: ['./registeration-form.component.css'],
})
export class RegisterationFormComponent {
  constructor(private ds: DataService, private router: Router) {}
  emailPattern = '^[a-zA-Z0-9._]+@[a-zA-z0-9.-]+\\.[a-z]{2,4}$';

  RegistrationForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(this.emailPattern),
      this.emailDomainValidator,
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  submit() {
    this.ds.createNewUser(this.RegistrationForm.value).subscribe((data) => {
      alert(data);
      this.router.navigate(['']);
    });
    console.table(this.RegistrationForm.value);
  }

  get f() {
    return this.RegistrationForm.controls;
  }

  emailDomainValidator(control: FormControl) {
    let email = control.value;

    if (email && email.indexOf('@') != -1) {
      let [first, domain] = email.split('@');
      if (domain !== 'gmail.com') {
        return {
          emailDomain: {
            parseDomain: domain,
          },
        };
      }
    }
    return null;
  }

  Login() {
    this.router.navigate(['']);
  }
}
