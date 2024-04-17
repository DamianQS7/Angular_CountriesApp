import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';
import { count } from 'rxjs';

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent implements OnInit {
  public countries: Country[] = [];
  public isLoading: boolean = false;
  public inputInitialValue: string = '';
  private filterBy: string = 'capital';

  constructor(private countriesService: CountriesService) {}

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCapital.countries;
    this.inputInitialValue = this.countriesService.cacheStore.byCapital.term;
  }

  public searchByCapital(capital: string): void {
    this.inputInitialValue = capital;
    this.isLoading = true;
    this.countriesService.getCountriesRequest(this.filterBy, capital)
      .subscribe(countries => {
        this.countries = countries;
        this.isLoading = false;
      }); 

  }
}
