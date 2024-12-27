import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from 'src/app/app.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-quality',
  templateUrl: './quality.component.html',
})
export class QualityComponent implements OnInit {
  chatbox: boolean = false;
  public showSearch = false;
  sideNavBar: boolean = false;
  inputFlag: boolean = false;
  closeResult: string = '';
  sideButton: boolean = true;
  primarySkillSet: any = [];
  selectItemsList: any = [];
  currentBidProjectDetailsList: any = [];
  accepttBidProjectDetailsList: any = [];
  modalBudget: any;
  skillId: any;
  searchFlag: boolean = false;
  modalProjectId: any;
  modalProjectEmail: any;
  modalHeaderName: any;
  modalDescription: any;
  postingFlag: boolean = true;
  rupeesList: any = [];
  amountList: any = [];
  amountList1: any = [];
  projectFlag: boolean = false;
  payComboFlag: boolean = false;
  fixedComboFlag: boolean = false;
  usdList: any = [];
  usdFlag: boolean = false;
  nzdFlag: boolean = false;
  audFlag: boolean = false;
  gbpFlag: boolean = false;
  hkdFlag: boolean = false;
  sgdFlag: boolean = false;
  eurFlag: boolean = false;
  cadFlag: boolean = false;
  indFlag: boolean = false;
  nzdList: any = [];
  audList: any = [];
  gbpList: any = [];
  hkdList: any = [];
  sgdList: any = [];
  eurList: any = [];
  cadList: any = [];
  projectName: any;
  writeBidDescription: any;
  projectDescription: any;
  usdAmountDisplay: any;
  standardFlag: boolean = false;
  ndaFlag: boolean = false;
  ipFlag: boolean = false;
  featuredFlag: boolean = false;
  urgentFlag: boolean = false;
  skillFlag: boolean = false;
  privateFlag: boolean = false;
  sealedFlag: boolean = false;
  fulltimeFlag: boolean = false;
  findAmount: any;
  nextButton: boolean = true;
  nextButton1: boolean = false;
  nextButton2: boolean = false;
  forwardFlag: boolean = false;
  forwardFlag1: boolean = false;
  writeBidBtnFlag: boolean = true;
  payHourType: any;
  usdFixedList: any = [];
  nzdFixedList: any = [];
  audFixedList: any = [];
  gbpFixedList: any = [];
  hkdFixedList: any = [];
  sgdFixedList: any = [];
  eurFixedList: any = [];
  cadFixedList: any = [];
  findRupeesList: any = [];
  findRupeesId: any;
  payType: any;
  usdFixedFlag: boolean = false;
  nzdFixedFlag: boolean = false;
  audFixedFlag: boolean = false;
  gbpFixedFlag: boolean = false;
  hkdFixedFlag: boolean = false;
  sgdFixedFlag: boolean = false;
  eurFixedFlag: boolean = false;
  cadFixedFlag: boolean = false;
  indFixedFlag: boolean = false;
  writeBidFlag: boolean = false;
  modalSkills: any = [];
  standardCheck: boolean = false;
  ndaCheck: boolean = false;
  ipCheck: boolean = false;
  featureCheck: boolean = false;
  urgentCheck: boolean = false;
  privateCheck: boolean = false;
  sealedeCheck: boolean = false;
  fulltimeCheck: boolean = false;
  minimumFlag: boolean = false;
  maximumFlag: boolean = false;
  postingList: any = [];
  selectedIndex: any;
  projectDataList: any = [];
  projectDataListByEmail: any = [];
  rupeesId: any;
  minimumAmount: any;
  maxAmount: any;
  suggestSkillId: any;
  minAmount: any = 0;
  maxAmountVal: any = 0;
  payHoursList: any = [];
  // sideNavBar: boolean = false;
  findSkillId: any;
  searchIcon: boolean = true;
  bidProjectDetailsList: any = [];
  findProjectDeatilsFlag: boolean = false;
  accountType: any;
  email: any;
  fname: any;
  lname: any;
  image: any;
  skillList: any = [];
  primarySkillSet1: any = [];
  loginEmail: any;

  public fundingArray = ['Description of Funding'];
  // sideButton: boolean = true;

