import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArcadePageComponent } from './arcade-page.component';
import { BlockStackerComponent } from './block-stacker/block-stacker.component';


const routes: Routes = [
  {
    path: '',
    component: ArcadePageComponent
  },
  {
    path: 'block-stacker',
    component: BlockStackerComponent
  },
  {
    path: '**',
    component: ArcadePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArcadeRoutingModule { }
