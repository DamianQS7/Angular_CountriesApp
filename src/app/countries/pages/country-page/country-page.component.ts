import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-country-page',
  templateUrl: './country-page.component.html',
  styles: ``
})
export class CountryPageComponent implements OnInit{
  
  public country?: Country;
  public translationCodes: string[] = ['ara', 'deu', 'fra', 'ita', 'jpn', 'nld', 'por', 'rus', 'spa', 'kor'];

  constructor(
    private activatedRoute: ActivatedRoute,
    private countriesService: CountriesService,
    private router: Router
  ) {}
  
  private loadCountryOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap((params) => this.countriesService.searchCountryByCode(params['code']))
      )
      .subscribe( country => {
        if (!country) return this.router.navigateByUrl('');

        return this.country = country;
      });
  }
  
  ngOnInit(): void {
    this.loadCountryOnInit();
  }
}
