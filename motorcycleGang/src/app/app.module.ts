import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MotorcycleComponent} from './motorcycle/container/motorcycle-search/motorcycle.component';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule, MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatSliderModule} from '@angular/material/slider';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {HomeComponent} from './core/home/home.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {SidebarComponent} from './core/sidebar/sidebar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {AppointmentComponent } from './appointment/container/appointment-book/appointment.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { FlexLayoutModule } from '@angular/flex-layout';

import { from } from 'rxjs';
import { MotorcycleCardComponent } from './motorcycle/components/motorcycle-card/motorcycle-card.component';
import { MotorcycleEditComponent } from './motorcycle/container/motorcycle-edit/motorcycle-edit.component';
import { NumberValidatorDirective } from './shared/validation/number-validator.directive';
import {CustomerComponent} from './customer/container/customer-search/customer.component';
import { CustomerCardComponent } from './customer/components/customer-card/customer-card.component';
import { CustomerEditComponent } from './customer/container/customer-edit/customer-edit.component';
import { MatConfirmDialogComponent } from './mat-confirm-dialog/mat-confirm-dialog.component';
import { AppointmentSearchComponent } from './appointment/container/appointment-search/appointment-search.component';

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
    MatSliderModule,
    MatIconModule,
    MatDividerModule,
    MatSortModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonToggleModule,
    MatListModule,
    FlexLayoutModule,
    MatDialogModule
  ],
  declarations: [
    AppComponent,
    MotorcycleComponent,
    HomeComponent,
    SidebarComponent,
    AppointmentComponent,
    MotorcycleCardComponent,
    MotorcycleEditComponent,
    NumberValidatorDirective,
    CustomerComponent,
    CustomerCardComponent,
    CustomerEditComponent,
    MatConfirmDialogComponent,
    AppointmentSearchComponent
  ],
  providers: [MatNativeDateModule],
  bootstrap: [AppComponent]
})
export class AppModule {
}