  constructor(
    private modalService: NgbModal,
    config: NgbModalConfig,
    private service: AppService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.loginEmail = localStorage.getItem('userEmail');
    // this.route.queryParams.subscribe(params => {
    //   this.accountType = params['accountType'];
    //   this.email = params['email'];
    //   this.fname = params['fname'];
    //   this.lname = params['lname'];
    //   this.skillList = params['skills']
    //   });
    this.getProjectsByEmail();
    this.getProjectsData();
    this.getBidDetails();
    this.getCurrentBidDetails();
    this.loginUserDetails();
    this.primarySkillSet = [
      { label: 'Onboard Data Systems', value: '0' },
      { label: 'Space System Software', value: '1' },
      { label: 'Spacecraft Electrical Power', value: '2' },
      { label: 'Spacecraft Environments and Effects', value: '3' },
      { label: 'Space System Control', value: '4' },
      { label: 'RF Systems, Payloads and Technologies', value: '0' },
      { label: 'Electromagnetic Technologies and Techniques', value: '0' },
      { label: 'System Design & Verification', value: '0' },
      { label: 'Mission Operation and Ground Data Systems', value: '0' },
      { label: 'Flight Dynamics and GNSS', value: '0' },
      { label: 'Space Debris', value: '0' },
      { label: 'Ground Station Systems and Networks', value: '0' },
      { label: 'Automation, Telepresence & Robotics', value: '0' },
      { label: 'Life & Physical Sciences', value: '0' },
      { label: 'Mechanisms', value: '0' },
      { label: 'Optics', value: '0' },
      { label: 'Optoelectronics', value: '0' },
      { label: 'Aerothermodynamics', value: '0' },
      { label: 'Propulsion', value: '0' },
      { label: 'Structures', value: '0' },
      { label: 'Thermal', value: '0' },
      {
        label:
          'Environmental Control & Life Support(ECLS) and In Situ Resource Utilisation(ISRU)',
        value: '0',
      },
      { label: 'EEE Components and Quality', value: '0' },
      { label: 'Material and Processes', value: '0' },
      { label: 'Quality, Dependability and Safety', value: '0' },
      { label: 'Automation, Telepresence & Robotics', value: '0' },
      { label: 'Electromagnetic Technologies & Techniques', value: '0' },
      { label: 'System Design & Verification', value: '0' },
      { label: 'Software Engineering', value: '0' },
      {
        label: 'AI Technologies(ex: Machine Learning & Deep Learning)',
        value: '0',
      },
      { label: '3D Printing', value: '0' },
      { label: 'PCB Design', value: '0' },
      { label: 'Life & Physical Sciences', value: '0' },
    ];

    this.primarySkillSet1 = [
      { label: 'Space Debris', value: '0' },
      { label: 'Mechanisms', value: '0' },
      { label: 'Optics', value: '0' },
      { label: 'Optoelectronics', value: '0' },
      { label: 'Aerothermodynamics', value: '0' },
      { label: 'Propulsion', value: '0' },
      { label: 'Structures', value: '0' },
      { label: 'Thermal', value: '0' },
      { label: '3D Printing', value: '0' },
      { label: 'PCB Design', value: '0' },
    ];

    this.rupeesList = [
      { label: 'USD', value: '0' },
      { label: 'NZD', value: '1' },
      { label: 'AUD', value: '2' },
      { label: 'GBP', value: '3' },
      { label: 'HKD', value: '4' },
      { label: 'SGD ', value: '5' },
      { label: 'EUR', value: '6' },
      { label: 'CAD', value: '7' },
      { label: 'INR', value: '8' },
    ];
    this.rupeesId = this.rupeesList['0'].label;
    this.findRupeesList = [
      { label: 'USD', value: '0' },
      { label: 'NZD', value: '1' },
      { label: 'AUD', value: '2' },
      { label: 'GBP', value: '3' },
      { label: 'HKD', value: '4' },
      { label: 'SGD ', value: '5' },
      { label: 'EUR', value: '6' },
      { label: 'CAD', value: '7' },
      { label: 'INR', value: '8' },
    ];
    this.findRupeesId = this.findRupeesList['0'].label;
    this.amountList = [
      { label: 'Basic($100.00 - 400.00 INR per hour)', value: '0' },
      { label: 'Moderate($400.00 - 750.00 INR per hour)', value: '0' },
      { label: 'Standard($750.00 - 1250.00 INR per hour)', value: '0' },
      { label: 'Skilled($1250.00 - 2500.00 INR per hour)', value: '0' },
      { label: 'Expert($2500.00 + INR per hour)', value: '0' },
      { label: 'Customized Budget', value: '0' },
    ];
    this.amountList1 = [
      { label: 'Micro Project (₹600.00 - 1,500.00 INR) ', value: '0' },
      { label: 'Simple project (₹1,500.00 - 12,500.00 INR) ', value: '0' },
      {
        label: ' Very small project (₹12,500.00 - 37,500.00 INR) ',
        value: '0',
      },
      { label: ' Small project (₹37,500.00 - 75,000.00 INR) ', value: '0' },
      { label: ' Medium project (₹75,000.00 - 150,000.00 INR) ', value: '0' },
      { label: ' Large project (₹150,000.00 - 250,000.00 INR) ', value: '0' },
      { label: ' Larger project (₹250,000.00 - 500,000.00 INR) ', value: '0' },
      {
        label: '  Very Large project (₹500,000.00 - 1,000,000.00 INR)  ',
        value: '0',
      },
      {
        label: '   Huge project (₹1,000,000.00 - 2,500,000.00 INR)   ',
        value: '0',
      },
      { label: '   Major project (₹2,500,000.00+ INR)   ', value: '0' },
      { label: '   Customized Budget   ', value: '0' },
    ];
    this.usdList = [
      { label: 'Basic ($2.00 - 8.00 USD per hour)', value: '0' },
      { label: 'Moderate ($8.00 - 15.00 USD per hour) ', value: '0' },
      { label: 'Standard ($15.00 - 25.00 USD per hour) ', value: '0' },
      { label: ' Skilled ($25.00 - 50.00 USD per hour) ', value: '0' },
      { label: ' Expert ($50.00+ USD per hour) ', value: '0' },
      { label: 'Customized Budget', value: '0' },
    ];
    this.nzdList = [
      { label: ' Basic ($3.00 - 10.00 NZD per hour) ', value: '0' },
      { label: ' Moderate ($10.00 - 20.00 NZD per hour) ', value: '0' },
      { label: ' Standard ($20.00 - 30.00 NZD per hour) ', value: '0' },
      { label: ' Skilled ($30.00 - 60.00 NZD per hour)', value: '0' },
      { label: ' Expert ($50.00+ NZD per hour) ', value: '0' },
      { label: 'Customized Budget', value: '0' },
    ];
    this.audList = [
      { label: ' Basic ($3.00 - 10.00 AUD per hour) ', value: '0' },
      { label: ' Moderate ($10.00 - 20.00 AUD per hour) ', value: '0' },
      { label: ' Standard ($20.00 - 30.00 AUD per hour) ', value: '0' },
      { label: ' Skilled ($30.00 - 60.00 AUD per hour)', value: '0' },
      { label: ' Expert ($50.00+ AUD per hour) ', value: '0' },
      { label: 'Customized Budget', value: '0' },
    ];
    this.gbpList = [
      { label: ' Basic ($3.00 - 10.00 GBP per hour) ', value: '0' },
      { label: ' Moderate ($10.00 - 20.00 GBP per hour) ', value: '0' },
      { label: ' Standard ($20.00 - 30.00 GBP per hour) ', value: '0' },
      { label: ' Skilled ($30.00 - 60.00 GBP per hour)', value: '0' },
      { label: ' Expert ($50.00+ GBP per hour) ', value: '0' },
      { label: 'Customized Budget', value: '0' },
    ];
    this.hkdList = [
      { label: ' Basic ($3.00 - 10.00 HKD per hour) ', value: '0' },
      { label: ' Moderate ($10.00 - 20.00 HKD per hour) ', value: '0' },
      { label: ' Standard ($20.00 - 30.00 HKD per hour) ', value: '0' },
      { label: ' Skilled ($30.00 - 60.00 HKD per hour)', value: '0' },
      { label: ' Expert ($50.00+ HKD per hour) ', value: '0' },
      { label: 'Customized Budget', value: '0' },
    ];
    this.sgdList = [
      { label: ' Basic ($3.00 - 10.00 SGD per hour) ', value: '0' },
      { label: ' Moderate ($10.00 - 20.00 SGD per hour) ', value: '0' },
      { label: ' Standard ($20.00 - 30.00 SGD per hour) ', value: '0' },
      { label: ' Skilled ($30.00 - 60.00 SGD per hour)', value: '0' },
      { label: ' Expert ($50.00+ SGD per hour) ', value: '0' },
      { label: 'Customized Budget', value: '0' },
    ];
    this.eurList = [
      { label: ' Basic ($3.00 - 10.00 EUR per hour) ', value: '0' },
      { label: ' Moderate ($10.00 - 20.00 EUR per hour) ', value: '0' },
      { label: ' Standard ($20.00 - 30.00 EUR per hour) ', value: '0' },
      { label: ' Skilled ($30.00 - 60.00 EUR per hour)', value: '0' },
      { label: ' Expert ($50.00+ EUR per hour) ', value: '0' },
      { label: 'Customized Budget', value: '0' },
    ];
    this.cadList = [
      { label: ' Basic ($3.00 - 10.00 CAD per hour) ', value: '0' },
      { label: ' Moderate ($10.00 - 20.00 CAD per hour) ', value: '0' },
      { label: ' Standard ($20.00 - 30.00 CAD per hour) ', value: '0' },
      { label: ' Skilled ($30.00 - 60.00 CAD per hour)', value: '0' },
      { label: ' Expert ($50.00+ CAD per hour) ', value: '0' },
      { label: 'Customized Budget', value: '0' },
    ];
    this.usdFixedList = [
      { label: ' Micro Project ($10.00 - 30.00 USD) ', value: '0' },
      { label: ' Simple project ($30.00 - 250.00 USD) ', value: '0' },
      { label: ' Very small project ($250.00 - 750.00 USD) ', value: '0' },
      { label: ' Small project ($750.00 - 1,500.00 USD) ', value: '0' },
      { label: '  Medium project ($1,500.00 - 3,000.00 USD) ', value: '0' },
      { label: '  Large project ($3,000.00 - 5,000.00 USD) ', value: '0' },
      { label: '   Larger project ($5,000.00 - 10,000.00 USD) ', value: '0' },
      {
        label: '   Very Large project ($10,000.00 - 20,000.00 USD)  ',
        value: '0',
      },
      { label: '   Huge project ($20,000.00 - 50,000.00 USD) ', value: '0' },
      { label: '    Major project ($50,000.00+ USD)  ', value: '0' },
      { label: 'Customized Budget', value: '0' },
    ];
    this.nzdFixedList = [
      { label: '  Micro Project ($14.00 - 30.00 NZD)  ', value: '0' },
      { label: ' Simple project ($30.00 - 250.00 NZD)  ', value: '0' },
      { label: '  Very small project ($250.00 - 750.00 NZD)  ', value: '0' },
      { label: '  Small project ($750.00 - 1,500.00 NZD) ', value: '0' },
      { label: ' Medium project ($1,500.00 - 3,000.00 NZD) ', value: '0' },
      { label: '  Large project ($3,000.00 - 5,000.00 NZD)  ', value: '0' },
      { label: '  Larger project ($5,000.00 - 10,000.00 NZD)  ', value: '0' },
      {
        label: '  Very Large project ($10,000.00 - 20,000.00 NZD) ',
        value: '0',
      },
      { label: '  Huge project ($20,000.00 - 50,000.00 NZD)  ', value: '0' },
      { label: '  Major project ($50,000.00+ NZD) ', value: '0' },
      { label: 'Customized Budget', value: '0' },
    ];
    this.audFixedList = [
      { label: '  Micro Project ($10.00 - 30.00 AUD) ', value: '0' },
      { label: '  Simple project ($30.00 - 250.00 AUD) ', value: '0' },
      { label: '  Very small project ($250.00 - 750.00 AUD)  ', value: '0' },
      { label: '  Small project ($750.00 - 1,500.00 AUD) ', value: '0' },
      { label: ' Medium project ($1,500.00 - 3,000.00 AUD) ', value: '0' },
      { label: '  Large project ($3,000.00 - 5,000.00 AUD)  ', value: '0' },
      { label: '  Larger project ($5,000.00 - 10,000.00 AUD)  ', value: '0' },
      {
        label: '  Very Large project ($10,000.00 - 20,000.00 AUD) ',
        value: '0',
      },
      { label: '  Huge project ($20,000.00 - 50,000.00 AUD)  ', value: '0' },
      { label: '  Major project ($50,000.00+ AUD) ', value: '0' },
      { label: 'Customized Budget', value: '0' },
    ];
    this.gbpFixedList = [
      { label: ' Micro Project (£10.00 - 20.00 GBP) ', value: '0' },
      { label: '  Simple project (£20.00 - 250.00 GBP)  ', value: '0' },
      { label: '  Very small project (£250.00 - 750.00 GBP)  ', value: '0' },
      { label: '  Small project (£750.00 - 1,500.00 GBP) ', value: '0' },
      { label: ' Medium project ($1,500.00 - 3,000.00 GBP) ', value: '0' },
      { label: '  Large project ($3,000.00 - 5,000.00 GBP)  ', value: '0' },
      { label: '  Larger project ($5,000.00 - 10,000.00 GBP)  ', value: '0' },
      {
        label: '  Very Large project ($10,000.00 - 20,000.00 GBP) ',
        value: '0',
      },
      { label: '  Huge project ($20,000.00 - 50,000.00 GBP)  ', value: '0' },
      { label: '  Major project ($50,000.00+ GBP) ', value: '0' },
      { label: 'Customized Budget', value: '0' },
    ];
    this.hkdFixedList = [
      { label: '  Micro Project ($80.00 - 240.00 HKD)  ', value: '0' },
      { label: '  Simple project ($240.00 - 2,000.00 HKD)  ', value: '0' },
      { label: '  Very small project ($2,000.00 - 6,000.00 HKD) ', value: '0' },
      { label: '  Small project ($6,000.00 - 12,000.00 HKD) ', value: '0' },
      { label: ' Medium project ($12,000.00 - 24,000.00 HKD)  ', value: '0' },
      { label: '  Large project ($24,000.00 - 40,000.00 HKD)   ', value: '0' },
      { label: '  Larger project ($40,000.00 - 80,000.00 HKD)   ', value: '0' },
      {
        label: '  Very Large project ($80,000.00 - 160,000.00 HKD)   ',
        value: '0',
      },
      { label: '  Huge project ($160,000.00 - 400,000.00 HKD)   ', value: '0' },
      { label: '  Major project ($400,000.00+ HKD)   ', value: '0' },
      { label: 'Customized Budget', value: '0' },
    ];
    this.sgdFixedList = [
      { label: ' Micro Project ($12.00 - 30.00 SGD) ', value: '0' },
      { label: '  Simple project (£20.00 - 250.00 SGD)  ', value: '0' },
      { label: '  Very small project (£250.00 - 750.00 SGD)  ', value: '0' },
      { label: '  Small project (£750.00 - 1,500.00 SGD) ', value: '0' },
      { label: ' Medium project ($1,500.00 - 3,000.00 SGD) ', value: '0' },
      { label: '  Large project ($3,000.00 - 5,000.00 SGD)  ', value: '0' },
      { label: '  Larger project ($5,000.00 - 10,000.00 SGD)  ', value: '0' },
      {
        label: '  Very Large project ($10,000.00 - 20,000.00 SGD) ',
        value: '0',
      },
      { label: '  Huge project ($20,000.00 - 50,000.00 SGD)  ', value: '0' },
      { label: '  Major project ($50,000.00+ SGD) ', value: '0' },
      { label: 'Customized Budget', value: '0' },
    ];
    this.eurFixedList = [
      { label: ' Micro Project ($12.00 - 30.00 EUR) ', value: '0' },
      { label: '  Simple project (£20.00 - 250.00 EUR)  ', value: '0' },
      { label: '  Very small project (£250.00 - 750.00 EUR)  ', value: '0' },
      { label: '  Small project (£750.00 - 1,500.00 EUR) ', value: '0' },
      { label: ' Medium project ($1,500.00 - 3,000.00 EUR) ', value: '0' },
      { label: '  Large project ($3,000.00 - 5,000.00 EUR)  ', value: '0' },
      { label: '  Larger project ($5,000.00 - 10,000.00 EUR)  ', value: '0' },
      {
        label: '  Very Large project ($10,000.00 - 20,000.00 EUR) ',
        value: '0',
      },
      { label: '  Huge project ($20,000.00 - 50,000.00 EUR)  ', value: '0' },
      { label: '  Major project ($50,000.00+ EUR) ', value: '0' },
      { label: 'Customized Budget', value: '0' },
    ];
    this.cadFixedList = [
      { label: ' Micro Project ($10.00 - 30.00 CAD)  ', value: '0' },
      { label: '  Simple project ($30.00 - 250.00 CAD)  ', value: '0' },
      { label: '  Very small project ($250.00 - 750.00 CAD)  ', value: '0' },
      { label: '  Small project (£750.00 - 1,500.00 CAD) ', value: '0' },
      { label: ' Medium project ($1,500.00 - 3,000.00 CAD) ', value: '0' },
      { label: '  Large project ($3,000.00 - 5,000.00 CAD)  ', value: '0' },
      { label: '  Larger project ($5,000.00 - 10,000.00 CAD)  ', value: '0' },
      {
        label: '  Very Large project ($10,000.00 - 20,000.00 CAD) ',
        value: '0',
      },
      { label: '  Huge project ($20,000.00 - 50,000.00 CAD)  ', value: '0' },
      { label: '  Major project ($50,000.00+ CAD) ', value: '0' },
      { label: 'Customized Budget', value: '0' },
    ];

    this.postingList = [
      {
        title: 'Standard Project',
        description:
          'Your Project will go live instantly & youcan start receiving the bids.',
        icon: 'standard-icon.png',
        isChecked: false,
      },
      {
        title: 'NDA Project',
        description:
          'Before onboarding the personnels, a Non-Disclosure Agreement will be signed. Binds them to maintain Project Confidentiality.',
        icon: 'nda-icon.png',
        isChecked: false,
      },
      {
        title: 'Project based on IP',
        description:
          'The bidding personnels will be prompted to sign an Intellectual Property (IP) Agreement. All work done on the Project will be yours.',
        icon: 'ip-icon.png',
        isChecked: false,
      },
      {
        title: 'Featured',
        description:
          'Choose this when you want to mark your Project as Featured to attract more Quality Bids and get search engine optimized for display & attention.',
        icon: 'featured-icon.png',
        isChecked: false,
      },
      {
        title: 'Urgent',
        description:
          'Choose this when you want to attract bidders who are ready to kick-off the Project and can be onboarded right now. The bidding remains open for only 24hrs.',
        icon: 'urgent-icon.png',
        isChecked: false,
      },
      {
        title: 'Private Project',
        description:
          'Your Project will not be visible in any search engine. Only logged in users at JELLYSPACE will be able to view it.You can even restrict the Project to your Favorite individuals.',
        icon: 'privte-icon.png',
        isChecked: false,
      },
      {
        title: 'Sealed Project',
        description:
          'The bids on the Project will not be visible openly. This way you get to select the best bid.',
        icon: 'sealed-icon.png',
        isChecked: false,
      },
      {
        title: 'Full Time',
        description:
          'Choose this option when you have a Project that is long-term or needs extended support from the hired personnels.',
        icon: 'fulltime-icon.png',
        isChecked: false,
      },
    ];
    this.payHoursList = [
      {
        title: 'Pay Per Hour',
        description:
          'Hire Based On an Hourly Rate Billing Is Done For The Hours Utilized On The Project',
        icon: 'pay-icon.png',
        isChecked: false,
      },
      {
        title: 'Pay a Fixed Price',
        description:
          'Agree On a Price and Execute Payment When The Job is Completed BestFor Single Fixed-task or One-Off Project',
        icon: 'pay-fixed-icon.png',
        isChecked: false,
      },
    ];
  }

