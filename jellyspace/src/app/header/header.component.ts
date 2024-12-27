import { Component, AfterViewInit, EventEmitter, Output, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSidebar = new EventEmitter<void>();

  public showSearch = false;

  constructor() { }

  ngOnInit(): void {
  }

}
