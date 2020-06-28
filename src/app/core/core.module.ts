import { NgModule } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { BaseFormComponent } from './base-components/base-form/base-form.component';
import { ButtonLoaderModule } from './libs/button-loader/button-loader.module';
import { LoadingIndicatorModule } from './libs/loading-indicator/loading-indicator.module';

@NgModule({
  declarations: [BaseFormComponent],
  imports: [
    HttpClientModule,
    RouterModule,
    ButtonLoaderModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    LoadingIndicatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ToastrModule.forRoot()
  ],
  exports: [
    HttpClientModule,
    BrowserAnimationsModule,
    ButtonLoaderModule,
    ReactiveFormsModule,
    LoadingIndicatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ToastrModule
  ]
})
export class CoreModule { }
