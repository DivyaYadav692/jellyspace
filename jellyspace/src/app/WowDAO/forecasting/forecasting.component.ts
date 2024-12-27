import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from 'src/app/app.service';
import { Chart, registerables } from 'chart.js';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-forecasting',
  templateUrl: './forecasting.component.html',
  styleUrls: ['./forecasting.component.scss'],
})
export class ForecastingComponent implements OnInit {
  // Chart.js related variables
  @ViewChild('stockChart', { static: true }) private stockChartRef!: ElementRef;
  private stockChart!: Chart;

  innerTab: string = 'riskAssessment'; // Default inner tab
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
    this.getProjectsByEmail();
    this.getProjectsData();
    this.getBidDetails();
    this.getCurrentBidDetails();
    this.loginUserDetails();
    this.createChart();
  } // Define this function in your component
  generateDataPoints(numPoints: number): number[] {
    return Array.from({ length: numPoints }, (_, i) => i + 1);
  }

  createChart() {
    const ctx = this.stockChartRef.nativeElement.getContext('2d');

    // Example custom dataset values
    const syntheticData = [
      1000, 2000, 3000, 4000, 2000, 3000, 4000, 1000, 2000, 3000, 4000, 2000,
      // ... (data truncated for brevity)
    ];
    const predictionsData = [
      5000, 3000, 4000, 1000, 2000, 2500, 3000, 5000, 3000, 4000, 1000, 2000,
      // ... (data truncated for brevity)
    ];

    // Define years for X-axis labels
    const years = [
      '2010',
      '2011',
      '2012',
      '2013',
      '2014',
      '2015',
      '2016',
      '2017',
      '2018',
      '2019',
      '2020',
      '2021',
      '2022',
      '2023',
      '2024',
    ];

    this.stockChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: years,
        datasets: [
          {
            label: 'Synthetic',
            data: syntheticData,
            backgroundColor: 'rgba(0, 123, 255, 0.1)', // Lighter background color
            borderColor: 'rgba(0, 123, 255, 1)', // Stronger border color
            borderWidth: 2,
            pointBackgroundColor: 'rgba(0, 123, 255, 1)',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 4, // Slightly smaller point radius
            pointHoverRadius: 6, // Larger radius on hover
          },
          {
            label: 'Predictions',
            data: predictionsData,
            backgroundColor: 'rgba(40, 167, 69, 0.1)', // Lighter background color
            borderColor: 'rgba(40, 167, 69, 1)', // Stronger border color
            borderWidth: 2,
            pointBackgroundColor: 'rgba(40, 167, 69, 1)',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: {
              color: 'rgba(200, 200, 200, 0.3)', // Lighter X-axis grid color
            },
            ticks: {
              color: '#666', // Slightly lighter tick color
              font: {
                size: 12, // Smaller font size
                family: 'Arial, sans-serif', // Use a standard font
              },
            },
            title: {
              display: true,
              text: 'Year',
              color: '#333',
              font: {
                size: 14,
                family: 'Arial, sans-serif',
                weight: 'bold', // Make the font bold
              },
              padding: {
                top: 20,
              },
            },
          },
          y: {
            grid: {
              color: 'rgba(200, 200, 200, 0.3)', // Lighter Y-axis grid color
            },
            ticks: {
              color: '#666', // Slightly lighter tick color
              font: {
                size: 12,
                family: 'Arial, sans-serif',
              },
            },
            title: {
              display: true,
              text: 'Turnover ($)',
              color: '#333',
              font: {
                size: 14,
                family: 'Arial, sans-serif',
                weight: 'bold',
              },
              padding: {
                bottom: 20,
              },
            },
          },
        },
        plugins: {
          legend: {
            display: true,
            labels: {
              color: '#333',
              font: {
                size: 14,
                family: 'Arial, sans-serif',
              },
            },
          },
          tooltip: {
            backgroundColor: '#333',
            titleColor: '#fff',
            bodyColor: '#fff',
            borderColor: '#666',
            borderWidth: 1,
            cornerRadius: 4, // Rounded corners for tooltips
          },
        },
      },
    });
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

  setInnerTab(tabName: string) {
    this.innerTab = tabName;
  }
}
