import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss'],
})
export class CompanyProfileComponent implements OnInit {
  editData: boolean = false;
  isEditing: boolean = false;
  companySections: any[] = [];
  loginEmail: any;
  image: string = '/assets/img/avatar.png';

  constructor(private service: AppService, private router: Router) {}

  ngOnInit(): void {
    this.initializeSections();
    this.loginEmail = localStorage.getItem('userEmail');
    this.companyDetails();
  }

  initializeSections(): void {
    this.companySections = [
      { title: 'Company Data', data: '1,001 - 5,000 employees' },
      { title: 'Headquarters', data: 'Hawthorne, California' },
      { title: 'Founded', data: '2002' },
      {
        title: 'Specialties',
        data: 'Advance Rockets and Spacecraft, high performance heat shield material, and Satellite Development',
      },
      {
        title: 'Products',
        data: 'Falcon 9 and Falcon Heavy Rockets, Dragon Cargo and Crew Spacecraft, Merlin Rocket Engines, Draco and SuperDraco Thrusters, PICA-X',
      },
      { title: 'Website', data: 'https://www.spacex.com' },
      {
        title: 'Industry',
        data: 'Aviation and Aerospace Component Manufacturing',
      },
      {
        title: 'Overview',
        data: "SpaceX designs, manufactures, and launches the world's most advanced rockets and spacecraft. The company was founded in 2002 by Elon Musk to revolutionize space transportation.",
      },
    ];
  }

  setDefault(): void {
    this.image = '/assets/img/avatar.png';
  }

  companyDetails(): void {
    const params = {
      email: this.loginEmail || '',
    };
    this.service.Details(params).subscribe((data: any) => {
      if (data.status === true) {
        localStorage.setItem('userEmail', data.data.email);
        localStorage.setItem('userId', data.data.id);
        this.image = data.data.image || this.image;
      } else {
        alert(data.message);
      }
    });
  }

  editProfile(): void {
    this.isEditing = !this.isEditing;
    if (!this.isEditing) {
      this.saveProfile();
    }
  }

  saveProfile(): void {
    // Implement save logic here
    console.log('Saving profile data:', this.companySections);
    // Here you might call a service to save the changes
    // this.service.saveCompanyDetails(this.companySections).subscribe(response => { ... });
  }

  close(): void {
    this.router.navigate(['dashboard']);
  }
}
