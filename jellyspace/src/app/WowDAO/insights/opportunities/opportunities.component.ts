import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import {
  Chart,
  RadarController,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartConfiguration,
} from 'chart.js';

@Component({
  selector: 'opportunities',
  templateUrl: './opportunities.component.html',
  styleUrls: ['./opportunities.component.scss'],
})
export class OpportunitiesComponent implements OnInit, AfterViewInit {
  @ViewChild('riskChart') riskChart: ElementRef<HTMLCanvasElement> | undefined;

  public radarChartConfig: ChartConfiguration<'radar'> = {
    type: 'radar',
    data: {
      labels: [
        'International Market Expansion',
        'Cost Savings',
        'Customer Satisfaction',
        'Innovation',
        'Sustainability',
        'Cost Cuttings',
        'Expenditure',
      ],
      datasets: [
        {
          label: 'Collaborative Partnerships',
          data: [65, 59, 90, 81, 56, 55, 40],
          fill: true,
          backgroundColor: 'rgba(255, 99, 132, 0.3)', // Slightly more transparent for a softer look
          borderColor: 'rgb(255, 99, 132)',
          pointBackgroundColor: 'rgb(255, 99, 132)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(255, 99, 132)',
        },
        {
          label: 'Technology Advancements',
          data: [28, 48, 40, 19, 96, 27, 100],
          fill: true,
          backgroundColor: 'rgba(54, 162, 235, 0.3)', // Slightly more transparent for a softer look
          borderColor: 'rgb(54, 162, 235)',
          pointBackgroundColor: 'rgb(54, 162, 235)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(54, 162, 235)',
        },
        {
          label: 'Sustainability Initiatives',
          data: [35, 70, 45, 80, 56, 60, 35],
          fill: true,
          backgroundColor: 'rgba(75, 192, 192, 0.3)', // Greenish background
          borderColor: 'rgb(75, 192, 192)',
          pointBackgroundColor: 'rgb(75, 192, 192)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(75, 192, 192)',
        },
        {
          label: 'International Market Expansion',
          data: [45, 35, 60, 70, 50, 40, 75],
          fill: true,
          backgroundColor: 'rgba(153, 102, 255, 0.3)', // Purple background
          borderColor: 'rgb(153, 102, 255)',
          pointBackgroundColor: 'rgb(153, 102, 255)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(153, 102, 255)',
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false, // Allows the chart to resize with its container
      elements: {
        line: {
          borderWidth: 3, // Keep the lines bold for emphasis
        },
      },
      scales: {
        r: {
          angleLines: {
            display: false,
          },
          suggestedMin: 50,
          suggestedMax: 100,
          ticks: {
            backdropColor: '#f8f9fa', // Match the background for a cleaner look
            font: {
              family: 'Poppins', // Smooth, modern font
              size: 12,
            },
          },
        },
      },
      plugins: {
        title: {
          display: true,
          text: 'Opportunities Radar',
          font: {
            family: 'Poppins',
            size: 16,
          },
          padding: {
            top: 10,
            bottom: 20,
          },
        },
        tooltip: {
          callbacks: {
            label: function (tooltipItem: any) {
              return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
            },
            afterLabel: function () {
              return 'Hover to explore details';
            },
          },
        },
        legend: {
          position: 'top',
          labels: {
            font: {
              family: 'Poppins', // Smooth, modern font
              size: 14,
            },
          },
        },
      },
    },
  };

  constructor() {
    Chart.register(
      RadarController,
      PointElement,
      LinearScale,
      Title,
      Tooltip,
      Legend,
      Filler
    );
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const canvas = this.riskChart?.nativeElement;
    const ctx = canvas?.getContext('2d');
    if (ctx) {
      new Chart(ctx, this.radarChartConfig);
    }
  }
}
