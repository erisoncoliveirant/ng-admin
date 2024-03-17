import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchInputOverComponent } from './search-input-over/search-input-over.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SharedDirectivesModule } from '../directives/shared-directives.module';

@NgModule({
  declarations: [SearchInputOverComponent],
  exports: [SearchInputOverComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    SharedDirectivesModule,
  ],
})
export class SearchModule {}
