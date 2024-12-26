import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  public isDisabled:boolean=true;

  constructor(private service:AppService, private router: Router) { }

  public primarySkillSet: any = [];
  public eMail:any;
  selectItemsList: any = []

  ngOnInit(): void {
    this.primarySkillSet = [
      {label:'Onboard Data Systems',value:'0'},
      {label:'Space System Software',value:'1'},
      {label:'Spacecraft Electrical Power',value:'2'},
      {label:'Spacecraft Environments and Effects',value:'3'},
      {label:'Space System Control',value:'4'},
      {label:'RF Systems, Payloads and Technologies',value:'0'},
      {label:'Electromagnetic Technologies and Techniques',value:'0'},
      {label:'System Design & Verification',value:'0'},
      {label:'Mission Operation and Ground Data Systems',value:'0'},
      {label:'Flight Dynamics and GNSS',value:'0'},
      {label:'Space Debris',value:'0'},
      {label:'Ground Station Systems and Networks',value:'0'},
      {label:'Automation, Telepresence & Robotics',value:'0'},
      {label:'Life & Physical Sciences',value:'0'},
      {label:'Mechanisms',value:'0'},
      {label:'Optics',value:'0'},
      {label:'Optoelectronics',value:'0'},
      {label:'Aerothermodynamics',value:'0'},
      {label:'Propulsion',value:'0'},
      {label:'Structures',value:'0'},
      {label:'Thermal',value:'0'},
      {label:'Environmental Control & Life Support(ECLS) and In Situ Resource Utilisation(ISRU)',value:'0'},
      {label:'EEE Components and Quality',value:'0'},
      {label:'Material and Processes',value:'0'},
      {label:'Quality, Dependability and Safety',value:'0'},
      {label:'Automation, Telepresence & Robotics',value:'0'},
      {label:'Electromagnetic Technologies & Techniques',value:'0'},
      {label:'System Design & Verification',value:'0'},
      {label:'Software Engineering',value:'0'},
      {label:'AI Technologies(ex: Machine Learning & Deep Learning)',value:'0'},
      {label:'3D Printing',value:'0'},
      {label:'PCB Design',value:'0'},
      {label:'Life & Physical Sciences',value:'0'},
    ];
    // if(localStorage.getItem('freelancerSkills')){
    //   var s=JSON.parse(localStorage.getItem('freelancerSkills')!);
    //   // this.serviceList=s;
    //   // this.isdisable =false;
    // }
  }

  selectedItems(item:any) {
    this.selectItemsList.push(item);
    this.isDisabled=this.selectItemsList.length<0;

  }
  skillSelect(){
    //localStorage.setItem('registerEmail', this.eMail);
    const params ={
      email: localStorage.getItem('registerEmail'),
      name: localStorage.getItem('nameOTP')
    }
    localStorage.setItem("freelancerSkills",JSON.stringify(this.selectItemsList));
    console.log(JSON.parse(localStorage.getItem('freelancerSkills')!))
     this.service.sendOTP(params).subscribe((data: any) => {
      if(data.status === true) {
        this.router.navigate(['email-verification']);
      } else {
        alert(data.message);
      }
    })
  }
  close(i:any) {
    this.selectItemsList.splice(i,1);
    this.isDisabled=this.selectItemsList.length===0;

  }
}
