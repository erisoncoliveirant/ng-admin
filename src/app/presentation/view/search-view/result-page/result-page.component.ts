import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {SearchService} from "../../../../shared/search/search.service";
import {CountryService} from "../country.service";

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.scss']
})
export class ResultPageComponent implements OnInit, OnDestroy {
  countries$: Observable<any[]> | undefined;
  searchTermSub: Subscription | undefined;

  constructor(
    public searchService: SearchService,
    public countryService: CountryService
  ) {}

  ngOnInit() {
    this.searchTermSub = this.searchService.searchTerm$.subscribe(term => {
      if (!term) return;
      this.countries$ = this.countryService.getCountries(term);
    });
  }

  ngOnDestroy() {
    if (this.searchTermSub) {
      this.searchTermSub.unsubscribe();
    }
  }
}
