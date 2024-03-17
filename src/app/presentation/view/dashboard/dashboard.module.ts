import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedPipesModule } from 'src/app/pipes/shared-pipes.module';
import { RouterModule } from '@angular/router';
import { DashboardRoutes } from './dashboard.routing';
import { SharedMaterialModule } from 'src/app/shared/shared-material.module';
import { AnalyticsComponent } from './analytics/analytics.component';

@NgModule({
  declarations: [AnalyticsComponent],
  imports: [
    CommonModule,
    SharedMaterialModule,
    SharedPipesModule,
    RouterModule.forChild(DashboardRoutes),
  ],
})
export class DashboardModule {}
