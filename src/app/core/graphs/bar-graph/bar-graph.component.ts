import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-bar-graph',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './bar-graph.component.html',
  styleUrl: './bar-graph.component.scss'
})
export class BarGraphComponent implements OnInit {
  @Input() chartLabels!: string[];
  @Input() chartData!: number[];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: this.chartLabels,
    datasets: [ { 
      data: this.chartData 
    } ]
  };
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };
  public barChartPlugins = [];
  public barChartLegend = false;

  constructor() {}

  ngOnInit(): void {
    this.barChartData.labels = this.chartLabels;
    this.barChartData.datasets = [{ data: this.chartData}];
  }
}