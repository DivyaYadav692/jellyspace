import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss'],
})
export class PersonalInfoComponent implements OnInit {
  // Declare properties
  firstName: string = '';
  lastName: string = '';
  primaryEmail: string = '';
  secondaryEmail: string = '';
  phone: string = '';
  currentEmployer: string = '';
  title: string = '';
  yearsAtPosition: number | null = null;
  sector: string = '';
  businessType: string = '';

  constructor() {}

  ngOnInit(): void {}

  onSubmit(): void {
    // Handle form submission logic here
    console.log('First Name:', this.firstName);
    console.log('Last Name:', this.lastName);
    console.log('Primary Email:', this.primaryEmail);
    console.log('Secondary Email:', this.secondaryEmail);
    console.log('Phone:', this.phone);
    console.log('Current Employer:', this.currentEmployer);
    console.log('Title:', this.title);
    console.log('Years at Position:', this.yearsAtPosition);
    console.log('Sector:', this.sector);
    console.log('Business Type:', this.businessType);
  }
}
