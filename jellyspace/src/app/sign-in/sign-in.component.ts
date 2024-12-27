import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  public fieldTextType: boolean = false;
  "emailName": string;
  "password": string;

  constructor(private router: Router, private service: AppService) {}

  ngOnInit(): void {}

  login() {
    const params = {
      email: this.emailName,
      password: this.password,
    };

    this.service.login(params).subscribe((data: any) => {
      console.log(data);
      if (data.status === true) {
        localStorage.setItem('userEmail', data.data.email);
        localStorage.setItem('userId', data.data.id);
        localStorage.setItem('loginType', data.data.accountType);
        let params = {
          accountType: data.data.accountType,
          fname: data.data.firstName,
          lname: data.data.lastName,
          email: data.data.email,
          skills: data.data.skills,
        };
        this.router.navigate(['afterLogin'], {
          queryParams: params,
          skipLocationChange: false,
        });
      } else {
        alert(data.message);
      }
    });
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  register() {
    localStorage.clear();
    this.router.navigate(['new-user-register']);
  }

  forgotPassword() {
    // Implement forgot password functionality
    console.log('Forgot Password clicked');
  }

  signInWithGoogle() {
    // Implement Google sign-in functionality
    console.log('Google Sign-In clicked');
  }

  signInWithFacebook() {
    // Implement Facebook sign-in functionality
    console.log('Facebook Sign-In clicked');
  }

  signInWithTwitter() {
    // Implement Twitter sign-in functionality
    console.log('Twitter Sign-In clicked');
  }
}
