import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './shared/components/layouts/auth-layout/auth-layout.component';
import { AdminLayoutComponent } from './shared/components/layouts/admin-layout/admin-layout.component';
import { AuthGuard } from './shared/guards/auth.guard';

export const rootRouterConfig: Routes = [
  {
    path: '',
    redirectTo: 'dashboard/analytics',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'sessions',
        loadChildren: () =>
          import('./presentation/view/sessions/sessions.module').then(
            (m) => m.SessionsModule
          ),
        data: { title: 'Session' },
      },
    ],
  },
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./presentation/view/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
        data: { title: 'Dashboard', breadcrumb: 'DASHBOARD' },
      },
      /*
      {
        path: 'others',
        loadChildren: () =>
          import('./presentation/others/others.module').then((m) => m.OthersModule),
        data: { title: 'Others', breadcrumb: 'OTHERS' },
      },
      {
        path: 'forms',
        loadChildren: () =>
          import('./presentation/forms/forms.module').then((m) => m.AppFormsModule),
        data: { title: 'Forms', breadcrumb: 'FORMS' },
      },
      */
      {
        path: 'search',
        loadChildren: () =>
          import('./presentation/view/search-view/search-view.module').then(
            (m) => m.SearchViewModule
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'sessions/404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(rootRouterConfig)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
