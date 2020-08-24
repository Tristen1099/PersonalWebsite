import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ArcadeRoutingModule } from './arcade-routing.module';
import { ArcadePageComponent } from './arcade-page.component';
import { BlockStackerComponent } from './block-stacker/block-stacker.component';
import { BombDusterComponent } from './bomb-duster/bomb-duster.component';

@NgModule({
  declarations: [
    BlockStackerComponent,
    ArcadePageComponent,
    BombDusterComponent
  ],
  imports: [
    CommonModule,
    ArcadeRoutingModule
  ],
  providers: [],
  bootstrap: [ArcadePageComponent]
})
export class ArcadeModule { }


