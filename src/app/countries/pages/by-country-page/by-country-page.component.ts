import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'countries-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent implements OnInit{

  public countries: Country[] = [];
  public isLoading: boolean = false;
  public inputInitialValue: string = '';
  private filterBy: string = 'name';

  constructor(private countriesService: CountriesService) {}
  
  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCountries.countries;
    this.inputInitialValue = this.countriesService.cacheStore.byCountries.term;
  }

  public searchByCountryName(country: string): void {
    this.isLoading = true;
    this.countriesService.getCountriesRequest(this.filterBy, country)
      .subscribe(countries => {
        this.countries = countries;
        this.isLoading = false;
        console.log(this.countries);
      });  
  }
}
