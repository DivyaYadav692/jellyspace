import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-large-size-company',
  templateUrl: './large-size-company.component.html',
  styleUrls: ['./large-size-company.component.css']
})
export class LargeSizeCompanyComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  largeCompanyYearList: any = [];
  largeCompanySizeList: any = [];
  companySizeFlag: boolean = false;
  yearsFlag:boolean = false;
  companyName: any;
  url:any;
  yearsList:any;
  empList:any;
  checkedValues:boolean=false;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      console.log('params', params['q']);
      if(!this.companyName) {
        this.companyName = params['q']
      }
   });
    this.largeCompanySizeList = [
      {label:'< 50 Employees', value:'0'},
      {label:'< 100 Employees', value:'1'},
      {label:'> 200 Employees', value:'2'},
    ];
    this.largeCompanyYearList = [
      {label:'< 10 Years', value:'0'},
      {label:'< 20 Years', value:'0'},
      {label:'> 20 Years', value:'0'},
    ];
    var yl = localStorage.getItem("company-years");
    if(yl){
      var list = JSON.parse(yl);
      this.yearsList = list.yearlist;
      this.empList = list.emplist
      this.checkedValues = true;
      this.yearsFlag = true;
    }
  }

  goNext() {
    if(this.companySizeFlag === true) {
      if(this.checkedValues === true){
      localStorage.setItem("company-years", JSON.stringify({yearslist:this.yearsList, emplist:this.empList}));
      if(this.yearsFlag === true) {
        this.router.navigate(['register-identification'])
      } else {
        alert("Please Select Size Of Your Company...")
      }
    } else {
      alert("Please Select How Old Your Company...")
    }
  }
  }

  onChnageEmployee(item:any, eve:any) {
   this.checkedValues = eve.target.checked;
   this.empList = item;
    this.yearsFlag = eve.target.checked
  }
  onChnageCompany(item:any,eve:any) {
    this.companySizeFlag = eve.target.checked;
    this.checkedValues =eve.target.checked;
    this.yearsList= item;
  }

  goToPrevious() {
    let params = { q : this.companyName }
    this.router.navigate(['service-category'],{  queryParams: params,skipLocationChange: false })
  }

}
