import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Observable, of } from 'rxjs';
import { PieGraphComponent } from 'src/app/core/graphs/pie-graph/pie-graph.component';
import { OlympicCountry } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe, RouterLink, PieGraphComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<OlympicCountry[]> = of([]);
  private countryId!: string;
  private olympicDatas!: OlympicCountry[];
  // test
  public chartLabels: string[] = ['France', 'Italy', 'Espagne'];
  public chartData: number[] = [40, 80, 60];
  //

  constructor(private olympicService: OlympicService, private router: Router) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.olympicDatas = this.olympicService.getOlympicsData();
  }

 onCountrySelect(): void {
  this.router.navigateByUrl(this.countryId); // <button (click)="onViewFaceSnap()">VIEW</button> sur les click du graph ou légende ?
 }
}
