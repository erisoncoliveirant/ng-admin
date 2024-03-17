import {
  Component,
  Input,
  OnInit,
  Renderer2,
  ViewChildren,
} from '@angular/core';
import { Notifications2Component } from '../notifications2/notifications2.component';
import { ThemeService } from '../../services/theme.service';
import { LayoutService } from '../../services/layout.service';
import { TranslateService } from '@ngx-translate/core';
import { JwtAuthService } from '../../services/auth/jwt-auth.service';

@Component({
  selector: 'app-header-side',
  templateUrl: './header-side.component.html',
  styleUrls: ['./header-side.component.scss'],
})
export class HeaderSideComponent implements OnInit {
  @Input() notificPanel: any;
  @ViewChildren(Notifications2Component) noti: any;
  public availableLangs = [
    {
      name: 'EN',
      code: 'en',
      flag: 'us',
    },
    {
      name: 'ES',
      code: 'es',
      flag: 'es',
    },
  ];
  currentLang = this.availableLangs[0];

  public themes: any;
  public layoutConf: any;
  constructor(
    private themeService: ThemeService,
    private layout: LayoutService,
    public translate: TranslateService,
    private renderer: Renderer2,
    public jwtAuth: JwtAuthService
  ) {}
  ngOnInit() {
    this.themes = this.themeService.themes;
    this.layoutConf = this.layout.layoutConf;
    this.translate.use(this.currentLang.code);
  }
  setLang(lng: any) {
    this.currentLang = lng;
    this.translate.use(lng.code);
  }
  changeTheme(theme: any) {
    // this.themeService.changeTheme(theme);
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

  toggleCollapse() {
    // compact --> full
    if (this.layoutConf.sidebarStyle === 'compact') {
      return this.layout.publishLayoutChange(
        {
          sidebarStyle: 'full',
          sidebarCompactToggle: false,
        },
        { transitionClass: true }
      );
    }

    // * --> compact
    this.layout.publishLayoutChange(
      {
        sidebarStyle: 'compact',
        sidebarCompactToggle: true,
      },
      { transitionClass: true }
    );
  }

  onSearch() {
    //   console.log(e)
  }
}
