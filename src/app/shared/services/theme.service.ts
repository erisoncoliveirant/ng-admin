import { DOCUMENT } from '@angular/common';
import {
  EventEmitter,
  Inject,
  Injectable,
  Renderer2,
  RendererFactory2,
} from '@angular/core';
import { getQueryParam } from '../helpers /url.helper';

export interface ITheme {
  name: string;
  baseColor?: string;
  isActive: boolean;
}

@Injectable()
export class ThemeService {
  public onThemeChange: EventEmitter<ITheme> = new EventEmitter();

  public themes: ITheme[] = [
    {
      name: 'ng-navy',
      baseColor: '#10174C',
      isActive: false,
    },
    {
      name: 'ng-navy-dark',
      baseColor: '#0081ff',
      isActive: false,
    },
  ];

  public activatedTheme?: ITheme;
  private renderer: Renderer2;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  applyNgTheme(themeName: string) {
    this.activatedTheme = this.themes.find(
      ({ name }) => name === themeName
    ) as ITheme;
    this.flipActiveFlag(themeName);
    this.setThemeFromQuery();
    this.renderer.addClass(this.document.body, themeName);
  }

  changeTheme(prevTheme: string, themeName: string) {
    this.renderer.removeClass(this.document.body, prevTheme);
    this.renderer.addClass(this.document.body, themeName);
    this.flipActiveFlag(themeName);
    this.onThemeChange.emit(this.activatedTheme);
  }

  flipActiveFlag(themeName: any) {
    this.themes.forEach((t: ITheme) => {
      t.isActive = false;
      if (t.name === themeName) {
        t.isActive = true;
        this.activatedTheme = t;
      }
    });
  }

  setThemeFromQuery() {
    const themeStr = getQueryParam('theme');
    try {
      this.activatedTheme = JSON.parse(themeStr);
      this.flipActiveFlag(this.activatedTheme?.name);
    } catch (e) {}
  }
}
