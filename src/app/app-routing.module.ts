import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainSiteDataComponent } from '../app/main-site-data/main-site-data.component';


const routes: Routes = [
  {
    path: '',
    component: MainSiteDataComponent
  },
  {
    path: 'arcade-page-component',
    loadChildren: () => import('./game-arcade/arcade.module').then(m => m.ArcadeModule)
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
