import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root',
})
export class SidenavHelperService {
  sidenavList: MatSidenav[];

  constructor() {
    this.sidenavList = [];
  }

  setSidenav(id: number | string, sidenav: MatSidenav): void {
    this.sidenavList[Number(id)] = sidenav;
  }

  getSidenav(id: number): any {
    return this.sidenavList[id];
  }
}
