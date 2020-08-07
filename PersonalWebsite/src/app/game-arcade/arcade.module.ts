import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ArcadeRoutingModule } from './arcade-routing.module';
import { ArcadePageComponent } from './arcade-page.component';
import { BlockStackerComponent } from './block-stacker/block-stacker.component';

@NgModule({
  declarations: [
    BlockStackerComponent,
    ArcadePageComponent
  ],
  imports: [
    CommonModule,
    ArcadeRoutingModule
  ],
  providers: [],
  bootstrap: [ArcadePageComponent]
})
export class ArcadeModule { }


