import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainSiteDataComponent } from '../app/main-site-data/main-site-data.component';
import { ArcadePageComponent } from './game-arcade/arcade-page.component';
import { BlockStackerComponent } from '../app/game-arcade/block-stacker/block-stacker.component';


const routes: Routes = [
  {
    path: '',
    component: MainSiteDataComponent
  },
  {
    path: 'arcade-page-component',
    component: ArcadePageComponent,
    children: [
      {
        path: 'block-stacker',
        component: BlockStackerComponent
      }
    ]
  },
  {
    path: '**',
    component: MainSiteDataComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
