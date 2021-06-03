import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CovidMapComponent } from './components/covid-map/covid-map.component';

const routes: Routes = [
  {
    path: 'data-viz',
    component: CovidMapComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
