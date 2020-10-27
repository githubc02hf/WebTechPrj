import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MotorcycleComponent} from './motorcycle-search/motorcycle.component';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatFormField, MatFormFieldControl, MatFormFieldModule} from '@angular/material/form-field';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSliderModule} from '@angular/material/slider';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatCardModule,
    MatTableModule,
    MatGridListModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatSliderModule
  ],
  declarations: [
    AppComponent,
    MotorcycleComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
