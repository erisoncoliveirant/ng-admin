import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TranslateModule } from '@ngx-translate/core';
import { SharedMaterialModule } from 'src/app/shared/shared-material.module';
import { SessionsRoutes } from './sessions.routing';
import { PerfectScrollbarModule } from 'src/app/shared/components/perfect-scrollbar/perfect-scrollbar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    ReactiveFormsModule,
    SharedMaterialModule,
    FlexLayoutModule,
    PerfectScrollbarModule,
    RouterModule.forChild(SessionsRoutes),
  ],
  declarations: [SigninComponent, SignupComponent, NotFoundComponent],
})
export class SessionsModule {}
