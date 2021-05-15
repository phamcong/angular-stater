import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { DataVizComponent } from './components/data-viz/data-viz.component'

const routes: Routes = [
  { 
    path: 'data-viz',
    component: DataVizComponent    
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
