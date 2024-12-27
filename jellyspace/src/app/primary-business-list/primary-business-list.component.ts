import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-primary-business-list',
  templateUrl: './primary-business-list.component.html',
  styleUrls: ['./primary-business-list.component.css']
})
export class PrimaryBusinessListComponent implements OnInit {
  isdisable:boolean=true;
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }
  companyName: any;
  businessList: any =[];
  prodductList: any = [];
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      console.log('params', params['q']);
      // console.log(localStorage.getItem('p-b'));
      if(!this.companyName) {
        this.companyName = params['q']
        // console.log(this.companyName)
      }
   });
    this.businessList =[
      {label:'Space', value:'0' ,checked:false},
      {label:'New Space', value:'1',checked:false},
      {label:'Satellites', value:'2',checked:false},
      {label:'Test & Measurment', value:'3',checked:false},
      {label:'Aerospace', value:'4',checked:false},
      {label:'UAV | Drones', value:'5',checked:false},
      // {label:'Product Category', value:'6'},
      // {label:'Servcie Category', value:'7'},
    ];
    this.prodductList = [
      {label:'Launchers', value:'0'},
      {label:'Satelites & Probes', value:'1'},
      {label:'Transporation & Re-entry Systems', value:'2'},
      {label:'Ground Segment', value:'3'},
      {label:'Non Space Procurement/Services', value:'4'},
    ];
    if(localStorage.getItem('p-b')){
      var a=JSON.parse(localStorage.getItem('p-b')!);
      this.businessList=a;
      this.isdisable =false;
    }
  }
  goToServiceCategory() {
    // const params = {
    //   comapany:this.companyName
    // }
    // params['comapany'] = this.companyName
    localStorage.setItem("p-b",JSON.stringify(this.businessList));
    let params = { q : this.companyName }
    this.router.navigate(['product-category'],{  queryParams: params,skipLocationChange: false })
    // this.router.navigate(['service-category'],{  queryParams: params,skipLocationChange: false })
    // this.router.navigate(['service-category'],{queryParams:{companyName:this.companyName}})
  }

  selectchange(item:any){
    this.isdisable=false;
    this.businessList.map((i:any)=>{
      if(i.value===item.value){
        item.checked=!item.checked;
      }
      return item;
    })
  }


  goToPrevious() {
    let params = { q : this.companyName }
    this.router.navigate(['company-list'],{  queryParams: params,skipLocationChange: false })
  }


  goToServices(item:string) {
    if(item === 'Product Category') {
      this.router.navigate(['product-category'])
    } else if(item === 'Servcie Category') {
      this.router.navigate(['service-category'])
    } else {
      alert("Not Availabele")
    }
  }

}
