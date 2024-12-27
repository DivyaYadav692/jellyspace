import { Component, OnInit, OnDestroy } from '@angular/core';
import { Chart, registerables } from 'chart.js';

// Register Chart.js components
Chart.register(...registerables);

@Component({
  selector: 'threats',
  templateUrl: './threats.component.html',
  styleUrls: ['./threats.component.scss'],
})
export class ThreatsComponent implements OnInit, OnDestroy {
  private chart: Chart | undefined;

  ngOnInit(): void {
    this.createChart();
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy(); // Clean up the chart when the component is destroyed
    }
  }

  private createChart(): void {
    const ctx = document.getElementById('myBarChart') as HTMLCanvasElement;

    if (ctx) {
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
          ],
          datasets: [
            {
              label: 'Revenue',
              data: [65000, 59000, 80000, 81000, 56000, 55000, 40000], // Adjusted data values for dollar representation
              backgroundColor: 'rgba(54, 162, 235, 0.6)', // Slightly more transparent for smoothness
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(54, 162, 235, 0.8)', // Darker on hover for emphasis
              hoverBorderColor: 'rgba(54, 162, 235, 1)',
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false, // Allows chart to adapt to container size
          scales: {
            x: {
              grid: {
                display: false, // Remove gridlines for a cleaner look
              },
              ticks: {
                font: {
                  size: 14, // Larger font for readability
                  family: "'Poppins', sans-serif", // Smooth, modern font
                },
              },
            },
            y: {
              suggestedMin: 0, // Start y-axis at zero
              grid: {
                color: 'rgba(200, 200, 200, 0.2)', // Light gridlines for a soft look
              },
              ticks: {
                font: {
                  size: 14, // Larger font for readability
                  family: "'Poppins', sans-serif", // Smooth, modern font
                },
                callback: function (tickValue: string | number) {
                  // Ensure tickValue is a number before formatting
                  const value =
                    typeof tickValue === 'number'
                      ? tickValue
                      : parseFloat(tickValue);
                  return '$' + value.toLocaleString(); // Format y-axis values as dollars
                },
              },
            },
          },
          plugins: {
            legend: {
              position: 'top', // Move legend to the top for better visibility
              labels: {
                font: {
                  size: 16, // Larger font for the legend
                  family: "'Poppins', sans-serif", // Smooth, modern font
                },
              },
            },
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.7)', // Darker tooltip background for contrast
              titleFont: {
                size: 16,
                family: "'Poppins', sans-serif", // Smooth, modern font
              },
              bodyFont: {
                size: 14,
                family: "'Poppins', sans-serif", // Smooth, modern font
              },
              callbacks: {
                label: function (tooltipItem: any) {
                  return `${
                    tooltipItem.dataset.label
                  }: $${tooltipItem.raw.toLocaleString()}`; // Format tooltip values as dollars
                },
              },
            },
          },
        },
      });
    }
  }
}