  openForm() {
    this.chatbox = true;
  }

  closeForm() {
    this.chatbox = false;
  }

  openLg(content: any) {
    this.projectFlag = true;
    this.postingFlag = false;
    // this.modalService.open(content, { size: 'xl', scrollable: true });
  }
  openFindProjectDetails(content: any, data: any) {
    console.log(data);
    this.modalBudget = data.budget;
    this.modalHeaderName = data.projectName;
    this.modalProjectId = data.projectId;
    this.modalProjectEmail = data.userEmail;
    this.modalDescription = data.projectDescription;
    this.modalSkills = JSON.parse(data.skills);
    console.log(this.modalSkills);
    this.findProjectDeatilsFlag = true;
    // this.modalService.open(content, { size: 'xl', centered: true });
  }

  menuIcon() {
    this.sideNavBar = true;
    this.sideButton = !this.sideButton;
  }
  // menuIcon1() {
  //   this.sideNavBar = true;
  // }

  openSearch() {
    this.inputFlag = !this.inputFlag;
  }
  getProjectsByEmail() {
    const params = {
      email: localStorage.getItem('userEmail'),
    };
    this.service.getProjectByEmail(params).subscribe((res: any) => {
      this.projectDataListByEmail = res['data'];
    });
  }
  getProjectsData() {
    this.service.getApiDataBinding().subscribe((res: any) => {
      console.log(res);
      this.projectDataList = res['data'];
    });
  }
  writeBid() {
    this.writeBidFlag = true;
    this.writeBidBtnFlag = false;
  }
  closeBid() {
    this.writeBidFlag = false;
    this.writeBidBtnFlag = true;
  }
  clearBid() {
    this.findRupeesId = this.findRupeesList['0'].label;
    this.writeBidDescription = '';
    this.findAmount = '';
  }
  postBid() {
    const params = {
      projectId: this.modalProjectId || '',
      projectName: this.modalHeaderName || '',
      projectEmail: this.modalProjectEmail || '',
      bidAmount: this.findAmount || '',
      status: 'pending',
      rupeesId: this.findRupeesId || '',
      userEmail: localStorage.getItem('userEmail'),
    };
    this.service.postBid(params).subscribe((data: any) => {
      console.log(data);
      if (data.status === true) {
        alert(data.message);
        this.writeBidFlag = false;
        this.writeBidBtnFlag = true;
        this.resetData();
      } else {
        alert(data.message);
      }
    });
  }

