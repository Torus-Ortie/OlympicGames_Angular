import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    onClick : (event, active) => {
      this.router.navigateByUrl(this.getLabel(active[0].index));
    }
  };
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.pieChartLabels = this.chartLabels ? this.chartLabels : [];
    this.pieChartDatasets = [{ data: this.chartData ? this.chartData : [] }];
  }

  getLabel(index: number): string {
    return this.pieChartLabels[index];
  }
}
