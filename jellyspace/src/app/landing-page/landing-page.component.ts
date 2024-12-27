import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  _openCommunityTab() {
    const communityUrl = `${environment.frontendUrl}/community`; 
    window.open(communityUrl, '_blank');
  }
}
