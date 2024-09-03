import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

/**
 * Manage bar graph component.
 *
 * @remarks
 * This component use the {@link ng2-chats | ng2-chats}.
 *
 * @call <app-bar-graph [chartData]="chartData" [chartLabels]="chartLabels"/>
 * @param chartData - A list of numbers corresponding to the data to display
 * @param chartLabels - A list of strings corresponding to labels to display
 * @returns A bar graph
 *
 */
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