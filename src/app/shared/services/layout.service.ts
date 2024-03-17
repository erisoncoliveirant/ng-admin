import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ThemeService } from './theme.service';
import { getQueryParam } from '../helpers /url.helper';
import {LocalStoreService} from "./local-store.service";

export interface ILayoutConf {
  navigationPos?: string; // side, top
  sidebarStyle?: string; // full, compact, closed
  sidebarCompactToggle?: boolean; // sidebar expandable on hover
  sidebarColor?: string;
  dir?: string; // ltr, rtl
  isMobile?: boolean; // updated automatically
  useBreadcrumb?: boolean; // Breadcrumb enabled/disabled
  breadcrumb?: string; // simple, title
  topbarFixed?: boolean; // Fixed header
  footerFixed?: boolean; // Fixed Footer
  topbarColor?: string;
  footerColor?: string;
  matTheme?: string; // material theme. ng-blue, ng-navy, ng-dark-purple, ng-dark-pink
  perfectScrollbar?: boolean;
}
export interface ILayoutChangeOptions {
  duration?: number;
  transitionClass?: boolean;
}
interface IAdjustScreenOptions {
  browserEvent?: any;
  route?: string;
}

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  public layoutConf: ILayoutConf = {};
  layoutConfSubject = new BehaviorSubject<ILayoutConf>(this.layoutConf);
  layoutConf$ = this.layoutConfSubject.asObservable();
  public isMobile!: boolean;
  public currentRoute!: string;
  //   public fullWidthRoutes = ['shop'];
  public fullWidthRoutes = [];

  constructor(private themeService: ThemeService, private localStorage: LocalStoreService) {
    const preferences = Object.assign({
      navigationPos: 'side', // side, top
      sidebarStyle: 'full', // full, compact, closed
      sidebarColor: 'slate',
      sidebarCompactToggle: false, // applied when "sidebarStyle" is "compact"
      dir: 'ltr', // ltr, rtl
      useBreadcrumb: true,
      topbarFixed: false,
      footerFixed: false,
      topbarColor: 'white',
      footerColor: 'slate',
      matTheme: 'ng-navy', // ng-navy, ng-navy-dark
      breadcrumb: 'simple', // simple, title
      perfectScrollbar: true,
    }, JSON.parse(this.localStorage.getItem('preferences')));
    this.setAppLayout(preferences);
  }

  setAppLayout(layoutConf: ILayoutConf) {
    this.layoutConf = { ...this.layoutConf, ...layoutConf };
    this.applyTheme(this.layoutConf.matTheme);

    this.setLayoutFromQuery();
  }

  publishLayoutChange(lc: ILayoutConf, opt: ILayoutChangeOptions = {}) {
    if (this.layoutConf.matTheme !== lc.matTheme && lc.matTheme) {
      this.themeService.changeTheme(
        this.layoutConf.matTheme as string,
        lc.matTheme
      );
    }

    this.layoutConf = Object.assign(this.layoutConf, lc);
    this.layoutConfSubject.next(this.layoutConf);

    this.localStorage.setItem('preferences', JSON.stringify(this.layoutConf))
  }

  applyTheme(theme: any) {
    this.themeService.applyNgTheme(this.layoutConf.matTheme as string);
  }
  setLayoutFromQuery() {
    const layoutConfiString = getQueryParam('layout');
    const prevTheme: string = this.layoutConf.matTheme as string;
    try {
      this.layoutConf = JSON.parse(layoutConfiString);
      this.themeService.changeTheme(
        prevTheme,
        this.layoutConf.matTheme as string
      );
    } catch (e) {}
  }
  adjustLayout(options: IAdjustScreenOptions = {}) {
    let sidebarStyle: string;
    this.isMobile = this.isSm();
    this.currentRoute = options.route || this.currentRoute;
    sidebarStyle = this.isMobile ? 'closed' : 'full';

    if (this.currentRoute) {
      this.fullWidthRoutes.forEach((route) => {
        if (this.currentRoute.indexOf(route) !== -1) {
          sidebarStyle = 'closed';
        }
      });
    }

    this.publishLayoutChange({
      isMobile: this.isMobile,
      sidebarStyle,
    });
  }
  isSm() {
    return window.matchMedia(`(max-width: 959px)`).matches;
  }
}
