import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChildren,
} from '@angular/core';
import { AutoFocusDirective } from '../../directives/auto-focus.directive';
import { UntypedFormControl } from '@angular/forms';
import { Subscription, debounceTime } from 'rxjs';
import { SearchService } from '../search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-input-over',
  templateUrl: './search-input-over.component.html',
  styleUrls: ['./search-input-over.component.scss'],
})
export class SearchInputOverComponent implements OnInit, OnDestroy {
  isOpen: boolean | undefined;
  @ViewChildren(AutoFocusDirective) searchInput: any;
  @Input('resultPage') resultPage: string | undefined;
  @Input('placeholder') placeholder: string = 'Search here';
  @Output('search') search = new EventEmitter();
  searchCtrl = new UntypedFormControl();
  searchCtrlSub: Subscription | undefined;
  constructor(private searchService: SearchService, private router: Router) {}

  ngOnInit() {
    this.searchCtrl.valueChanges.pipe(debounceTime(200)).subscribe((value) => {
      this.search.emit(value);
      this.searchService.searchTerm.next(value);
    });
  }

  ngOnDestroy() {
    if (this.searchCtrlSub) {
      this.searchCtrlSub.unsubscribe();
    }
  }
  navigateToResult() {
    if (this.resultPage) {
      this.router.navigateByUrl(this.resultPage);
    }
  }
  open() {
    this.isOpen = true;
    this.navigateToResult();

    setTimeout(() => {
      this.searchInput.first.focus();
    });
  }
  close() {
    this.isOpen = false;
  }

  clear() {
    this.searchCtrl.setValue('')
  }
  toggle() {
    this.isOpen = !this.isOpen;
  }
}
