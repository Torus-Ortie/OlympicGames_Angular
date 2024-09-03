import { AsyncPipe, CommonModule  } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable, of } from 'rxjs';
import { PieGraphComponent } from 'src/app/core/graphs/pie-graph/pie-graph.component';
import { OlympicCountry } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

/**
 * The home page of the application.
 *
 * @returns A web page with details about countries and their result during the last JOs
 *
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe, RouterLink, PieGraphComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<OlympicCountry[]> = of([]);
  public olympicsMedalsPerCountry$: Observable<{countries: string[]; medals: number[]}> = of({countries: [], medals: []});
  public olympicsStats$: Observable<{ ngOfCountry: number; nbOfJOs: number; }> = of({ngOfCountry: 0, nbOfJOs: 0});
  
  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.olympicsMedalsPerCountry$ = this.olympicService.getAllMedalsPerCountry();
    this.olympicsStats$ = this.olympicService.getStatsOlympics();
  }

}
