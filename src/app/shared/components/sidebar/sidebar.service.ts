import { Injectable } from '@angular/core';
import { SidebarComponent } from './sidebar.component';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  sidebarList: SidebarComponent[];
  constructor() {
    this.sidebarList = [];
  }

  setSidebar(name: any, sidebar: any): void {
    this.sidebarList[name] = sidebar;
  }

  getSidebar(name: any): any {
    return this.sidebarList[name];
  }

  removeSidebar(name: any) {
    if (!this.sidebarList[name]) {
      console.warn(`The sidebar with name '${name}' doesn't exist.`);
    }

    // remove sidebar
    delete this.sidebarList[name];
  }
}
