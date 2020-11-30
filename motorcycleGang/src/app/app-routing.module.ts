import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MotorcycleComponent} from './motorcycle/container/motorcycle-search/motorcycle.component';
import {AppComponent} from './app.component';
import {HomeComponent} from './core/home/home.component';
import { AppointmentComponent } from './appointment/container/appointment-book/appointment.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'motorcycles',
    component: MotorcycleComponent
  },
  {
    path: 'appointment',
    component: AppointmentComponent
  },
  {
    path: '**',
    redirectTo: 'home'
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
