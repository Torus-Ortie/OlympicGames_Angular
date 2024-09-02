import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable, of } from 'rxjs';
import { BarGraphComponent } from 'src/app/core/graphs/bar-graph/bar-graph.component';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [AsyncPipe, RouterLink, BarGraphComponent, CommonModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit{
  public graphTitle: string = '';
  public countryData$: Observable<{years: string[]; medals: number[]}> = of({years: [], medals: []});
  public countryStats$: Observable<{ ngOfEntries: number; ngOfMedals: number; nbOfAthletes: number; }> = of({ ngOfEntries: 0, ngOfMedals: 0, nbOfAthletes: 0 });
  
  constructor(private olympicService: OlympicService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const country = this.route.snapshot.params['country'];
    this.graphTitle = country;
    this.countryData$ = this.olympicService.getCountryData(country);
    this.countryStats$ = this.olympicService.getStatsCountry(country);
  }

  homeBack() {
    this.router.navigateByUrl('');
  }
}