  deleteData() {
    alert(this.modalProjectId);
    const params = {
      id: this.modalProjectId || '',
    };
    this.service.deleteData(params).subscribe((res: any) => {
      if (res.status === true) {
        alert(res.message);
        this.getProjectsByEmail();
      } else {
        alert(res.message);
      }
    });
  }
  acceptData(status: any, id: any) {
    const params = {
      id: id || '',
      status: status || '',
    };
    this.service.acceptedAndRejected(params).subscribe((res: any) => {
      if (res.status === true) {
        this.getBidDetails();
        alert(res.message);
      } else {
        alert(res.message);
      }
    });
  }
  getBidDetails() {
    const params = {
      projectEmail: localStorage.getItem('userEmail'),
    };
    this.service.getBidInitDetails(params).subscribe((res: any) => {
      this.bidProjectDetailsList = res['data'];
      console.log(res);
    });
  }
  getCurrentBidDetails() {
    const params = {
      userEmail: localStorage.getItem('userEmail'),
    };
    this.service.getCurrentBidDetailsList(params).subscribe((res: any) => {
      var list = res['data'];
      this.currentBidProjectDetailsList = list.filter(
        (obj: any) => obj.status == 'pending'
      );
      this.accepttBidProjectDetailsList = list.filter(
        (obj: any) => obj.status == 'accepted'
      );
      console.log(res);
    });
  }
  cancelForm() {
    this.projectFlag = false;
    this.postingFlag = true;
    this.skillFlag = false;
    this.forwardFlag = false;
    this.forwardFlag1 = false;
    this.nextButton = true;
    this.nextButton1 = false;
    this.nextButton2 = false;
    this.resetData();
  }
  resetData() {
    this.ndaFlag = false;
    this.ipFlag = false;
    this.ipCheck = false;
    this.featuredFlag = false;
    this.featureCheck = false;
    this.urgentFlag = false;
    this.urgentCheck = false;
    this.privateFlag = false;
    this.privateCheck = false;
    this.projectName = '';
    this.projectDescription = '';
    this.selectItemsList = [];
    this.suggestSkillId = this.primarySkillSet[0].label;
    this.payComboFlag = false;
    this.fixedComboFlag = false;
    this.rupeesId = this.rupeesList[0].label;
    this.minimumFlag = false;
    this.maximumFlag = false;
    this.standardCheck = false;
    this.ndaCheck = false;
    this.sealedFlag = false;
    this.sealedeCheck = false;
    this.fulltimeFlag = false;
    this.fulltimeCheck = false;
    this.standardFlag = false;
  }

