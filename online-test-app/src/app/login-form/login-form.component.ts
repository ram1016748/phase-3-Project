import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent {
  //isValid:boolean = true;
  isVisible: boolean = true;
  email1: any;
  //user = {email:'',password:''};

  user = { email: '', password: '' };
  isValid = false;

  constructor(private ds: DataService, private router: Router) {}

  onSubmit() {
    console.log(this.user);
    this.ds.checkLogin(this.user).subscribe({
      next: (data) => {
        if (data) {
          console.log(data);
          alert('Login successfull');

          this.router.navigate(['/quiz']);
        }
      },
      error: (err) => {
        if (err) {
          alert('Login unsucessfull');
          this.user = { email: '', password: '' };
        }
      },
    });
  }

  register() {
    this.router.navigate(['registeration-form']);
  }
}
