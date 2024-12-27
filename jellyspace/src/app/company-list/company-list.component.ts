import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css'],
})
export class CompanyListComponent implements OnInit {
  constructor(private router: Router) {}

  public OrgList: any = [];
  public inputBox: boolean = false;
  companyName: any;
  checked: boolean = false;
  checkedValue: boolean = false;
  othersChecked: any;
  radiosave: any;

  ngOnInit(): void {
    this.OrgList = [
      { label: 'Start Up', value: '0' },
      { label: 'SME (Small Medium Enterprise)', value: '0' },
      { label: 'Large Corporation', value: '0' },
      { label: 'Research Center', value: '0' },
      { label: 'Non-Profit', value: '0' },
      { label: 'Non-Government Organization', value: '0' },
      { label: 'Government Organization', value: '0' },
    ];
    var b = localStorage.getItem('companylist');
    if (b) {
      this.companyName = b;
      this.checkedValue = true;
    }
  }

  onChengeOrg(item: any, eve: any) {
    this.companyName = item;
    this.checkedValue = eve.target.checked;

    console.log('Selected Organization:', this.companyName);
    console.log('Is Checked:', this.checkedValue);

    this.inputBox = false;
  }

  NextPage() {
    if (this.checkedValue === true) {
      localStorage.setItem('companylist', this.companyName);

      console.log('Company Name:', this.companyName);
      console.log('Checked Value:', this.checkedValue);

      if (
        this.companyName === 'Start Up' ||
        this.companyName === 'SME (Small Medium Enterprise)' ||
        this.companyName === 'Large Corporation'
      ) {
        this.router.navigate(['primary-business'], {
          queryParams: { q: this.companyName },
        });
      } else {
        alert('Upcoming Feature-Comingsoon');
      }
    } else {
      alert('Please Select At Least One Item');
    }
  }

  onChnageOthers(val: any, eve: any) {
    this.checkedValue = eve.target.checked;
    this.companyName = val;

    console.log('Selected Value (Others):', this.companyName);
    console.log('Is Checked:', this.checkedValue);

    if (val === 'other') {
      this.inputBox = true;
    } else {
      this.inputBox = false;
    }
  }
}
