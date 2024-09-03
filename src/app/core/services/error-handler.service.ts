import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OlympicCountry } from '../models/Olympic';

/**
 * Manage error inside observables.
 *
 * @param error - The error throw during the subscription to the observable
 * @param caught - The observable observed
 * @returns Log the error in the console
 *
 */
@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  handle(error: Error, caught: Observable<OlympicCountry[]>): Observable<OlympicCountry[]> {
    console.error('An error occurred:', error);
    return caught;
  }

  constructor() { }
}
