import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './core/home/home.component';
import {AppointmentComponent} from './appointment/container/appointment-book/appointment.component';
import {MotorcycleComponent} from './motorcycle/container/motorcycle-search/motorcycle.component';
import {MotorcycleEditComponent} from './motorcycle/container/motorcycle-edit/motorcycle-edit.component';

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
    path: 'motorcycle',
    children: [
      {
        path: '',
        redirectTo: 'motorcycle-search',
        pathMatch: 'full'
      },
      {
        path: 'motorcycle-search',
        component: MotorcycleComponent
      },
      {
        path: 'motorcycle-edit/:id',
        component: MotorcycleEditComponent
      }
    ]
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
