import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-address-details',
  templateUrl: './address-details.component.html',
  styleUrls: ['./address-details.component.css'],
})
export class AddressDetailsComponent implements OnInit {
  companyName: any;
  public street: any;
  public hNumber: any;
  public city: any;
  public postalCode: any;
  public country: any;
  isFreeTrial: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      console.log('params ', params['q']);
      if (!this.companyName) {
        this.companyName = params['q'];
      }
    });

    // Check if the user started a free trial
    this.isFreeTrial = localStorage.getItem('startFreeTrial') === 'true';
  }

  nextRoute() {
    let params = { q: this.companyName };
    localStorage.setItem('street', this.street);
    localStorage.setItem('housenumber', this.hNumber);
    localStorage.setItem('city', this.city);
    localStorage.setItem('postalcode', this.postalCode);
    localStorage.setItem('country', this.country);
    localStorage.removeItem('startFreeTrial'); // Clear the flag
    this.router.navigate(['account-handler'], {
      queryParams: params,
      skipLocationChange: false,
    });
  }

  previousRoute() {
    if (!this.isFreeTrial) {
      let params = { q: this.companyName };
      this.router.navigate(['register-identification'], {
        queryParams: params,
        skipLocationChange: false,
      });
    }
  }
}
