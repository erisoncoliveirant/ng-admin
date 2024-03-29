import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontSizeDirective } from './font-size.directive';
import { ScrollToDirective } from './scroll-to.directive';
import { AppDropdownDirective } from './dropdown.directive';
import { DropdownAnchorDirective } from './dropdown-anchor.directive';
import { DropdownLinkDirective } from './dropdown-link.directive';
import { SideNavToggleDirective } from './side-nav-toggle.directive';
import { HighlightDirective } from './highlight.directive';
import { AutoFocusDirective } from './auto-focus.directive';
import {
  SidenavHelperDirective,
  SidenavTogglerDirective,
} from './sidenav-helper /sidenav-helper.directive';

const directives = [
  AutoFocusDirective,
  FontSizeDirective,
  ScrollToDirective,
  AppDropdownDirective,
  DropdownAnchorDirective,
  DropdownLinkDirective,
  SideNavToggleDirective,
  SidenavHelperDirective,
  SidenavTogglerDirective,
  HighlightDirective,
];

@NgModule({
  imports: [CommonModule],
  declarations: directives,
  exports: directives,
})
export class SharedDirectivesModule {}
