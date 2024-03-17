import { Component, OnInit, Renderer2 } from '@angular/core';
import { ITheme, ThemeService } from '../../services/theme.service';
import { NavigationService } from '../../services/navigation.service';
import { LayoutService } from '../../services/layout.service';
import { CustomizerService } from '../../services/customizer.service';
import {LocalStoreService} from "../../services/local-store.service";

@Component({
  selector: 'app-customizer',
  templateUrl: './customizer.component.html',
  styleUrls: ['./customizer.component.scss'],
})
export class CustomizerComponent implements OnInit {
  isCustomizerOpen = false;
  viewMode: 'options' | 'json' = 'options';
  sidenavTypes = [
    {
      name: 'Default Menu',
      value: 'default-menu',
    },
    {
      name: 'Separator Menu',
      value: 'separator-menu',
    },
    {
      name: 'Icon Menu',
      value: 'icon-menu',
    },
  ];
  sidebarColors: any[] = [];
  topbarColors: any[] = [];

  layoutConf: any = {};
  selectedMenu = 'icon-menu';
  selectedLayout: string = 'top';
  isTopbarFixed = false;
  isFooterFixed = true;
  isRTL = false;
  themes: ITheme[] = [];
  perfectScrollbarEnabled = true;

  constructor(
    private navService: NavigationService,
    public layout: LayoutService,
    private themeService: ThemeService,
    public customizer: CustomizerService,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.layoutConf = this.layout.layoutConf;
    this.selectedLayout = this.layoutConf.navigationPos;
    this.isTopbarFixed = this.layoutConf.topbarFixed;
    this.isRTL = this.layoutConf.dir === 'rtl';
    this.themes = this.themeService.themes;
  }
  changeTheme(theme: any) {
    // this.themeService.changeTheme(theme);
    this.layout.publishLayoutChange({ matTheme: theme.name });
  }
  changeLayoutStyle(data: any) {
    this.layout.publishLayoutChange({ navigationPos: this.selectedLayout, footerFixed: true });
  }
  changeSidenav(data: any) {
    this.navService.publishNavigationChange(data.value);
  }
  toggleBreadcrumb(data: any) {
    this.layout.publishLayoutChange({ useBreadcrumb: data.checked });
  }
  toggleTopbarFixed(data: any) {
    this.layout.publishLayoutChange({ topbarFixed: data.checked });
  }
  toggleDir(data: any) {
    let dir = data.checked ? 'rtl' : 'ltr';
    this.layout.publishLayoutChange({ dir: dir });
  }
  tooglePerfectScrollbar(data: any) {
    this.layout.publishLayoutChange({
      perfectScrollbar: this.perfectScrollbarEnabled,
    });
  }
}
