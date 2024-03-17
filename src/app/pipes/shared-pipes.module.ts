import { NgModule } from '@angular/core';
import { ExcerptPipe } from './excerpt.pipe';
import { GetValueByKeyPipe } from './get-value-by-key.pipe';
import { RelativeTimePipe } from './relative-time.pipe';
import { CommonModule } from '@angular/common';

const pipes = [RelativeTimePipe, ExcerptPipe, GetValueByKeyPipe];

@NgModule({
  imports: [CommonModule],
  declarations: pipes,
  exports: pipes,
})
export class SharedPipesModule {}
