import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-experiments',
  templateUrl: './experiments.component.html',
  styleUrls: ['./experiments.component.css']
})
export class ExperimentsComponent implements OnInit {
  currentSection: string = 'Home'; // Default section
  currentPage: string = 'Experiments';
  recentActivity: string = '';
  announcements: string = '';
  resources: string = '';
  sectionContent: string = '';
  moreOptions: string[] = ['Option 1', 'Option 2', 'Option 3'];
  showMoreOptions: boolean = false;
  showDropdown: boolean = false;
  activeTab: string = 'joined';
  searchTerm: string = '';
  filterCriteria: string = '';
  selectAll: boolean = false;
  users: any[] = [
    { name: 'John Doe', role: 'Admin', team: 'Development', email: 'john@example.com', selected: false },
    { name: 'Jane Smith', role: 'User', team: 'Marketing', email: 'jane@example.com', selected: false },
    { name: 'Bob Johnson', role: 'Manager', team: 'Sales', email: 'bob@example.com', selected: false },
  ];
  filteredUsers: any[] = this.users;
  resourceLinks: { name: string, url: string }[] = [
    { name: 'Documentation', url: '#' },
    { name: 'Management API Docs', url: '#' },
    { name: 'Amplitude Academy', url: '#' }
  ];
  groupBy: string = 'project';
  selectedProject: string = '';
  filteredProjects: any[] = [];
  projects: any[] = [
    {
      name: 'ROT - Analytics',
      deployments: [
        { name: 'web', key: 'hidden' },
        { name: 'ios', key: 'hidden' },
        { name: 'android', key: 'hidden' }
      ]
    },
    {
      name: 'ROT - Experiments',
      deployments: [
        { name: 'teamchat_experiment', key: 'hidden' }
      ]
    },
    {
      name: 'Risk',
      deployments: [
        { name: 'web', key: 'hidden' },
        { name: 'ios', key: 'hidden' },
        { name: 'android', key: 'hidden' },
        { name: 'react-native', key: 'hidden' }
      ]
    }
  ];
  featureFlags: string = '';
  selectedAnalytics: string = 'ROT - Analytics';
  showAnalyticsDropdown: boolean = false;
  selectedExperiment: string = '';
  experiments: string[] = [];
  experimentAnalyticsDropdown: boolean = false;
  featureFlagsAnalyticsDropdown: boolean = false;

  analyticsOptions: string[] = [
    'ROT - Analytics',
    'ROT - Experiments',
    'Demand - Analytics',
    'Demand - Experiments',
    'Sales - Analytics',
    'Sales - Experiments',
    'Logistics & Optimization - Analytics',
    'Logistics & Optimization - Experiments',
    'Predictive Maintenance - Analytics',
    'Predictive Maintenance - Experiments',
    'Asset Management - Analytics',
    'Asset Management - Experiments'
  ];

  selectAnalytics(option: string) {
    this.selectedAnalytics = option;
    this.showAnalyticsDropdown = false;
  }

  ngOnInit() {
    this.setHomeContent();
  }

  setHomeContent() {
    this.currentSection = 'Home';
    this.recentActivity = 'Recent activity content goes here.';
    this.announcements = 'Announcements content goes here.';
    this.resources = 'Resources content goes here.';
  }

  selectSection(section: string) {
    this.currentSection = section.charAt(0).toUpperCase() + section.slice(1);
    this.experimentAnalyticsDropdown = false;
    this.featureFlagsAnalyticsDropdown = false;
    
    if (section.toLowerCase() === 'home') {
      this.setHomeContent();
    } else if (section.toLowerCase() === 'experiment') {
      this.currentPage = 'Experiments';
      this.currentSection = 'Experiment';
    } else if (section.toLowerCase() === 'managementapi') {
      this.currentSection = 'Management API';
    } else if (section.toLowerCase() === 'permissions') {
      this.currentSection = 'Permissions';
    } else if (section.toLowerCase() === 'deployments') {
      this.currentSection = 'Deployments';
      this.filterProjects();
    } else if (section.toLowerCase() === 'featureflags') {
      this.currentSection = 'Feature Flags';
      this.featureFlags = 'Feature Flags content goes here.';
    }
  }

  navigateTo(page: string) {
    this.currentPage = page;
    this.currentSection = 'Experiment';
  }

  toggleMoreOptions() {
    this.showMoreOptions = !this.showMoreOptions;
  }

  selectOption(option: string) {
    // Handle option selection
    this.showMoreOptions = false;
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  selectExperiment(experiment: string) {
    this.selectedExperiment = experiment;
    this.showDropdown = false;
  }

  showAllExperiments() {
    // This method is called when "More" is clicked
    // You can implement additional logic here if needed
    this.showDropdown = false;
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  filterUsers() {
    // Implement user filtering logic here
  }

  toggleSelectAll() {
    // Implement select all logic here
  }

  setGroupBy(group: string) {
    this.groupBy = group;
    this.filterProjects();
  }

  filterProjects() {
    if (this.selectedProject) {
      this.filteredProjects = this.projects.filter(project => project.name === this.selectedProject);
    } else {
      this.filteredProjects = this.projects;
    }
  }

  copyKey(key: string) {
    // Implement copy to clipboard functionality
    console.log('Copying key:', key);
  }

  getAllDeployments(): Array<{name: string, key: string, project: string}> {
    return this.projects.flatMap((project: {name: string, deployments: Array<{name: string, key: string}>}) => 
      project.deployments.map((deployment: {name: string, key: string}) => ({
        name: deployment.name,
        key: deployment.key,
        project: project.name
      }))
    );
  }

  toggleAnalyticsDropdown(section: string) {
    if (section === 'Experiment') {
      this.experimentAnalyticsDropdown = !this.experimentAnalyticsDropdown;
      this.featureFlagsAnalyticsDropdown = false;
    } else if (section === 'Feature Flags') {
      this.featureFlagsAnalyticsDropdown = !this.featureFlagsAnalyticsDropdown;
      this.experimentAnalyticsDropdown = false;
    }
  }

  @ViewChild('dropdownRef') dropdownRef!: ElementRef;

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    if (this.dropdownRef && !this.dropdownRef.nativeElement.contains(event.target)) {
      this.showAnalyticsDropdown = false;
    }
  }

}
