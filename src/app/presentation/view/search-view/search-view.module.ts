import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultPageComponent } from './result-page/result-page.component';
import {MatCardModule} from "@angular/material/card";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {SearchViewRoutingModule} from "./search-view-routing.module";

@NgModule({
  declarations: [ResultPageComponent],
  imports: [
    MatCardModule,
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    SearchViewRoutingModule
  ]
})
export class SearchViewModule {}
