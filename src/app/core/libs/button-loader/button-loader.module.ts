import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonLoaderDirective } from './directives/button-loader.directive';
import { ButtonLoaderService } from './services/button-loader.service';

@NgModule({
  declarations: [ButtonLoaderDirective],
  imports: [
    CommonModule
  ],
  exports: [
    ButtonLoaderDirective
  ],
  providers: [
    ButtonLoaderService
  ]
})
export class ButtonLoaderModule { }
