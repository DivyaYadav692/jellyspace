import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss'],
})
export class ViewProfileComponent implements OnInit {
  userProfile = {
    name: 'John Doe',
    position: 'Software Engineer',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
  };

  companyInfo = {
    name: 'Tech Solutions Inc.', // Company name if needed elsewhere
    logo: 'assets/images/company-logo.png',
    location: '123 Tech Lane, Silicon Valley, CA',
    contact: 'contact@techsolutions.com',
    size: '500 employees', // Company size
    established: '2005', // Year established
    revenue: '$50M',
    marketSegments: ['Commercial Aviation', 'Military', 'Space Exploration'],
    partnerships: ['NASA', 'Boeing'],
    certifications: ['ISO 9001', 'AS9100'],
    technologyFocus: ['Advanced Aerospace Technologies'],
    position: 'Cofounder (CEO)', // Role if needed elsewhere
  };

  contactInfo = {
    address: '123 Tech Lane, Silicon Valley, CA',
    phone: '123-456-7890',
    email: 'contact@techsolutions.com',
    website: 'https://www.techsolutions.com',
  };

  MarketCustomerData = {
    keyMarkets: ['North America', 'Europe', 'Asia-Pacific'],
    customerSegments: ['OEMs', 'Governmental Agencies', 'Defense Contractors'],
    competitivePosition:
      'Leading provider in aerospace technology with a strong foothold in defense and commercial aviation sectors.',
    salesChannels: [
      'Direct Sales',
      'Online Distribution',
      'Strategic Partnerships',
    ],
  };

  productServicesInfo = {
    productCategories: ['Aerospace Components', 'Defense Systems'],
    productSpecifications: 'High-performance materials, cutting-edge design',
    serviceOfferings: ['Maintenance', 'Repair', 'Overhaul'],
    applications: ['End-user Applications for product or services'],
    deliveryAndFulfillment:
      'Worldwide shipping with expedited options available for urgent needs.',
    productionCapabilities: 'Manufacturing capabilities and capacity',
    rAndDFocus:
      'Areas of research and development interest or current projects',
    supplyChainFocus: 'Information about suppliers and logistics partners',
  };

  strategicInformation = {
    missionVision: {
      mission:
        'To innovate and provide advanced aerospace solutions that ensure safety, reliability, and excellence in every mission.',
      vision:
        'To be the world’s leading provider of aerospace technologies, revolutionizing the industry through innovation and customer satisfaction.',
    },
    swotAnalysis: {
      strengths: [
        'Industry-leading technology',
        'Strong customer relationships',
        'Highly skilled workforce',
      ],
      weaknesses: [
        'High dependency on defense contracts',
        'Limited geographic presence',
      ],
      opportunities: [
        'Expansion into emerging markets',
        'Increased demand for commercial space exploration',
      ],
      threats: [
        'Economic downturns',
        'Intense competition from other aerospace companies',
      ],
    },
    kpis: [
      'Revenue Growth',
      'Market Share',
      'Customer Satisfaction Score',
      'Operational Efficiency',
    ],
    growthStrategy:
      'Focus on expanding into new markets, investing in R&D for cutting-edge technology, and forming strategic partnerships to enhance market presence.',
  };

  constructor(private router: Router, private service: AppService) {}

  verificationList: any = [];
  skillsList: any = [];
  email: string = '';
  fname: string = '';
  lname: string = '';
  image: string | undefined;
  dummyImage: string = 'https://jellyspace-public.s3.amazonaws.com/avatar.png';
  loginEmail: string | null = '';
  editData: boolean = false;
  normalData: boolean = true;

  descriptionData =
    'I have good knowledge for HTML, CSS, AJAX, JavaScript, Bootstrap, jQuery';

  ngOnInit(): void {
    this.loginEmail = localStorage.getItem('userEmail');
    this.loginUserDetails();
    this.verificationList = [
      { title: 'Preferred Freelancer', icon: 'fa fa-user' },
      { title: 'Identity Verified', icon: 'fa fa-user-times' },
      { title: 'Payment Verified', icon: 'fa fa-shield' },
      { title: 'Phone Verified', icon: 'fa fa-phone' },
      { title: 'Email Verified', icon: 'fa fa-envelope' },
      { title: 'Facebook Connected', icon: 'fa fa-facebook' },
    ];
  }

  loginUserDetails() {
    const params = {
      email: this.loginEmail || '',
    };
    this.service.loginUserDetails(params).subscribe((data: any) => {
      console.log(data);
      if (data.status === true) {
        localStorage.setItem('userEmail', data.data.email);
        localStorage.setItem('userId', data.data.id);
        this.email = data.data.email;
        this.fname = data.data.firstName;
        this.lname = data.data.lastName;
        this.skillsList = data.data.skills;
        this.image = data.data.image;
      } else {
        alert(data.message);
      }
      console.log(data);
    });
  }

  editProfile() {
    this.editData = !this.editData;
    this.normalData = !this.normalData;
    this.router.navigate(['edit-profile']);
  }

  manageSubscription() {
    // Add your subscription management logic here
    alert('Manage Subscription Clicked');
  }

  close() {
    this.router.navigate(['dashboard']);
  }
}