  nextForward() {
    this.nextButton = false;
    this.nextButton1 = true;
    this.skillFlag = true;
  }
  nextForward1() {
    this.nextButton1 = false;
    this.nextButton2 = true;
    this.forwardFlag = true;
  }
  nextForward2() {
    this.nextButton2 = false;
    this.forwardFlag1 = true;
  }

  close(i: any) {
    this.selectItemsList.splice(i, 1);
  }
  selectedItems(item: any) {
    console.log(item.target.value);
    this.selectItemsList.push(item.target.value);
  }
  selectPayHour(item: any, index: any) {
    console.log(item.isChecked, index);
    this.selectedIndex = index;
    if (item.title && item.title === 'Pay Per Hour') {
      this.payType = item.title;
      this.payComboFlag = true;
      this.fixedComboFlag = false;
      this.usdFixedFlag = false;
      this.usdFlag = true;
      this.nzdFlag = false;
      this.audFlag = false;
      this.gbpFlag = false;
      this.hkdFlag = false;
      this.sgdFlag = false;
      this.eurFlag = false;
      this.cadFlag = false;
      this.indFlag = false;
      this.nzdFixedFlag = false;
      this.audFixedFlag = false;
      this.gbpFixedFlag = false;
      this.hkdFixedFlag = false;
      this.sgdFixedFlag = false;
      this.eurFixedFlag = false;
      this.cadFixedFlag = false;
      this.indFixedFlag = false;
      this.rupeesId = this.rupeesList[0].label;
    } else if (item.title && item.title === 'Pay a Fixed Price') {
      this.payType = item.title;
      this.rupeesId = this.rupeesList[0].label;
      this.payComboFlag = false;
      this.fixedComboFlag = true;
      this.usdFixedFlag = true;
      this.usdFlag = false;
      this.nzdFlag = false;
      this.audFlag = false;
      this.gbpFlag = false;
      this.hkdFlag = false;
      this.sgdFlag = false;
      this.eurFlag = false;
      this.cadFlag = false;
      this.indFlag = false;
      this.nzdFixedFlag = false;
      this.audFixedFlag = false;
      this.gbpFixedFlag = false;
      this.hkdFixedFlag = false;
      this.sgdFixedFlag = false;
      this.eurFixedFlag = false;
      this.cadFixedFlag = false;
      this.indFixedFlag = false;
    }
    // this.payHoursList[index].isChecked = !this.payHoursList[index].isChecked;
  }

