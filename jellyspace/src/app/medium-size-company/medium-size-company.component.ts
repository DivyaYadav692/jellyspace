import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-medium-size-company',
  templateUrl: './medium-size-company.component.html',
  styleUrls: ['./medium-size-company.component.css']
})
export class MediumSizeCompanyComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  mediumCompanySizeList: any = [];
  mediumCompanyYearList: any = [];
  companySizeFlag: boolean = false;
  yearsFlag:boolean = false;
  companyName: any;
  yearList:any;
  empList:any;
  checkedValues:boolean=false;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      console.log('params', params['q']);
      if(!this.companyName) {
        this.companyName = params['q']
      }
   });
    this.mediumCompanySizeList = [
      {label:'< 5 Employees', value:'0'},
      {label:'< 10 Employees', value:'1'},
      {label:'> 10 Employees', value:'2'},
    ];
    this.mediumCompanyYearList = [
      {label:'< 5 Years', value:'0'},
      {label:'< 10 Years', value:'0'},
      {label:'> 10 Years', value:'0'},
    ];
    var yl=localStorage.getItem("company-years");
    if(yl){
      var list=JSON.parse(yl);
      this.yearList=list.yearlist;
      this.empList=list.emplist;
      this.checkedValues=true;
      this.yearsFlag = true;
    }
  }

  goNext() {
    if(this.companySizeFlag === true) {
      if(this.checkedValues === true){
        localStorage.setItem("company-years",JSON.stringify({yearlist:this.yearList,emplist:this.empList}));
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

  onChnageEmployee(item:any,eve:any) {
    this.yearsFlag = eve.target.checked;
    this.checkedValues = eve.target.checked;
    this.empList = item;
  }
  onChnageCompany(item:any,eve:any) {
    this.companySizeFlag = eve.target.checked;
    this.checkedValues = eve.target.checked;
    this.yearList = item;
  }

  goToPrevious() {
    let params = { q : this.companyName }
    this.router.navigate(['service-category'],{  queryParams: params,skipLocationChange: false })
  }

}
