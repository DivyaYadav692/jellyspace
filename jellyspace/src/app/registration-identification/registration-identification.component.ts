import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-registration-identification',
  templateUrl: './registration-identification.component.html',
  styleUrls: ['./registration-identification.component.css']
})
export class RegistrationIdentificationComponent implements OnInit {
  public entityName:any;
  companyName: any;
  public dateOfInCorporation:any;
  public countryofregistration:any;
  constructor(
    private router: Router,
    private route: ActivatedRoute

  ) {
    this.route.queryParams.subscribe(params => {
      console.log('params ', params['q']);
      if(!this.companyName) {
        this.companyName = params['q']
      }
   });
  }

  ngOnInit(): void {
    this.entityName = localStorage.getItem('entityName');
    this.dateOfInCorporation = localStorage.getItem('dateOfInCorporation');
  }

  nextClick() {
    let params = { q : this.companyName }
    localStorage.setItem('entityName', this.entityName);
    localStorage.setItem('dateOfInCorporation', this.dateOfInCorporation);
    localStorage.setItem('countryofregistration', this.countryofregistration);
    this.router.navigate(['address-details'],{  queryParams: params,skipLocationChange: false });
  }
  prevoiusUrl(){
    // routerLink="/company-size"
    let params = { q : this.companyName }
    this.router.navigate(['company-size'],{  queryParams: params,skipLocationChange: false });

  }

}
