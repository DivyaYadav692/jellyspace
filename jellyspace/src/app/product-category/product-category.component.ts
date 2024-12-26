import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }
  prodductList: any = [];
  companyName:any;
  url:any;
  checkedValues:boolean=false;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      console.log('params', params['q']);
      if(!this.url) {
        this.url = params['q']
      }

   });
    this.prodductList = [
      {label:'Launchers', value:'0'},
      {label:'Satelites & Probes', value:'1'},
      {label:'Transporation & Re-entry Systems', value:'2'},
      {label:'Ground Segment', value:'3'},
      {label:'Non Space Procurement/Services', value:'4'},
    ]
    var b=localStorage.getItem("categoryList");
    if(b){
      this.companyName=b;
      this.checkedValues=true;
    }
  }

  goToPrevious() {
    let params = { q : this.url }
    this.router.navigate(['primary-business'],{  queryParams: params,skipLocationChange: false })
  }

  goToServiceCategory() {
    // let params = { q : this.companyName }
    if(this.checkedValues === true) {
      localStorage.setItem("categoryList",this.companyName);
      if(this.companyName  === 'Launchers' || this.companyName  === 'Satelites & Probes' || this.companyName  === 'Transporation & Re-entry Systems' || this.companyName  === 'Ground Segment' || this.companyName  === 'Non Space Procurement/Services') {
        this.router.navigate(['service-category'],{ queryParams: {q: this.url} })
      }
    } else {
      alert("Please Select At Least One Item")
    }
    console.log(this.companyName)
    // this.router.navigate(['service-category'],{  queryParams: params,skipLocationChange: false })
  }
  onChengecat(item:any,eve:any) {
    this.companyName = item;
    this.checkedValues = eve.target.checked
    // if(item === 'Start Up' || item === 'SME (Small Medium Enterprise)' || item === 'Large Corporation') {

    // } else {
    //   alert("Upcoming Feature-Comingsoon")
    // }

  }


}
