import { Component, OnInit } from '@angular/core';
declare var google: any;

@Component({
  selector: 'donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.css'],
})
export class DonutChartComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(this.drawChart.bind(this));
  }

  drawChart() {
    var data = google.visualization.arrayToDataTable([
      ['Task', 'Hours per Day'],
      ['Networking', 11],
      ['Production', 2],
      ['Manufacturing', 2],
    ]);

    var options = {
      title: 'Revenue Sources',
      pieHole: .68,
      colors: ['#66BB6A', '#FFA726', '#EF5350', '#42A5F5', '#AB47BC'],
      pieSliceTextStyle: {
        color: 'white',
      },
      legend: {
        position: 'bottom',
        textStyle: { fontSize: 14 },
      },
      chartArea: {
        left: '5%',
        top: '5%',
        width: '90%',
        height: '90%',
      },
      animation: {
        startup: true,
        easing: 'inAndOut',
        duration: 1000,
      },
    };

    var chart = new google.visualization.PieChart(
      document.getElementById('donutchart')
    );
    chart.draw(data, options);
  }
}
