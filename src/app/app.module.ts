import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './material';

import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReturnCalendarComponent } from './components/return-calendar/return-calendar.component';
import { BookflightComponent } from './components/bookflight/bookflight.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AirportsComponent } from './components/airports/airports.component';
import { HttpClientModule } from '@angular/common/http';

import { FilterPipe } from './pipes/filter.pipe';
import { SelectClassComponent } from './components/select-class/select-class.component';
import { DepartureItemsComponent } from './components/departure-items/departure-items.component';

@NgModule({
  declarations: [
    AppComponent,
    ReturnCalendarComponent,
    BookflightComponent,
    AirportsComponent,
    FilterPipe,
    SelectClassComponent,
    DepartureItemsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgbModule.forRoot(),

    FormsModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,

    HttpClientModule
  ],
  entryComponents:[ReturnCalendarComponent,AirportsComponent],
  providers: [],
  bootstrap: [AppComponent],
  exports:[
    FilterPipe
  ]

})
export class AppModule { }
