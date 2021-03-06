import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArcadePageComponent } from './arcade-page.component';
import { BlockStackerComponent } from './block-stacker/block-stacker.component';
import { BombDusterComponent } from './bomb-duster/bomb-duster.component';
import { PicturePuzzleComponent } from './picture-puzzle/picture-puzzle.component';


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
    path: 'bomb-duster',
    component: BombDusterComponent
  },
  {
    path: 'picture-puzzle',
    component: PicturePuzzleComponent
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
