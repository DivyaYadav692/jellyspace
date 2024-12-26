import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-supply-chain-kpis',
  templateUrl: './supply-chain-kpis.component.html',
  styleUrls: ['./supply-chain-kpis.component.css']
})
export class SupplyChainKpisComponent implements OnInit {
  events = [
    {
      event: '$autocapture',
      time: "Sep 26, '22 6:43 PM",
      userId: '5964775521235897225'
    },
    // Add more event data
  ];

  constructor() { }

  ngOnInit(): void {
    // Initialize any required data
  }

}