  payHour(value: any) {
    // this.rupeesList = [];
    this.payType = value;
    this.payComboFlag = true;
    this.fixedComboFlag = false;
    this.usdFixedFlag = false;
    this.usdFlag = true;
    this.nzdFlag = false;
    this.audFlag = false;
    this.gbpFlag = false;
    this.hkdFlag = false;
    this.sgdFlag = false;
    this.eurFlag = false;
    this.cadFlag = false;
    this.indFlag = false;
    this.nzdFixedFlag = false;
    this.audFixedFlag = false;
    this.gbpFixedFlag = false;
    this.hkdFixedFlag = false;
    this.sgdFixedFlag = false;
    this.eurFixedFlag = false;
    this.cadFixedFlag = false;
    this.indFixedFlag = false;
    this.rupeesId = this.rupeesList[0].label;
  }

  payFixed(value: any) {
    this.payType = value;
    this.rupeesId = this.rupeesList[0].label;
    this.payComboFlag = false;
    this.fixedComboFlag = true;
    this.usdFixedFlag = true;
    this.usdFlag = false;
    this.nzdFlag = false;
    this.audFlag = false;
    this.gbpFlag = false;
    this.hkdFlag = false;
    this.sgdFlag = false;
    this.eurFlag = false;
    this.cadFlag = false;
    this.indFlag = false;
    this.nzdFixedFlag = false;
    this.audFixedFlag = false;
    this.gbpFixedFlag = false;
    this.hkdFixedFlag = false;
    this.sgdFixedFlag = false;
    this.eurFixedFlag = false;
    this.cadFixedFlag = false;
    this.indFixedFlag = false;
  }

