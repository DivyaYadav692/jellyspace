import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AppService } from '../app.service';



@Component({
  selector: 'app-account-handler-details',
  templateUrl: './account-handler-details.component.html',
  styleUrls: ['./account-handler-details.component.css'],
})
export class AccountHandlerDetailsComponent implements OnInit {
   hoveredBox: string | null = null;

  redirectTo(path: string): void {
    this.router.navigate([path]);
  }
  openExternalLink(url: string): void {
    window.open(url, '_blank');
  }
  isPaidMember: boolean = false;
  selectedFiles!: FileList;
  imagePath: any;
  fileData: any;
  url: any;
  imgShow: boolean = true;
  uploading: boolean = false; // New flag to track upload status
  uploadSuccess: boolean = false; // Flag to indicate successful upload
  emailError: string = ''; // Flag to store email error message
  isFreeTrial: boolean = false;
  isFreemium : boolean = false;
  isPlus : boolean = false;
  isProfessional :boolean = false;
  isCustom : boolean = false;
  companyName: any;

  constructor(
    private route: ActivatedRoute,
    private service: AppService,
    private router: Router,
    private storage: AngularFireStorage
  ) {}

  public fieldTextType1: boolean = false;
  public fieldTextType2: boolean = false;
  public pWord: string = ''; // For Password field
  public confirmPWord: string = ''; // For Confirm Password field
  managerList: any = [];
  bidFlag: boolean = false;
  sub: boolean  = false;
  collabratorFlag: boolean = false;

  public fName: any;
  public lName: any;
  public eMail: string = '';
  public mobileNo: any;
  public title: any;
  public file: any;

  toggleFieldTextType1() {
    this.fieldTextType1 = !this.fieldTextType1;
  }
  toggleFieldTextType2() {
    this.fieldTextType2 = !this.fieldTextType2;
  }

  ngOnInit(): void {
    this.fName = localStorage.getItem('otherFName') || '';
    this.lName = localStorage.getItem('otherLName') || '';
    this.eMail = localStorage.getItem('othereMail') || ''; // Ensure eMail is always a string
    this.mobileNo = localStorage.getItem('otherMobileNo') || '';
    this.title = localStorage.getItem('otherTitle') || '';
    this.file = localStorage.getItem('imagepath') || '';
    this.managerList = [
      { label: 'Yes', value: '0' },
      { label: 'No', value: '1' },
    ];
    this.route.queryParams.subscribe((params) => {
      console.log('params ', params['q']);
      if (!this.companyName) {
        this.companyName = params['q'];
      }
    });

    // Check if the user started a free trial
    this.isFreeTrial = localStorage.getItem('startFreeTrial') === 'true';
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  onEmailChange(event: any) {
    this.eMail = event.target.value;
    if (!this.validateEmail(this.eMail)) {
      this.emailError = 'Invalid email address';
    } else {
      this.emailError = '';
    }
  }

  selectBidManager(item: any) {
    this.collabratorFlag = item === 'Yes';
  }
  selectedOption: string = ''; // Stores the currently selected option

selectOption(option: string): void {
  this.selectedOption = option; // Set the selected option
  console.log('Selected option:', this.selectedOption);
}

  onChangeCollabrator(eve: any) {
    this.bidFlag = eve.target.checked;
  }
  openPreemium(){
    window.open('https://buy.stripe.com/5kA000ehZflOaAM8ww','_self')
  }
  openPlus(){
    window.open('https://buy.stripe.com/5kA144fm35LegZa4gi','_self')
  }
  openProfessional(){
    window.open('https://buy.stripe.com/9AQfYYehZa1u38keUV','_self');
  }
  openCustom(){
    window.open('mailto:ams@jellyspace.io','_blank')
  }
  onChangeSubscription(eve: any) {
    this.sub = eve.target.checked;
  }

  selectImage(event: any) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      this.uploading = true; // Set the flag to true while uploading
      this.uploadSuccess = false; // Reset upload success flag
      const filePath = `companyImages/${selectedFile.name}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, selectedFile);

      // Monitor the upload process
      task.snapshotChanges().subscribe(
        (snapshot) => {
          if (snapshot?.state === 'success') {
            fileRef.getDownloadURL().subscribe(
              (downloadURL) => {
                this.url = downloadURL;
                this.imgShow = false;
                this.uploading = false;
                this.uploadSuccess = true;
              },
              (error) => {
                console.error('Error getting download URL:', error);
                this.uploading = false;
                this.uploadSuccess = false;
              }
            );
          }
        },
        (error) => {
          console.error('Error uploading file:', error);
          this.uploading = false;
          this.uploadSuccess = false;
        }
      );

      const reader = new FileReader();
      reader.onload = (_event) => {
        this.url = reader.result;
      };
      reader.readAsDataURL(selectedFile);
      this.fileData = selectedFile;
    }
  }

  nextClick() {
    if (this.uploading) {
      alert('Please wait until the image upload is complete.');
      return;
    }

    if (!this.uploadSuccess) {
      alert('Please upload a valid image.');
      return;
    }

    if (!this.validateEmail(this.eMail)) {
      alert('Please enter a valid email address.');
      return;
    }

    const params = {
      email: this.eMail,
      name: `${this.fName} ${this.lName}`,
      fileUrl: this.url,
    };

    // Logging the information to console
    console.log('Navigating to email verification with data:', params);

    // Store information in localStorage for use in EmailVerificationComponent
    localStorage.setItem('nameOTP', `${this.fName} ${this.lName}`);
    localStorage.setItem('otherFName', this.fName);
    localStorage.setItem('otherLName', this.lName);
    localStorage.setItem('othereMail', this.eMail);
    localStorage.setItem('registerEmail', this.eMail);
    localStorage.setItem('otherPWord', this.pWord);
    localStorage.setItem('otherTitle', this.title);
    localStorage.setItem('otherMobileNo', this.mobileNo);
    localStorage.setItem('otherImage', this.url);

    // Call sendOTP and navigate if successful
    this.service.sendOTP(params).subscribe((data: any) => {
      if (data.status === true) {
        this.router.navigate(['email-verification']);
      } else {
        alert(data.message);
      }
    });
    // this.router.navigate(['/pricing']);
  }
  nextClick1(){
    window.open('/pricing', '_blank');
    this.nextClick();
  }
  previousRoute() {
    if (!this.isFreeTrial) {
      let params = { q: this.companyName };
      this.router.navigate(['register-identification'], {
        queryParams: params,
        skipLocationChange: false,
      });
    }
  }
}