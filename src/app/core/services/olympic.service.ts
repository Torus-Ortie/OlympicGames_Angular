import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map, take, tap } from 'rxjs/operators';
import { OlympicCountry } from '../models/Olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<OlympicCountry[]>([]);
  public olympics!: OlympicCountry[];

  constructor(private http: HttpClient) {}

  loadInitialData(): Observable<OlympicCountry[]> {
    return this.http.get<OlympicCountry[]>(this.olympicUrl).pipe(
      take(1),
      tap((olympicCountries) => {
        this.olympics$.next(olympicCountries);
      }),
      catchError((error, caught) => {
        // TODO: improve error handling
        console.error(error);
        // can be useful to end loading state and let the user know something went wrong
        this.olympics$.next([]);
        return caught;
      })
    );
  }

  getOlympics(): Observable<OlympicCountry[]> {
    return this.olympics$.asObservable();
  }

  getAllCountries(): Observable<string[]> {
    return this.olympics$.pipe(
      map((olympics) => { 
        let countriesList: string[] = [];
        olympics.forEach((olympic) => countriesList.push(olympic.country))
        return countriesList;
      })
    );
  }

  getAllMedalsPerCountry(): Observable<{countries: string[]; medals: number[]}> {
    return this.olympics$.pipe(
      map((olympics) => { 
        let totalMedalsList: number[] = [];
        let countriesList: string[] = [];
        olympics.forEach((olympic) => {
          let totalMedals: number = 0;
          countriesList.push(olympic.country)
          olympic.participations.forEach((participation) => totalMedals += participation.medalsCount)
          totalMedalsList.push(totalMedals)
      })
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
          nbOfJOsList.push(olympic.participations.length)
        })
        return {ngOfCountry: ngOfCountry, nbOfJOs: Math.max(...nbOfJOsList)};
      })
    );
  }
}