  changeAmount(eve: any) {
    if (eve.target.value === 'USD') {
      this.usdFlag = true;
      this.nzdFlag = false;
      this.audFlag = false;
      this.gbpFlag = false;
      this.hkdFlag = false;
      this.sgdFlag = false;
      this.eurFlag = false;
      this.cadFlag = false;
      this.indFlag = false;
      this.usdFixedFlag = true;
      this.nzdFixedFlag = false;
      this.audFixedFlag = false;
      this.gbpFixedFlag = false;
      this.hkdFixedFlag = false;
      this.sgdFixedFlag = false;
      this.eurFixedFlag = false;
      this.cadFixedFlag = false;
      this.indFixedFlag = false;
    } else if (eve.target.value === 'NZD') {
      this.usdFlag = false;
      this.nzdFlag = true;
      this.audFlag = false;
      this.gbpFlag = false;
      this.hkdFlag = false;
      this.sgdFlag = false;
      this.eurFlag = false;
      this.cadFlag = false;
      this.indFlag = false;
      this.usdFixedFlag = false;
      this.nzdFixedFlag = true;
      this.audFixedFlag = false;
      this.gbpFixedFlag = false;
      this.hkdFixedFlag = false;
      this.sgdFixedFlag = false;
      this.eurFixedFlag = false;
      this.cadFixedFlag = false;
      this.indFixedFlag = false;
    } else if (eve.target.value === 'AUD') {
      this.usdFlag = false;
      this.nzdFlag = false;
      this.audFlag = true;
      this.gbpFlag = false;
      this.hkdFlag = false;
      this.sgdFlag = false;
      this.eurFlag = false;
      this.cadFlag = false;
      this.indFlag = false;
      this.usdFixedFlag = false;
      this.nzdFixedFlag = false;
      this.audFixedFlag = true;
      this.gbpFixedFlag = false;
      this.hkdFixedFlag = false;
      this.sgdFixedFlag = false;
      this.eurFixedFlag = false;
      this.cadFixedFlag = false;
      this.indFixedFlag = false;
    } else if (eve.target.value === 'GBP') {
      this.usdFlag = false;
      this.nzdFlag = false;
      this.audFlag = false;
      this.gbpFlag = true;
      this.hkdFlag = false;
      this.sgdFlag = false;
      this.eurFlag = false;
      this.cadFlag = false;
      this.indFlag = false;
      this.usdFixedFlag = false;
      this.nzdFixedFlag = false;
      this.audFixedFlag = false;
      this.gbpFixedFlag = true;
      this.hkdFixedFlag = false;
      this.sgdFixedFlag = false;
      this.eurFixedFlag = false;
      this.cadFixedFlag = false;
      this.indFixedFlag = false;
    } else if (eve.target.value === 'HKD') {
      this.usdFlag = false;
      this.nzdFlag = false;
      this.audFlag = false;
      this.gbpFlag = false;
      this.hkdFlag = true;
      this.sgdFlag = false;
      this.eurFlag = false;
      this.cadFlag = false;
      this.indFlag = false;
      this.usdFixedFlag = false;
      this.nzdFixedFlag = false;
      this.audFixedFlag = false;
      this.gbpFixedFlag = false;
      this.hkdFixedFlag = true;
      this.sgdFixedFlag = false;
      this.eurFixedFlag = false;
      this.cadFixedFlag = false;
      this.indFixedFlag = false;
    } else if (eve.target.value === 'SGD') {
      this.usdFlag = false;
      this.nzdFlag = false;
      this.audFlag = false;
      this.gbpFlag = false;
      this.hkdFlag = false;
      this.sgdFlag = true;
      this.eurFlag = false;
      this.cadFlag = false;
      this.indFlag = false;
      this.usdFixedFlag = false;
      this.nzdFixedFlag = false;
      this.audFixedFlag = false;
      this.gbpFixedFlag = false;
      this.hkdFixedFlag = false;
      this.sgdFixedFlag = true;
      this.eurFixedFlag = false;
      this.cadFixedFlag = false;
      this.indFixedFlag = false;
    } else if (eve.target.value === 'EUR') {
      this.usdFlag = false;
      this.nzdFlag = false;
      this.audFlag = false;
      this.gbpFlag = false;
      this.hkdFlag = false;
      this.sgdFlag = false;
      this.eurFlag = true;
      this.cadFlag = false;
      this.indFlag = false;
      this.usdFixedFlag = false;
      this.nzdFixedFlag = false;
      this.audFixedFlag = false;
      this.gbpFixedFlag = false;
      this.hkdFixedFlag = false;
      this.sgdFixedFlag = false;
      this.eurFixedFlag = true;
      this.cadFixedFlag = false;
      this.indFixedFlag = false;
    } else if (eve.target.value === 'CAD') {
      this.usdFlag = false;
      this.nzdFlag = false;
      this.audFlag = false;
      this.gbpFlag = false;
      this.hkdFlag = false;
      this.sgdFlag = false;
      this.eurFlag = false;
      this.cadFlag = true;
      this.indFlag = false;
      this.usdFixedFlag = false;
      this.nzdFixedFlag = false;
      this.audFixedFlag = false;
      this.gbpFixedFlag = false;
      this.hkdFixedFlag = false;
      this.sgdFixedFlag = false;
      this.eurFixedFlag = false;
      this.cadFixedFlag = true;
      this.indFixedFlag = false;
    } else if (eve.target.value === 'INR') {
      this.usdFlag = false;
      this.nzdFlag = false;
      this.audFlag = false;
      this.gbpFlag = false;
      this.hkdFlag = false;
      this.sgdFlag = false;
      this.eurFlag = false;
      this.cadFlag = false;
      this.indFlag = true;
      this.usdFixedFlag = false;
      this.nzdFixedFlag = false;
      this.audFixedFlag = false;
      this.gbpFixedFlag = false;
      this.hkdFixedFlag = false;
      this.sgdFixedFlag = false;
      this.eurFixedFlag = false;
      this.cadFixedFlag = false;
      this.indFixedFlag = true;
    }
  }

