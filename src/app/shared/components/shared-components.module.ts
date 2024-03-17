import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedMaterialModule } from '../shared-material.module';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PerfectScrollbarModule } from './perfect-scrollbar/perfect-scrollbar.module';
import { SearchModule } from '../search/search.module';
import { SharedPipesModule } from '../../pipes/shared-pipes.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedDirectivesModule } from '../directives/shared-directives.module';

// ONLY REQUIRED FOR **SIDE** NAVIGATION LAYOUT
import { HeaderSideComponent } from './header-side/header-side.component';
import { SidebarSideComponent } from './sidebar-side/sidebar-side.component';

// ONLY REQUIRED FOR **TOP** NAVIGATION LAYOUT
import { HeaderTopComponent } from './header-top/header-top.component';
import { SidebarTopComponent } from './sidebar-top/sidebar-top.component';

// ONLY FOR DEMO
import { CustomizerComponent } from './customizer/customizer.component';

// ALWAYS REQUIRED
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { FooterComponent } from './footer/footer.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { AppConfirmComponent } from '../services/app-confirm/app-confirm.component';
import { AppLoaderComponent } from '../services/app-loader/app-loader.component';
import { ButtonLoadingComponent } from './button-loading/button-loading.component';
import {
  SidebarComponent,
  SidebarTogglerDirective,
} from './sidebar/sidebar.component';
import { BottomSheetShareComponent } from './bottom-sheet-share/bottom-sheet-share.component';
// import { ExampleViewerComponent } from './example-viewer/example-viewer.component';
// import { ExampleViewerTemplateComponent } from './example-viewer-template/example-viewer-template.component';
import { Notifications2Component } from './notifications2/notifications2.component';

const components = [
  HeaderTopComponent,
  SidebarTopComponent,
  SidenavComponent,
  NotificationsComponent,
  SidebarSideComponent,
  HeaderSideComponent,
  AdminLayoutComponent,
  AuthLayoutComponent,
  BreadcrumbComponent,
  AppConfirmComponent,
  AppLoaderComponent,
  Notifications2Component,
  CustomizerComponent,
  ButtonLoadingComponent,
  SidebarComponent,
  FooterComponent,
  SidebarTogglerDirective,
  BottomSheetShareComponent,
  // ExampleViewerComponent,
  // ExampleViewerTemplateComponent,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TranslateModule,
    FlexLayoutModule,
    PerfectScrollbarModule,
    SearchModule,
    SharedPipesModule,
    SharedDirectivesModule,
    SharedMaterialModule,
  ],
  declarations: components,
  // entryComponents: [AppComfirmComponent, AppLoaderComponent, BottomSheetShareComponent],
  exports: components,
})
export class SharedComponentsModule {}
