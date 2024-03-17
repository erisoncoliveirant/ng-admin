import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface IMenuItem {
  type?: 'link' | 'dropDown' | 'icon' | 'separator' | 'extLink';
  name?: string;
  state?: string;
  icon?: string;
  svgIcon?: string;
  tooltip?: string;
  disabled?: boolean;
  sub?: IChildItem[];
  badges?: IBadge[];
}
interface IChildItem {
  type?: string;
  name?: string;
  state?: string;
  icon?: string;
  svgIcon?: string;
  sub?: IChildItem[];
}
interface IBadge {
  color: string;
  value: string;
}

@Injectable()
export class NavigationService {
  iconMenu: IMenuItem[] = [
    {
      name: 'DASHBOARD',
      state: 'dashboard/analytics',
      type: 'link',
      icon: 'dashboard',
    },
    {
      name: 'FORMS',
      type: 'separator',
    },
    {
      name: 'BASIC',
      state: 'forms/basic',
      type: 'link',
      icon: 'description',
    },
    {
      name: 'EDITOR',
      state: 'forms/editor',
      type: 'link',
      icon: 'subject',
    },
    {
      name: 'UPLOAD',
      state: 'forms/upload',
      type: 'link',
      icon: 'upload',
    },
    {
      name: 'WIZARD',
      state: 'forms/wizard',
      type: 'link',
      icon: 'grain',
    },
    {
      name: 'PAGES',
      type: 'separator',
    },
    {
      name: 'SESSIONS',
      type: 'dropDown',
      tooltip: 'Pages',
      icon: 'view_carousel',
      sub: [
        { name: 'SIGNUP', state: 'sessions/signup' },
        { name: 'SIGNIN', state: 'sessions/signin' },
        { name: 'NOTFOUND', state: 'sessions/404' },
      ],
    },
    {
      name: 'OTHERS',
      type: 'dropDown',
      tooltip: 'Others',
      icon: 'blur_on',
      sub: [
        { name: 'GALLERY', state: 'others/gallery' },
        { name: 'PRICINGS', state: 'others/pricing' },
        { name: 'USERS', state: 'others/users' },
        { name: 'BLANK', state: 'others/blank' },
      ],
    },
  ];

  iconTypeMenuTitle = 'Frequently Accessed';
  menuItems$ = new BehaviorSubject<IMenuItem[]>(this.iconMenu);
  menuItem$ = this.menuItems$.asObservable();
  constructor() {}
  publishNavigationChange(menuType: string) {
    // switch (menuType) {
    //   case 'separator-menu':
    //     this.menuItems.next(this.separatorMenu);
    //     break;
    //   case 'icon-menu':
    //     this.menuItems.next(this.iconMenu);
    //     break;
    //   default:
    //     this.menuItems.next(this.plainMenu);
    // }
  }
}
