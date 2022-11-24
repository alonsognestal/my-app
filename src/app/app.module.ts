import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxCsvParserModule } from 'ngx-csv-parser';
import { AppRoutingModule } from './app-routing.module';
import { GoogleMapsModule } from '@angular/google-maps'

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxCsvParserModule,
    GoogleMapsModule,
  ],
  providers: [],
  declarations: [ 
    AppComponent 
  ],
  bootstrap: [ 
    AppComponent 
  ]
})
export class AppModule {}
