import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

import { AppComponent } from './app.component';
import { ClientComponent } from './clients/client/client.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientComponent
  ],
  exports: [
    //MatSelectModule
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
