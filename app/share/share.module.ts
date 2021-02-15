import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShareRoutingModule } from './share-routing.module';
import { ShareappComponent } from './shareapp/shareapp.component';

@NgModule({
  declarations: [ShareappComponent],
  imports: [
    CommonModule,
    ShareRoutingModule
  ]
})
export class ShareModule { }
