import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { LayoutComponent } from './layout/layout.component';
import { ApiConvert } from './shared/helper/api-convert';


@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    LayoutComponent,
  ],
  imports: [
    BrowserModule
  ],
  exports: [],
  providers: [ApiConvert],
  bootstrap: [AppComponent]
})
export class AppModule { }
