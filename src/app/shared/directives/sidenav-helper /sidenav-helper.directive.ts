import {
  Directive,
  OnInit,
  OnDestroy,
  HostBinding,
  Input,
  HostListener,
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatchMediaService } from '../../services/match-media.service';
import { SidenavHelperService } from './sidenav-helper.service';
import { MatSidenav } from '@angular/material/sidenav';
import { MediaObserver } from '@angular/flex-layout';

@Directive({
  selector: '[ngSidenavHelper]',
})
export class SidenavHelperDirective implements OnInit, OnDestroy {
  @HostBinding('class.is-open')
  isOpen: boolean;

  @Input('sidenavHelper')
  id: string | number | undefined;

  @Input('isOpen')
  isOpenBreakpoint: string | string[] = [];

  private unsubscribeAll: Subject<any>;

  constructor(
    private matchMediaService: MatchMediaService,
    private sidenavHelperService: SidenavHelperService,
    private matSidenav: MatSidenav,
    private mediaObserver: MediaObserver
  ) {
    // Set the default value
    this.isOpen = true;

    this.unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.sidenavHelperService.setSidenav(Number(this.id), this.matSidenav);

    if (this.mediaObserver.isActive(this.isOpenBreakpoint)) {
      this.isOpen = true;
      this.matSidenav.mode = 'side';
      this.matSidenav.toggle(true);
    } else {
      this.isOpen = false;
      this.matSidenav.mode = 'over';
      this.matSidenav.toggle(false);
    }

    this.matchMediaService.onMediaChange
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(() => {
        if (this.mediaObserver.isActive(this.isOpenBreakpoint)) {
          this.isOpen = true;
          this.matSidenav.mode = 'side';
          this.matSidenav.toggle(true);
        } else {
          this.isOpen = false;
          this.matSidenav.mode = 'over';
          this.matSidenav.toggle(false);
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(1);
    this.unsubscribeAll.complete();
  }
}

@Directive({
  selector: '[ngSidenavToggler]',
})
export class SidenavTogglerDirective {
  @Input('sidenavToggler')
  public id: any;

  constructor(private sidenavHelperService: SidenavHelperService) {}

  @HostListener('click')
  onClick() {
    // console.log(this.matxSidenavHelperService.getSidenav(this.id))
    this.sidenavHelperService.getSidenav(this.id).toggle();
  }
}
