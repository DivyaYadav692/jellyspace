import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-company-size-list',
  templateUrl: './company-size-list.component.html',
  styleUrls: ['./company-size-list.component.css']
})
export class CompanySizeListComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }
  companySizeList: any = [];
  companyYearList: any = [];
  companySizeFlag: boolean = false;
  yearsFlag:boolean = false;
  companyName: any;
  url:any;
  yearList:any;
  empList:any;
  checkedValues:boolean=false;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      console.log('params ', params['q']);
      if(!this.companyName) {
        this.companyName = params['q']
      }
   });
    this.companySizeList = [
      {label:'< 5 Employees', value:'0'},
      {label:'< 10 Employees', value:'1'},
      {label:'> 10 Employees', value:'2'},
    ];
    this.companyYearList = [
      {label:'< 3 Years', value:'0'},
      {label:'< 5 Years', value:'0'},
      // {label:'< 10 Years', value:'1'},
      // {label:'> 10 Years', value:'2'},
    ];
    var yl=localStorage.getItem("company-years");
    if(yl){
      var list=JSON.parse(yl);
      this.yearList=list.yearlist;
      this.empList=list.emplist;
      this.checkedValues=true;
      this.yearsFlag = true;
      this.companySizeFlag=true;
    }
  }

  onChnageCompany(item:any, eve:any) {
    this.companySizeFlag = eve.target.checked;
    this.checkedValues = eve.target.checked;
    this.yearList = item;
  }
  onChnageEmployee(item:any, event:any) {
    this.yearsFlag = event.target.checked;
    this.checkedValues = event.target.checked;
    this.empList = item;
  }

  goNext() {
    let params = { q : this.companyName }
    if(this.companySizeFlag === true) {
      if(this.checkedValues === true){
      localStorage.setItem("company-years",JSON.stringify({yearlist:this.yearList,emplist:this.empList}));
      if(this.yearsFlag === true) {
        this.router.navigate(['register-identification'],{  queryParams: params,skipLocationChange: false })
      } else {
        alert("Please Select Size Of Your Company...")
      }
    } else {
      alert("Please Select How Old Your Company...")
    }
    }
  }

  goToPrevious() {
    let params = { q : this.companyName }
    this.router.navigate(['service-category'],{  queryParams: params,skipLocationChange: true })
  }

}
