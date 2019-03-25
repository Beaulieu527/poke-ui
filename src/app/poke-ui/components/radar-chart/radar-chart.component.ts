import { Component, Input } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartTooltipItem, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-radar-chart',
  templateUrl: './radar-chart.component.html',
  styleUrls: ['./radar-chart.component.scss'],
})
export class RadarChartComponent {
  @Input() radarChartLabels: Label[];
  @Input() radarChartData: ChartDataSets[];
  barChartColors: any[] = [
    {
      backgroundColor: 'rgba(255,197,91,0.4)',
      borderColor: 'rgba(255,197,91,0.9)',
    },
  ];
  radarChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      display: false,
    },
    tooltips: {
      custom: (tooltip: any) => {
        if (!tooltip) {
          return;
        }
        tooltip.displayColors = false;
      },
      callbacks: {
        label: (tooltipItem: ChartTooltipItem) => {
          return tooltipItem.yLabel;
        },
        title: () => {
          return null;
        },
      },
    },
  };
  radarChartType: ChartType = 'radar';
}
