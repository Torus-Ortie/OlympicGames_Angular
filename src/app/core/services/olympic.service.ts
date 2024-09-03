import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map, take, tap } from 'rxjs/operators';
import { OlympicCountry } from '../models/Olympic';
import { ErrorHandlerService } from './error-handler.service';

/**
 * Manage all function about observables.
 *
 * @param country - The country to observe
 * @returns Customize observables
 *
 */
@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<OlympicCountry[]>([]);

  constructor(private http: HttpClient, private errorHandler: ErrorHandlerService) {}

  loadInitialData(): Observable<OlympicCountry[]> {
    return this.http.get<OlympicCountry[]>(this.olympicUrl).pipe(
      take(1),
      tap((olympicCountries) => {
        this.olympics$.next(olympicCountries);
      }),
      catchError((error, caught) => {
        this.olympics$.next([]);
        return this.errorHandler.handle(error, caught);
      })
    );
  }

  getOlympics(): Observable<OlympicCountry[]> {
    return this.olympics$.asObservable();
  }

  getAllMedalsPerCountry(): Observable<{countries: string[]; medals: number[]}> {
    return this.olympics$.pipe(
      map((olympics) => { 
        let totalMedalsList: number[] = [];
        let countriesList: string[] = [];
        olympics.forEach((olympic) => {
          let totalMedals: number = 0;
          countriesList.push(olympic.country);
          olympic.participations.forEach((participation) => totalMedals += participation.medalsCount);
          totalMedalsList.push(totalMedals);
        });
        return {countries: countriesList, medals: totalMedalsList};
      })
    );
  }

  getStatsOlympics(): Observable<{ngOfCountry: number; nbOfJOs: number}> {
    return this.olympics$.pipe(
      map((olympics) => { 
        let ngOfCountry: number = 0;
        let nbOfJOsList: number[] = [];
        olympics.forEach((olympic) => {
          ngOfCountry ++;
          nbOfJOsList.push(olympic.participations.length);
        });
        return {ngOfCountry: ngOfCountry, nbOfJOs: Math.max(...nbOfJOsList)};
      })
    );
  }

  getCountryData(country: string): Observable<{years: string[]; medals: number[]}> {
    return this.olympics$.pipe(
      map((olympics) => { 
        let yearsList: string[] = [];
        let medalsList: number[] = [];
        olympics.forEach((olympic) => {
          if (olympic.country === country) {
            olympic.participations.forEach((participation) => {
              yearsList.push(participation.year.toString());
              medalsList.push(participation.medalsCount);
            });
          }
        });
        return {years: yearsList, medals: medalsList};
      })
    );
  }

  getStatsCountry(country: string): Observable<{ ngOfEntries: number; ngOfMedals: number; nbOfAthletes: number; }> {
    return this.olympics$.pipe(
      map((olympics) => { 
        let ngOfEntries: number = 0;
        let ngOfMedals: number = 0;
        let nbOfAthletes: number = 0;
        olympics.forEach((olympic) => {
          if (olympic.country === country) {
            ngOfEntries = olympic.participations.length;
            olympic.participations.forEach((participation) => {
              ngOfMedals += participation.medalsCount;
              nbOfAthletes += participation.athleteCount;
            });
          }
        });
        return {ngOfEntries: ngOfEntries, ngOfMedals: ngOfMedals, nbOfAthletes: nbOfAthletes};
      })
    );
  }
}
