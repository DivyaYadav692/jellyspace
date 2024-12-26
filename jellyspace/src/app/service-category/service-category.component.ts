import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-service-category',
  templateUrl: './service-category.component.html',
  styleUrls: ['./service-category.component.css']
})
export class ServiceCategoryComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  serviceList: any= [];
  companyName: any;
  isdisable:boolean=false;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      console.log('params', params['q']);
      if(!this.companyName) {
        this.companyName = params['q']
      }
   });
    // const arr = [
    //   {label:'Onboard Data Systems',value:'0', isChecked : false},
    //   {label:'Space System Software',value:'1', isChecked : false},
    //   {label:'Spacecraft Electrical Power',value:'2', isChecked : false},
    //   {label:'Spacecraft Environments and Effects',value:'3'},
    //   {label:'Space System Control',value:'4'},
    //   {label:'RF Systems, Payloads and Technologies',value:'0', isChecked : false},
    //   {label:'Electromagnetic Technologies and Techniques',value:'0', isChecked : false},
    //   {label:'System Design & Verification',value:'0', isChecked : false},
    //   {label:'Mission Operation and Ground Data Systems',value:'0', isChecked : false},
    //   {label:'Flight Dynamics and GNSS',value:'0', isChecked : false},
    //   {label:'Space Debris',value:'0', isChecked : false},
    //   {label:'Ground Station Systems and Networks',value:'0', isChecked : false},
    //   {label:'Automation, Telepresence & Robotics',value:'0', isChecked : false},
    //   {label:'Life & Physical Sciences',value:'0', isChecked : false},
    //   {label:'Mechanisms',value:'0', isChecked : false},
    //   {label:'Optics',value:'0', isChecked : false},
    //   {label:'Optoelectronics',value:'0', isChecked : false},
    //   {label:'Aerothermodynamics',value:'0', isChecked : false},
    //   {label:'Propulsion',value:'0', isChecked : false},
    //   {label:'Structures',value:'0', isChecked : false},
    //   {label:'Thermal',value:'0', isChecked : false},
    //   {label:'Environmental Control & Life Support(ECLS) and In Situ Resource Utilisation(ISRU)',value:'0', isChecked : false},
    //   {label:'EEE Components and Quality',value:'0', isChecked : false},
    //   {label:'Material and Processes',value:'0', isChecked : false},
    //   {label:'Quality, Dependability and Safety',value:'0', isChecked : false},
    //   {label:'Automation, Telepresence & Robotics',value:'0', isChecked : false},
    //   {label:'Electromagnetic Technologies & Techniques',value:'0', isChecked : false},
    //   {label:'System Design & Verification',value:'0', isChecked : false},
    //   {label:'Software Engineering',value:'0', isChecked : false},
    //   {label:'AI Technologies(ex: Machine Learning & Deep Learning)',value:'0', isChecked : false},
    //   {label:'3D Printing',value:'0', isChecked : false},
    //   {label:'PCB Design',value:'0', isChecked : false},
    //   {label:'Life & Physical Sciences',value:'0', isChecked : false},
    //   // {label:'Onboard Data Systems',value:'0'},
    //   // {label:'Space System Software',value:'1'},
    //   // {label:'Spacecraft Electrical Power',value:'2'},
    //   // {label:'Spacecraft Environments and Effects',value:'3'},
    //   // {label:'Space System Control',value:'4'},
    //   // {label:'RF Systems, Payloads and Technologies',value:'0'},
    //   // {label:'Electromagnetic Technologies and Techniques',value:'0'},
    //   // {label:'System Design & Verification',value:'0'},
    //   // {label:'Mission Operation and Ground Data Systems',value:'0'},
    //   // {label:'Flight Dynamics and GNSS',value:'0'},
    //   // {label:'Space Debris',value:'0'},
    //   // {label:'Ground Station Systems and Networks',value:'0'},
    //   // {label:'Automation, Telepresence & Robotics',value:'0'},
    //   // {label:'Life & Physical Sciences',value:'0'},
    //   // {label:'Mechanisms',value:'0'},
    //   // {label:'Optics',value:'0'},
    //   // {label:'Optoelectronics',value:'0'},
    //   // {label:'Aerothermodynamics',value:'0'},
    //   // {label:'Propulsion',value:'0'},
    //   // {label:'Structures',value:'0'},
    //   // {label:'Thermal',value:'0'},
    //   // {label:'Environmental Control & Life Support(ECLS) and In Situ Resource Utilisation(ISRU)',value:'0'},
    //   // {label:'EEE Components and Quality',value:'0'},
    //   // {label:'Material and Processes',value:'0'},
    //   // {label:'Quality, Dependability and Safety',value:'0'},
    //   // {label:'Automation, Telepresence & Robotics',value:'0'},
    //   // {label:'Electromagnetic Technologies & Techniques',value:'0'},
    //   // {label:'System Design & Verification',value:'0'},
    //   // {label:'Software Engineering',value:'0'},
    //   // {label:'AI Technologies(ex: Machine Learning & Deep Learning)',value:'0'},
    //   // {label:'3D Printing',value:'0'},
    //   // {label:'PCB Design',value:'0'},
    //   // {label:'Life & Physical Sciences',value:'0'},
    // ]

    // const savedOptions = JSON.parse(localStorage.getItem('serviceCategory') || "[]");
    // if(savedOptions) {
    //     this.serviceList = savedOptions;
    // } else {
    //   this.serviceList = arr;
    // }

    this.serviceList = [
      {label:'Onboard Data Systems',value:'0', isChecked : false},
      {label:'Space System Software',value:'1', isChecked : false},
      {label:'Spacecraft Electrical Power',value:'2', isChecked : false},
      {label:'Spacecraft Environments and Effects',value:'3'},
      {label:'Space System Control',value:'4'},
      {label:'RF Systems, Payloads and Technologies',value:'0', isChecked : false},
      {label:'Electromagnetic Technologies and Techniques',value:'0', isChecked : false},
      {label:'System Design & Verification',value:'0', isChecked : false},
      {label:'Mission Operation and Ground Data Systems',value:'0', isChecked : false},
      {label:'Flight Dynamics and GNSS',value:'0', isChecked : false},
      {label:'Space Debris',value:'0', isChecked : false},
      {label:'Ground Station Systems and Networks',value:'0', isChecked : false},
      {label:'Automation, Telepresence & Robotics',value:'0', isChecked : false},
      {label:'Life & Physical Sciences',value:'0', isChecked : false},
      {label:'Mechanisms',value:'0', isChecked : false},
      {label:'Optics',value:'0', isChecked : false},
      {label:'Optoelectronics',value:'0', isChecked : false},
      {label:'Aerothermodynamics',value:'0', isChecked : false},
      {label:'Propulsion',value:'0', isChecked : false},
      {label:'Structures',value:'0', isChecked : false},
      {label:'Thermal',value:'0', isChecked : false},
      {label:'Environmental Control & Life Support(ECLS) and In Situ Resource Utilisation(ISRU)',value:'0', isChecked : false},
      {label:'EEE Components and Quality',value:'0', isChecked : false},
      {label:'Material and Processes',value:'0', isChecked : false},
      {label:'Quality, Dependability and Safety',value:'0', isChecked : false},
      {label:'Automation, Telepresence & Robotics',value:'0', isChecked : false},
      {label:'Electromagnetic Technologies & Techniques',value:'0', isChecked : false},
      {label:'System Design & Verification',value:'0', isChecked : false},
      {label:'Software Engineering',value:'0', isChecked : false},
      {label:'AI Technologies(ex: Machine Learning & Deep Learning)',value:'0', isChecked : false},
      {label:'3D Printing',value:'0', isChecked : false},
      {label:'PCB Design',value:'0', isChecked : false},
      {label:'Life & Physical Sciences',value:'0', isChecked : false},
      // {label:'Onboard Data Systems',value:'0'},
      // {label:'Space System Software',value:'1'},
      // {label:'Spacecraft Electrical Power',value:'2'},
      // {label:'Spacecraft Environments and Effects',value:'3'},
      // {label:'Space System Control',value:'4'},
      // {label:'RF Systems, Payloads and Technologies',value:'0'},
      // {label:'Electromagnetic Technologies and Techniques',value:'0'},
      // {label:'System Design & Verification',value:'0'},
      // {label:'Mission Operation and Ground Data Systems',value:'0'},
      // {label:'Flight Dynamics and GNSS',value:'0'},
      // {label:'Space Debris',value:'0'},
      // {label:'Ground Station Systems and Networks',value:'0'},
      // {label:'Automation, Telepresence & Robotics',value:'0'},
      // {label:'Life & Physical Sciences',value:'0'},
      // {label:'Mechanisms',value:'0'},
      // {label:'Optics',value:'0'},
      // {label:'Optoelectronics',value:'0'},
      // {label:'Aerothermodynamics',value:'0'},
      // {label:'Propulsion',value:'0'},
      // {label:'Structures',value:'0'},
      // {label:'Thermal',value:'0'},
      // {label:'Environmental Control & Life Support(ECLS) and In Situ Resource Utilisation(ISRU)',value:'0'},
      // {label:'EEE Components and Quality',value:'0'},
      // {label:'Material and Processes',value:'0'},
      // {label:'Quality, Dependability and Safety',value:'0'},
      // {label:'Automation, Telepresence & Robotics',value:'0'},
      // {label:'Electromagnetic Technologies & Techniques',value:'0'},
      // {label:'System Design & Verification',value:'0'},
      // {label:'Software Engineering',value:'0'},
      // {label:'AI Technologies(ex: Machine Learning & Deep Learning)',value:'0'},
      // {label:'3D Printing',value:'0'},
      // {label:'PCB Design',value:'0'},
      // {label:'Life & Physical Sciences',value:'0'},
    ]
    if(localStorage.getItem('serviceCategory')){
      var s=JSON.parse(localStorage.getItem('serviceCategory')!);
      this.serviceList=s;
      this.isdisable =true;
    }

  }

  goToCompanySize() {
    localStorage.setItem("serviceCategory",JSON.stringify(this.serviceList));
    console.log(JSON.parse(localStorage.getItem('serviceCategory')!))
    let params = { q : this.companyName }
    if(this.companyName === 'Start Up'){
      this.router.navigate(['company-size'],{  queryParams: params,skipLocationChange: false })
    }
    else if(this.companyName === 'SME (Small Medium Enterprise)'){
      this.router.navigate(['medium-size'], {  queryParams: params,skipLocationChange: false })
    } else if(this.companyName && this.companyName === 'Large Corporation') {
      this.router.navigate(['large-size'], {  queryParams: params,skipLocationChange: false })
    }


  }

  goToPrevious() {
    let params = { q : this.companyName }
    this.router.navigate(['product-category'],{  queryParams: params,skipLocationChange: false })
  }

  selectValues(i: any) {
    this.serviceList[i].isChecked = !this.serviceList[i].isChecked;
    this.isdisable=false;
    this.serviceList.map((a:any)=>{
      if(a.value===i.value){
        i.isChecked=!i.isChecked;
      }
      return i;
    })
  }
}
