import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css'],
})
export class EmailVerificationComponent implements OnInit {
  timeLeft: number = 60;
  interval: any;
  public fieldTextType: boolean = false;
  public otpText: any;

  // Define the email property
  email: string | null = null;

  constructor(private service: AppService, private router: Router) {
    this.startTimer();
  }

  ngOnInit(): void {
    const firstName = localStorage.getItem('otherFName');
    const lastName = localStorage.getItem('otherLName');
    const email = localStorage.getItem('registerEmail');
    const imageUrl = localStorage.getItem('otherImage');

    // Initialize the email property with the value from localStorage
    this.email = email;

    console.log('Retrieved from localStorage:', {
      firstName,
      lastName,
      email,
      imageUrl,
    });
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      }
    }, 1000);
  }

  verifyOTP() {
    const params = {
      OTP: this.otpText,
      email: this.email, // Use the defined email property
    };
    this.service.verifyOTP(params).subscribe((data: any) => {
      if (data.status === true) {
        let createParams: any = {};
        if (localStorage.getItem('accountType') === 'freelancer') {
          const freelancerFirstName = localStorage.getItem(
            'freelancerFirstName'
          );
          const freelancerLastName = localStorage.getItem('freelancerLastName');
          const freelancerEmail = localStorage.getItem('freelancerEmail');
          const freelancerPassword = localStorage.getItem('freelancerPassword');
          const freelancerSkills = JSON.parse(
            localStorage.getItem('freelancerSkills')!
          );
          const freelancerImage = localStorage.getItem('freelancerImage');
          createParams = {
            firstName: freelancerFirstName,
            lastName: freelancerLastName,
            email: freelancerEmail,
            password: freelancerPassword,
            skills: freelancerSkills,
            image: freelancerImage,
            accountType: 'freelancer',
          };
        } else {
          const otherFName = localStorage.getItem('otherFName');
          const otherLName = localStorage.getItem('otherLName');
          const othereMail = localStorage.getItem('othereMail');
          const otherPWord = localStorage.getItem('otherPWord');
          const entityName = localStorage.getItem('entityName');
          const dateOfInCorporation = localStorage.getItem(
            'dateOfInCorporation'
          );
          const otherTitle = localStorage.getItem('otherTitle');
          const otherMobileNo = localStorage.getItem('otherMobileNo');
          const otherImage = localStorage.getItem('otherImage');
          const addStreet = localStorage.getItem('street');
          const addhNumber = localStorage.getItem('housenumber');
          const addCity = localStorage.getItem('city');
          const addPosatalCode = localStorage.getItem('postalcode');
          const addCountry = localStorage.getItem('country');
          createParams = {
            firstName: otherFName,
            lastName: otherLName,
            email: othereMail,
            password: otherPWord,
            entityName: entityName,
            dateOfInCorporation: dateOfInCorporation,
            title: otherTitle,
            mobileNo: otherMobileNo,
            image: otherImage,
            street: addStreet,
            h_number: addhNumber,
            city: addCity,
            postalCode: addPosatalCode,
            country: addCountry,
            accountType: localStorage.getItem('accountType'),
          };
        }

        this.service.createEmployee(createParams).subscribe((data: any) => {
          if (data.status === true) {
            localStorage.setItem('entityName', '');
            localStorage.setItem('dateOfInCorporation', '');
            localStorage.setItem('otherFName', '');
            localStorage.setItem('otherLName', '');
            localStorage.setItem('othereMail', '');
            localStorage.setItem('otherPWord', '');
            localStorage.setItem('otherTitle', '');
            localStorage.setItem('otherMobileNo', '');
            localStorage.setItem('otherImage', '');
            localStorage.setItem('registerEmail', '');
            localStorage.setItem('street', '');
            localStorage.setItem('housenumber', '');
            localStorage.setItem('city', '');
            localStorage.setItem('postalcode', '');
            localStorage.setItem('country', '');
            this.router.navigate(['signin']);
          } else {
            alert(data.message);
          }
        });
        console.log(createParams);
      } else {
        alert(data.message);
      }
    });
  }

  reSendOTP() {
    const params = {
      email: this.email, // Use the defined email property
      name: localStorage.getItem('nameOTP'),
    };

    this.service.sendOTP(params).subscribe((data: any) => {
      if (data.status === true) {
        this.otpText = '';
        this.timeLeft = 60;
        this.router.navigate(['email-verification']);
      } else {
        alert(data.message);
      }
    });
  }

  backNavigation() {
    if (localStorage.getItem('accountType') === 'freelancer') {
      this.router.navigate(['user-details']);
    } else {
      this.router.navigate(['account-handler']);
    }
  }
}
