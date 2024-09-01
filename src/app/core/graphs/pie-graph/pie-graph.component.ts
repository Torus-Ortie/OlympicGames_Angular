import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-pie-graph',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './pie-graph.component.html',
  styleUrl: './pie-graph.component.scss'
})
export class PieGraphComponent implements OnInit {
  @Input() chartLabels!: string[];
  @Input() chartData!: number[];

  public pieChartLabels!: string[];
  public pieChartDatasets!: { data: number[]; }[];
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor() {}

  ngOnInit(): void {
    this.pieChartLabels = this.chartLabels ? this.chartLabels : ['France', 'Italy', 'Espagne'];
    this.pieChartDatasets = [{ data: this.chartData ? this.chartData : [40, 80, 60] }];
  }
}
