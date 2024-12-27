import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-community-sidenav',
  templateUrl: './community-sidenav.component.html',
  styleUrls: ['./community-sidenav.component.css']
})
export class CommunitySidenavComponent implements OnInit {

  navigationChange: string = '';

  constructor(private router: Router) {
    router.events.subscribe((nav) => {
      if (nav instanceof NavigationEnd) {
        if (nav instanceof NavigationEnd) this.navigationChange = nav.url.split(';')[0] ? nav.url.split(';')[0] : nav.url;
      }
    })
  }

  ngOnInit(): void {
  }

}
