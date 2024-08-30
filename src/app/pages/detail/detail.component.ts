import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BarGraphComponent } from 'src/app/core/graphs/bar-graph/bar-graph.component';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [BarGraphComponent],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit{
    // test
    public graphTitle: string = 'Italy';
    public chartLabels: string[] = ['2012', '2016', '2020'];
    public chartData: number[] = [30, 30, 40];
    //
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const faceSnapId = this.route.snapshot.params['countryId'];

  }

  getCountrybyId(countryId: string) {
    
  }
}
