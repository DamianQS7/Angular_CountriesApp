import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Country } from '../interfaces/country';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';
  public cacheStore: CacheStore = {
    byCapital: { term: '', countries: [] },
    byCountries: { term: '', countries: [] },
    byRegion: { region: '', countries: [] }
  }
  
  constructor(private httpClient: HttpClient) {
    this.getFromLocalStorage();
   }

  private saveToLocalStorage(): void {
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
  }

  private getFromLocalStorage(): void {
    const cacheStore = localStorage.getItem('cacheStore');
    if (cacheStore) {
      this.cacheStore = JSON.parse(cacheStore);
    }
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

  public getCountriesRequest(filterBy: string, searchTerm: string): Observable<Country[]> {

    const url: string = `${this.apiUrl}/${filterBy}/${searchTerm}`;
    return this.httpClient
      .get<Country[]>(url)
      .pipe(
        catchError(() => of([])),
        tap( countries => 
          filterBy === 'capital' ? this.cacheStore.byCapital = { term: searchTerm, countries }
          : filterBy === 'name' ? this.cacheStore.byCountries = { term: searchTerm, countries }
          : this.cacheStore.byRegion = { region: searchTerm as Region, countries }  
        ),
        tap(() => this.saveToLocalStorage())
      );
  };
}
