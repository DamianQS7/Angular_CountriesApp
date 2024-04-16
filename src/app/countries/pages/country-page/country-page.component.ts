import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'countries-country-page',
  templateUrl: './country-page.component.html',
  styles: ``
})
export class CountryPageComponent implements OnInit{
  
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
        if (!country) {
          this.router.navigateByUrl('');
        }
        console.log(country);
      });
  }
  
  ngOnInit(): void {
    this.loadCountryOnInit();
  }
}
