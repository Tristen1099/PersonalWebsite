import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ArcadeRoutingModule } from './arcade-routing.module';
import { ArcadePageComponent } from './arcade-page.component';
import { BlockStackerComponent } from './block-stacker/block-stacker.component';
import { BombDusterComponent } from './bomb-duster/bomb-duster.component';
import { CellComponent } from './bomb-duster/cell/cell.component';

@NgModule({
  declarations: [
    BlockStackerComponent,
    ArcadePageComponent,
    BombDusterComponent,
    CellComponent
  ],
  imports: [
    CommonModule,
    ArcadeRoutingModule
  ],
  providers: [],
  bootstrap: [ArcadePageComponent]
})
export class ArcadeModule { }


