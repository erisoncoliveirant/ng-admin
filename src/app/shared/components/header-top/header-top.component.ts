import { Component, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';
import { LayoutService } from '../../services/layout.service';
import { NavigationService } from '../../services/navigation.service';
import { ITheme, ThemeService } from '../../services/theme.service';
import { TranslateService } from '@ngx-translate/core';
import { JwtAuthService } from '../../services/auth/jwt-auth.service';

@Component({
  selector: 'app-header-top',
  templateUrl: './header-top.component.html',
  styleUrls: ['./header-top.component.scss'],
})
export class HeaderTopComponent implements OnInit, OnDestroy {
  layoutConf: any;
  menuItems: any;
  menuItemSub!: Subscription;
  matxThemes: any[] = [];
  currentLang = 'en';
  availableLangs = [
    {
      name: 'English',
      code: 'en',
    },
    {
      name: 'Spanish',
      code: 'es',
    },
  ];
  @Input() notificPanel: any;
  constructor(
    private layout: LayoutService,
    private navService: NavigationService,
    public themeService: ThemeService,
    public translate: TranslateService,
    private renderer: Renderer2,
    public jwtAuth: JwtAuthService
  ) {}

  ngOnInit() {
    this.layoutConf = this.layout.layoutConf$;
    this.matxThemes = this.themeService.themes;
    this.menuItemSub = this.navService.menuItems$.subscribe((res): any => {
      res = res.filter(
        (item) => item.type !== 'icon' && item.type !== 'separator'
      );
      let limit = 4;
      let mainItems: any[] = res.slice(0, limit);
      if (res.length <= limit) {
        return (this.menuItems = mainItems);
      }
      let subItems: any[] = res.slice(limit, res.length - 1);
      mainItems.push({
        name: 'More',
        type: 'dropDown',
        tooltip: 'More',
        icon: 'more_horiz',
        sub: subItems,
      });
      this.menuItems = mainItems;
    });
  }
  ngOnDestroy() {
    this.menuItemSub.unsubscribe();
  }
  setLang() {
    this.translate.use(this.currentLang);
  }
  changeTheme(theme: ITheme) {
    this.layout.publishLayoutChange({ matTheme: theme.name });
  }
  toggleNotific() {
    this.notificPanel.toggle();
  }
  toggleSidenav() {
    if (this.layoutConf.sidebarStyle === 'closed') {
      return this.layout.publishLayoutChange({
        sidebarStyle: 'full',
      });
    }
    this.layout.publishLayoutChange({
      sidebarStyle: 'closed',
    });
  }
}
