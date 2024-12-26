import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-user-register',
  templateUrl: './new-user-register.component.html',
  styleUrls: ['./new-user-register.component.css'],
})
export class NewUserRegisterComponent implements OnInit {
  radiocheck = false;
  isSpace = false;
  isAvionics = false;
  isOthers = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const userType = localStorage.getItem('newuser');
    if (userType === 'space') {
      this.isSpace = true;
      this.radiocheck = true;
    } else if (userType === 'avionics') {
      this.isAvionics = true;
      this.radiocheck = true;
    } else if (userType === 'others') {
      this.isOthers = true;
      this.radiocheck = true;
    }
  }

  onChangeValue(val: string, event: Event): void {
    this.radiocheck = (event.target as HTMLInputElement).checked;
    localStorage.setItem('accountType', val);
    this.updateUserType(val);
  }

  private updateUserType(type: string): void {
    this.isSpace = type === 'space';
    this.isAvionics = type === 'avionics';
    this.isOthers = type === 'others';
  }

  startFreeTrial(): void {
    localStorage.setItem('startFreeTrial', 'true');
    this.router.navigate(['account-handler']);
  }

  CompleteRegistration(): void {
    this.router.navigate(['company-list']);
  }
}
