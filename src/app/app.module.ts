import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatNativeDateModule} from '@angular/material/core';
//import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
// import {
//   MatButtonModule,
//   MatFormFieldModule,
//   MatInputModule,
//   MatRippleModule
// } from '@angular/material';

import { AppComponent } from './app.component';
import { ClientComponent } from './clients/client/client.component';
import { SearchComponent } from './search/search.component';
import { SelectComponent } from './select/select.component';
import { ContractorComponent } from './contractor/contractor.component';
import { DeliveryComponent } from './delivery/delivery.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientComponent,
    SearchComponent,
    SelectComponent,
    ContractorComponent,
    DeliveryComponent
  ],
  exports: [
    MatSelectModule,
    BrowserAnimationsModule,
    MatNativeDateModule
  ],
  imports: [
    BrowserAnimationsModule,
    MatNativeDateModule,
    MatSelectModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.error(err));
