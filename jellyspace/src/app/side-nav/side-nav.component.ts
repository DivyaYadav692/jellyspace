import { Component, Input, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import Swal from 'sweetalert2';
import { AppService } from '../app.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
})
export class SideNavComponent implements OnInit {
  sideNavBar: boolean = false;
  @Input('sideButton') sideButton: any;
  @Input('accountType') accountType: any;
  navigationChange: string = '';

  constructor(private router: Router, private service: AppService) {
    router.events.subscribe((nav) => {
      if (nav instanceof NavigationEnd) {
        if (nav instanceof NavigationEnd)
          this.navigationChange = nav.url.split(';')[0]
            ? nav.url.split(';')[0]
            : nav.url;
      }
    });
  }

  ngOnInit(): void {
    this.accountType = localStorage.getItem('loginType');
    console.log('accountType' + localStorage.getItem('loginType'));
  }

  _openCommunityTab() {
    const communityUrl = `${environment.frontendUrl}/community`;
    window.open(communityUrl, '_blank');
  }
  menuIcon() {
    this.sideNavBar = true;
    this.sideButton = !this.sideButton;
  }
  deleteUser() {
    Swal.fire({
      text: 'Do you  delete your account?',
      icon: 'error',
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      confirmButtonColor: '#4CAF50',
      cancelButtonColor: 'black',
    }).then((result) => {
      if (result.isConfirmed) {
        const params = {
          email: localStorage.getItem('userEmail'),
        };
        this.service.deleteUser(params).subscribe((res: any) => {
          if (res.status === true) {
            this.router.navigate(['signin']);
          } else {
            alert(res.message);
          }
        });
      }
    });
  }
}
