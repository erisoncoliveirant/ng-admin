import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit,
} from '@angular/core';
import {
  NavigationEnd,
  ResolveEnd,
  ResolveStart,
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router,
} from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription, filter } from 'rxjs';
import { JwtAuthService } from 'src/app/shared/services/auth/jwt-auth.service';
import { LayoutService } from 'src/app/shared/services/layout.service';
import { ThemeService } from 'src/app/shared/services/theme.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
})
export class AdminLayoutComponent implements OnInit, AfterViewInit {
  public isModuleLoading: boolean = false;
  private moduleLoaderSub: Subscription | undefined;
  private layoutConfSub: Subscription | undefined;
  private routerEventSub: Subscription;

  public scrollConfig = {};
  public layoutConf: any = {};
  public adminContainerClasses: any = {};

  constructor(
    private router: Router,
    public translate: TranslateService,
    public themeService: ThemeService,
    private layout: LayoutService,
    private cdr: ChangeDetectorRef,
    private jwtAuth: JwtAuthService
  ) {
    this.jwtAuth.checkTokenIsValid().subscribe();

    this.routerEventSub = router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((routeChange: any) => {
        this.layout.adjustLayout({ route: routeChange.url });
        this.scrollToTop();
      });

    const browserLang: string = translate.getBrowserLang() as string;
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
  }
  ngAfterViewInit(): void {}

  ngOnInit() {
    this.layoutConfSub = this.layout.layoutConf$.subscribe((layoutConf) => {
      this.layoutConf = layoutConf;

      this.adminContainerClasses = this.updateAdminContainerClasses(
        this.layoutConf
      );
      this.cdr.markForCheck();
    });

    this.moduleLoaderSub = this.router.events.subscribe((event) => {
      if (
        event instanceof RouteConfigLoadStart ||
        event instanceof ResolveStart
      ) {
        this.isModuleLoading = true;
      }
      if (event instanceof RouteConfigLoadEnd || event instanceof ResolveEnd) {
        this.isModuleLoading = false;
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.layout.adjustLayout(event);
  }
  scrollToTop() {
    if (document) {
      setTimeout(() => {
        let element;
        if (this.layoutConf.topbarFixed) {
          element = <HTMLElement>(
            document.querySelector('#rightside-content-hold')
          );
        } else {
          element = <HTMLElement>document.querySelector('#main-content-wrap');
        }
        element.scrollTop = 0;
      });
    }
  }

  ngOnDestroy() {
    if (this.moduleLoaderSub) {
      this.moduleLoaderSub.unsubscribe();
    }
    if (this.layoutConfSub) {
      this.layoutConfSub.unsubscribe();
    }
    if (this.routerEventSub) {
      this.routerEventSub.unsubscribe();
    }
  }
  closeSidebar() {
    this.layout.publishLayoutChange({
      sidebarStyle: 'closed',
    });
  }

  sidebarMouseenter(event: any) {
    if (this.layoutConf.sidebarStyle === 'compact') {
      this.layout.publishLayoutChange(
        { sidebarStyle: 'full' },
        { transitionClass: true }
      );
    }
  }

  sidebarMouseleave(event: any) {
    if (
      this.layoutConf.sidebarStyle === 'full' &&
      this.layoutConf.sidebarCompactToggle
    ) {
      this.layout.publishLayoutChange(
        { sidebarStyle: 'compact' },
        { transitionClass: true }
      );
    }
  }

  updateAdminContainerClasses(layoutConf: any) {
    return {
      'navigation-top': layoutConf.navigationPos === 'top',
      'sidebar-full': layoutConf.sidebarStyle === 'full',
      'sidebar-compact':
        layoutConf.sidebarStyle === 'compact' &&
        layoutConf.navigationPos === 'side',
      'compact-toggle-active': layoutConf.sidebarCompactToggle,
      'sidebar-compact-big':
        layoutConf.sidebarStyle === 'compact-big' &&
        layoutConf.navigationPos === 'side',
      'sidebar-opened':
        layoutConf.sidebarStyle !== 'closed' &&
        layoutConf.navigationPos === 'side',
      'sidebar-closed': layoutConf.sidebarStyle === 'closed',
      'fixed-topbar':
        layoutConf.topbarFixed && layoutConf.navigationPos === 'side',
    };
  }
}
