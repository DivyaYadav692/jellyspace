import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

@Component({
  selector: 'risk-assessment',
  templateUrl: './risk-assessment.component.html',
  styleUrls: ['./risk-assessment.component.scss'],
})
export class RiskAssessmentComponent implements OnInit, AfterViewInit {
  @ViewChild('riskChart') riskChart: ElementRef<HTMLCanvasElement> | undefined;

  public barChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y', // Horizontal bar chart
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          display: true,
        },
        stacked: true, // Enable stacking
        ticks: {
          font: {
            size: 14,
            family: 'Poppins', // Custom font for smooth text
            weight: '500',
          },
        },
      },
      y: {
        grid: {
          display: false,
        },
        stacked: true, // Enable stacking
        ticks: {
          font: {
            size: 14,
            family: 'Poppins', // Custom font for smooth text
            weight: '500',
          },
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            return ` ${tooltipItem.dataset.label}: ${tooltipItem.raw} `;
          },
        },
      },
      legend: {
        position: 'top',
        labels: {
          font: {
            family: 'Poppins', // Custom font for the legend
            size: 14,
          },
        },
      },
    },
  };

  public barChartData = {
    labels: [
      'Supply Disruptions',
      'Demand Variability',
      'Quality Issues',
      'Cyber Security',
      'Regulatory Compliance',
    ],
    datasets: [
      {
        label: 'Low Risk',
        data: [4, 3, 2, 1, 2],
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
      {
        label: 'Medium Risk',
        data: [3, 4, 2, 2, 3],
        backgroundColor: 'rgba(255, 206, 86, 0.5)',
      },
      {
        label: 'High Risk',
        data: [2, 3, 4, 3, 4],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  public barChartType: 'bar' = 'bar';
  public barChartLegend = true;

  constructor() {
    // Register Chart.js components
    Chart.register(
      BarController,
      BarElement,
      CategoryScale,
      LinearScale,
      Title,
      Tooltip,
      Legend
    );
  }

  ngOnInit(): void {
    // Initialization logic...
  }

  ngAfterViewInit(): void {
    // Initialize Bar Chart
    const canvas = this.riskChart?.nativeElement;
    const ctx = canvas?.getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: this.barChartType,
        data: this.barChartData,
        options: this.barChartOptions,
      });
    }
  }
}
