import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Country } from '../interfaces/country';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';
  
  constructor(private httpClient: HttpClient) { }

  public searchByCapital(searchTerm: string): Observable<Country[]> {

    const byCapitalUrl = `${this.apiUrl}/capital/${searchTerm}`;

    return this.httpClient
      .get<Country[]>(byCapitalUrl)
      .pipe(
        catchError(() => of([]))
      );
  }

  public searchCountryByCode(code: string): Observable<Country | null> {

    const byCountryCodeUrl = `${this.apiUrl}/alpha/${code}`;

    return this.httpClient
      .get<Country[]>(byCountryCodeUrl)
      .pipe(
        map(countries => countries.length > 0 ? countries[0] : null),
        catchError(() => of(null))
      );
  }

  public searchByCountryName(searchTerm: string): Observable<Country[]> {

    const byCountryNameUrl = `${this.apiUrl}/name/${searchTerm}`;

    return this.httpClient
      .get<Country[]>(byCountryNameUrl)
      .pipe(
        catchError(() => of([]))
      );
  }

  public searchByRegion(searchTerm: string): Observable<Country[]> {

    const byRegionUrl = `${this.apiUrl}/region/${searchTerm}`;

    return this.httpClient
      .get<Country[]>(byRegionUrl)
      .pipe(
        catchError(() => of([]))
      );
  }


}
