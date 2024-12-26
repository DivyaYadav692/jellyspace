import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from 'src/app/app.service';
import { environment } from '../../../environments/environment';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-insights',
  templateUrl: './insights.component.html',
  styleUrls: ['./insights.component.scss'],
})
export class InsightsComponent implements OnInit {
  innerTab: string = 'riskAssessment'; // Default inner tab
  activateTab: string = 'tab1';
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

  activeDropdown: string | null = null;

  dataSources = [
    { name: 'Excel', image: 'Excel.png' },
    { name: 'Database', image: 'Database.png' },
    { name: 'CRM', image: 'CRM.png' },
    { name: 'ERP', image: 'ERP.png' },
    { name: 'WMS', image: 'WMS.png' },
    { name: 'MES', image: 'MES.png' },
    { name: 'TMS', image: 'TMS.png' },
    { name: 'APS', image: 'APS.png' },
    { name: 'SCM', image: 'SCM.png' },
    { name: 'PLM', image: 'PLM.png' },
    { name: 'Cloud', image: 'Cloud.png' },
    { name: 'Data Warehouse', image: 'Data Warehouse.png' },
    { name: 'Streaming System', image: 'Steaming System.png' },
    { name: 'Edge IoT', image: 'Edge - IoT.png' },
    { name: 'DLT Blockchain', image: 'DLT - Blockchain.png' },
    { name: 'Sensor', image: 'Sensor.png' },
    { name: 'Digital Twin', image: 'Digital Twin.png' },
    { name: 'Satellite', image: 'Satellite.png' },
    { name: 'Spaceport', image: 'Spaceport.png' },
    { name: 'Custom API', image: 'Custom API.png' }
  ];

  selectedSource: any = null;

  private integrationModal: any;
  private confirmationModal: any;

  // Add new property to store integrations
  integrationsList: any[] = [];

  activeIntegrations: any[] = []; // Array to store active integrations

  showNotification = false;

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
    this.getProjectsByEmail();
    this.getProjectsData();
    this.getBidDetails();
    this.getCurrentBidDetails();
    this.loginUserDetails();
    this.setActiveTab('tab1');

    // Initialize modal references
    const integrationEl = document.getElementById('integrationModal');
    const confirmationEl = document.getElementById('confirmationModal');
    
    if (integrationEl && confirmationEl) {
      this.integrationModal = new bootstrap.Modal(integrationEl);
      this.confirmationModal = new bootstrap.Modal(confirmationEl);
    }
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
  }
  menuIcon() {
    this.sideNavBar = true;
    this.sideButton = !this.sideButton;
  }
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
      projectId: this.modalProjectId || '',
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

  openSearchBar() {
    this.searchFlag = true;
    this.searchIcon = false;
  }

  viewProfileSCM() {
    this.router.navigate(['scm-profile']);
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

  setActiveTab(tabId: string) {
    this.activateTab = tabId;

    // Set default inner tab based on the active main tab
    switch (tabId) {
      case 'tab1':
        this.innerTab = 'riskAssessment'; // Default inner tab for 'Dashboard'
        break;
      case 'tab2':
        this.innerTab = 'integrationDetails'; // Default inner tab for 'Integration'
        break;
      case 'tab3':
        this.innerTab = 'aiOverview'; // Default inner tab for 'AI-Prompt'
        break;
      case 'tab4':
        this.innerTab = 'notifications'; // Default inner tab for 'Notification Center'
        break;
      case 'tab5':
        this.innerTab = 'reportSummary'; // Default inner tab for 'Reports'
        break;
      default:
        this.innerTab = ''; // Clear inner tab if no main tab matches
        break;
    }
  }

  setInnerTab(tabName: string) {
    this.innerTab = tabName;
  }

  handleExpand(tabId: string) {
    // Handle the ... button click
    console.log('Expand clicked for', tabId);
    // Add your expand logic here
  }

  handleAdd(tab: string) {
    if (tab === 'tab2') {
      const modalElement = document.getElementById('integrationModal');
      if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
      }
    }
    // ... handle other tabs
  }

  selectDataSource(source: any) {
    this.selectedSource = source;
  }

  addIntegration(integration: any) {
    this.activeIntegrations.push({
      ...integration,
      showOptions: false
    });
    
    // Show and auto-hide notification
    this.showNotification = true;
    setTimeout(() => {
      this.showNotification = false;
    }, 2000); // Notification will disappear after 2 seconds
  }

  toggleDropdown(tabId: string, event: Event) {
    event.stopPropagation();
    this.activeDropdown = this.activeDropdown === tabId ? null : tabId;
  }

  @HostListener('document:click')
  closeDropdown() {
    this.activeDropdown = null;
  }

  removeIntegration(integration: any) {
    const index = this.activeIntegrations.indexOf(integration);
    if (index > -1) {
      this.activeIntegrations.splice(index, 1);
    }
    // Close the options menu
    integration.showOptions = false;
  }

  toggleIntegrationOptions(integration: any, event: MouseEvent) {
    // Stop the click event from bubbling up to document
    event.stopPropagation();
    
    // Close other menus
    this.activeIntegrations.forEach(item => {
      if (item !== integration) {
        item.showOptions = false;
      }
    });
    
    // Toggle the clicked menu
    integration.showOptions = !integration.showOptions;
  }

  @HostListener('document:click', ['$event'])
  handleDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    
    // Don't close if clicking on the options button itself
    if (target.classList.contains('options-btn')) {
      return;
    }

    // Close all option menus
    this.activeIntegrations.forEach(integration => {
      integration.showOptions = false;
    });
  }
}
