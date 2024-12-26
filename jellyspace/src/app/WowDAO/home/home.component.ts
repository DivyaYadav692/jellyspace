import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  HostListener,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalConfig, NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from '../../app.service';
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('mychart') mychart: ElementRef<HTMLCanvasElement> | undefined;
  @ViewChild('myPieChart') myPieChart:
    | ElementRef<HTMLCanvasElement>
    | undefined;
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

  canvas: any;
  ctx: any;

  private activeButton: string = '';

  isChartOptionsVisible = false;
  chartOptions = [
    { name: 'Segmentation', icon: 'assets/segmentation-icon.png', description: 'Understand user behavior by counting and filtering events' },
    { name: 'Funnel', icon: 'assets/funnel-icon.png', description: 'Understand conversion and drop-off for key events' },
    { name: 'Data Table', icon: 'assets/data-table-icon.png', description: 'Compare and break down events and metrics in a single view' },
    { name: 'Retention', icon: 'assets/retention-icon.png', description: 'Analyze how often users return to your product' },
    { name: 'User Sessions', icon: 'assets/user-sessions-icon.png', description: 'Understand user behavior by counting and filtering sessions' },
    { name: 'Journeys', icon: 'assets/journeys-icon.png', description: 'Analyze how users flow through your product' },
    { name: 'Experiment Results', icon: 'assets/experiment-results-icon.png', description: 'Find statistically significant outcomes of an A/B test' },
    { name: 'View Chart Templates', icon: 'assets/chart-templates-icon.png', description: 'Leverage preconfigured charts for key insights' }
  ];

  @ViewChild('createDropdown') createDropdown!: ElementRef;
  @ViewChild('chartButton') chartButton!: ElementRef;
  
  isDropdownOpen = false;
  isChartMenuVisible = false;

  showAdditionalCharts = false;

  constructor(
    private modalService: NgbModal,
    config: NgbModalConfig,
    private service: AppService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    config.backdrop = 'static';
    config.keyboard = false;

    // Register Chart.js components
    Chart.register(
      LineController,
      LineElement,
      PointElement,
      LinearScale,
      Title,
      CategoryScale,
      ArcElement,
      Tooltip,
      Legend
    );
  }

  ngOnInit(): void {
    this.loginEmail = localStorage.getItem('userEmail');
    this.getProjectsByEmail();
    this.getProjectsData();
    this.getBidDetails();
    this.getCurrentBidDetails();
    this.loginUserDetails();
    this.findRupeesId = this.findRupeesList[0]?.label;
  }

  ngAfterViewInit(): void {
    this.canvas = this.mychart?.nativeElement;
    this.ctx = this.canvas?.getContext('2d');
    if (this.ctx) {
      // Initialize Line Chart
      new Chart(this.ctx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [
            {
              label: 'Earnings',
              data: [5000, 20000, 20000, 40000, 30000, 50000],
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 2,
              pointBackgroundColor: 'rgba(75, 192, 192, 1)',
              pointBorderColor: '#fff',
              pointBorderWidth: 1,
              pointRadius: 5,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          elements: {
            line: {
              tension: 0.4,
            },
            point: {
              radius: 5,
            },
          },
          scales: {
            x: {
              beginAtZero: true,
              grid: {
                display: false,
              },
              ticks: {
                font: {
                  size: 14,
                },
              },
            },
            y: {
              beginAtZero: true,
              grid: {},
              ticks: {
                callback: function (value: string | number) {
                  return typeof value === 'number' ? `$${value} ` : value;
                },
                font: {
                  size: 14,
                },
              },
            },
          },
          plugins: {
            tooltip: {
              enabled: false, // Disable default tooltip
              external: function (context: any) {
                let tooltipEl = document.getElementById('chartjs-tooltip');

                if (!tooltipEl) {
                  tooltipEl = document.createElement('div');
                  tooltipEl.id = 'chartjs-tooltip';
                  document.body.appendChild(tooltipEl);
                }

                if (context.tooltip.opacity === 0) {
                  tooltipEl.style.opacity = '0';
                  return;
                }

                tooltipEl.style.opacity = '1';
                tooltipEl.style.position = 'absolute';
                tooltipEl.style.background = 'rgba(0, 0, 0, 0.7)';
                tooltipEl.style.color = '#fff';
                tooltipEl.style.padding = '10px';
                tooltipEl.style.borderRadius = '3px';
                tooltipEl.style.pointerEvents = 'none';
                tooltipEl.style.fontSize = '14px';
                tooltipEl.style.fontFamily = 'Arial, sans-serif';
                tooltipEl.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';

                const chart = context.chart;
                const position = chart.canvas.getBoundingClientRect();
                tooltipEl.style.left = `${
                  position.left + context.tooltip.caretX + window.scrollX
                }px`;
                tooltipEl.style.top = `${
                  position.top + context.tooltip.caretY + window.scrollY
                }px`;

                let innerHtml = '<table>';
                const month = context.tooltip.title[0];
                context.tooltip.body.forEach((bodyItem: any) => {
                  innerHtml += `
                  <tr>
                    <td>${month}</td>
                  </tr>
                  <tr>
                    <td>${bodyItem.lines[0]}</td>
                  </tr>
                `;
                });
                innerHtml += '</table>';

                tooltipEl.innerHTML = innerHtml;
              },
            },
          },
        },
      });

      // Initialize Pie Chart
      this.canvas = this.myPieChart?.nativeElement;
      this.ctx = this.canvas?.getContext('2d');
      if (this.ctx) {
        new Chart(this.ctx, {
          type: 'pie',
          data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [
              {
                label: 'Dataset 1',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              tooltip: {
                callbacks: {
                  label: function (tooltipItem: any) {
                    return ` ${tooltipItem.label}: ${tooltipItem.raw} `;
                  },
                },
              },
            },
          },
        });
      }
    }
  }

  openForm() {
    this.chatbox = true;
  }

  closeForm() {
    this.chatbox = false;
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
    this.findRupeesId = this.findRupeesList[0]?.label;
    this.writeBidDescription = '';
    this.minAmount = 0;
    this.maxAmountVal = 0;
    this.featuredFlag = false;
    this.urgentFlag = false;
    this.standardFlag = false;
    this.privateFlag = false;
    this.sealedFlag = false;
    this.fulltimeFlag = false;
  }

  getBidDetails() {
    const params = {
      projectEmail: localStorage.getItem('userEmail'),
    };
    this.service.getBidInitDetails(params).subscribe((res: any) => {
      this.bidProjectDetailsList = res.data;
    });
  }

  getCurrentBidDetails() {
    const params = {
      userEmail: localStorage.getItem('userEmail'),
    };
    this.service.getCurrentBidDetailsList(params).subscribe((res: any) => {
      const list = res.data;
      this.currentBidProjectDetailsList = list.filter(
        (obj: any) => obj.status === 'pending'
      );
      this.accepttBidProjectDetailsList = list.filter(
        (obj: any) => obj.status === 'accepted'
      );
    });
  }

  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === 'by pressing ESC') {
      return 'by pressing ESC';
    } else if (reason === 'by clicking on a backdrop') {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  viewProfileSCM() {
    this.router.navigate(['scm-profile']);
  }

  viewProfile1() {
    this.router.navigate(['company-profile'], {
      queryParams: {},
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
      if (data.status === true) {
        localStorage.setItem('userEmail', data.data.email);
        localStorage.setItem('userId', data.userId);
        this.accountType = data.data.accountType;
        this.email = data.data.email;
        this.fname = data.data.firstName;
        this.lname = data.data.lastName;
        this.skillList = data.data.skills;
        this.image = data.data.image;
      } else {
        alert(data.message);
      }
    });
  }
  onSupplyChainKPIsClick() {
    // Add functionality for Supply Chain KPIs button
  }

  onDashboardTemplatesClick() {
    // Add functionality for Dashboard Templates button
  }

  onCreateChartClick() {
    // Add functionality for Create Chart button
  }

  // Method to check if a button is active
  isActive(button: string): boolean {
    return this.activeButton === button;
  }

  // Method for Create button click
  onCreateClick() {
    this.activeButton = 'create';
    // Additional logic for Create button can be added here
  }

  // Method for Workflows button click
  onWorkflowsClick() {
    this.activeButton = 'workflows';
    // Additional logic for Workflows button can be added here
  }

  // Method for Experiments button click
  onExperimentsClick() {
    this.activeButton = 'experiments';
    // Additional logic for Experiments button can be added here
  }

  // Method to navigate to the Workflows component
  navigateToWorkflows() {
    this.router.navigate(['/workflows']); // Navigate to the Workflows route
  }

  navigateToExperiments() {
    // Logic to navigate to the experiments page
    // For example, using Angular Router:
    this.router.navigate(['/experiments']);
  }

  onOptionClick(option: string) {
    console.log(`Clicked on ${option}`);
    // Add your logic for handling each option click
  }

  showChartOptions(event: Event) {
    event.stopPropagation(); // Prevent event bubbling
    this.isChartMenuVisible = true;
  }

  onChartOptionClick(chartType: string) {
    console.log(`Selected chart type: ${chartType}`);
    // Don't close the menus automatically
  }

  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    // Check if click is outside both dropdowns
    const isClickInside = 
      this.createDropdown?.nativeElement.contains(event.target) ||
      (this.isChartMenuVisible && event.target instanceof Element && 
       event.target.closest('.submenu'));

    if (!isClickInside) {
      this.isDropdownOpen = false;
      this.isChartMenuVisible = false;
    }
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleAdditionalCharts(event: Event) {
    event.stopPropagation(); // Prevent event bubbling
    this.showAdditionalCharts = !this.showAdditionalCharts;
  }
}