  onChnagePay(eve: any) {
    let changeAmount: any;
    this.usdAmountDisplay = eve.target.value;
    if (this.usdAmountDisplay === 'Customized Budget') {
      this.minimumFlag = true;
      this.maximumFlag = true;
      // this.usdAmountDisplay = parseFloat(this.minimumAmount) + '-' + parseFloat(this.maxAmount)
    } else {
      this.minimumFlag = false;
      this.maximumFlag = false;
    }
  }
  onChnageFixed(eve: any) {
    let changeAmount: any;
    this.usdAmountDisplay = eve.target.value;
    if (this.usdAmountDisplay === 'Customized Budget') {
      this.minimumFlag = true;
      this.maximumFlag = true;
      // this.usdAmountDisplay = parseFloat(this.minimumAmount) + '-' + parseFloat(this.maxAmount)
    } else {
      this.minimumFlag = false;
      this.maximumFlag = false;
    }
  }
  selectPostings(item: any, index: any) {
    console.log(item.isChecked, index);
    console.log(item);
    if (item.title && item.title === 'Standard Project') {
      if (!this.postingList[index].isChecked) {
        this.standardFlag = true;
      } else {
        this.standardFlag = false;
      }
    } else if (item.title && item.title === 'NDA Project') {
      if (!this.postingList[index].isChecked) {
        this.ndaFlag = true;
      } else {
        this.ndaFlag = false;
      }
    } else if (item.title && item.title === 'Project based on IP') {
      if (!this.postingList[index].isChecked) {
        this.ipFlag = true;
      } else {
        this.ipFlag = false;
      }
    } else if (item.title && item.title === 'Featured') {
      if (!this.postingList[index].isChecked) {
        this.featuredFlag = true;
      } else {
        this.featuredFlag = false;
      }
    } else if (item.title && item.title === 'Urgent') {
      if (!this.postingList[index].isChecked) {
        this.urgentFlag = true;
      } else {
        this.urgentFlag = false;
      }
    } else if (item.title && item.title === 'Private Project') {
      if (!this.postingList[index].isChecked) {
        this.privateFlag = true;
      } else {
        this.privateFlag = false;
      }
    } else if (item.title && item.title === 'Sealed Project') {
      if (!this.postingList[index].isChecked) {
        this.sealedFlag = true;
      } else {
        this.sealedFlag = false;
      }
    } else if (item.title && item.title === 'Full Time') {
      if (!this.postingList[index].isChecked) {
        this.fulltimeFlag = true;
      } else {
        this.fulltimeFlag = false;
      }
    }
    this.postingList[index].isChecked = !this.postingList[index].isChecked;
  }
  savePostProject() {
    const params = {
      projectName: this.projectName || '',
      projectDescription: this.projectDescription || '',
      skills: JSON.stringify(this.selectItemsList || ''),
      billingProcess: this.payType || '',
      budget: this.usdAmountDisplay || '',
      projectType: '',
      userEmail: localStorage.getItem('userEmail'),
    };
    this.service.savePostMethod(params).subscribe((data: any) => {
      console.log(data);
      if (data.status === true) {
        alert(data.message);
        this.cancelForm();
        this.resetData();
      } else {
        alert(data.message);
      }
    });
  }
  openSearchBar() {
    this.searchFlag = true;
    this.searchIcon = false;
  }

  viewProfile() {
    let params = {};
    this.router.navigate(['scm-profile'], {
      queryParams: params,
      skipLocationChange: false,
    });
  }
  viewProfile1() {
    let params = {};
    this.router.navigate(['company-profile'], {
      queryParams: params,
      skipLocationChange: false,
    });
  }
  setDefault() {
    this.image = '/assets/img/avatar.png';
  }

  loginUserDetails() {
    const params = {
      email: this.loginEmail || '',
    };
    this.service.loginUserDetails(params).subscribe((data: any) => {
      console.log(data);
      if (data.status === true) {
        localStorage.setItem('userEmail', data.data.email);
        localStorage.setItem('userId', data.data.id);
        this.accountType = data.data.accountType;
        this.email = data.data.email;
        this.fname = data.data.firstName;
        this.lname = data.data.lastName;
        this.skillList = data.data.skills;
        this.image = data.data.image;
      } else {
        alert(data.message);
      }
      // console.log(data);
    });
  }

  _openCommunityTab() {
    const communityUrl = `${environment.frontendUrl}/community`;
    window.open(communityUrl, '_blank');
  }
}
