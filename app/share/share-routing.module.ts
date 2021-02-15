import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShareappComponent } from './shareapp/shareapp.component';

const routes: Routes = [
  {path: 'share/:utm_source/:utm_medium/:utm_campaign', component: ShareappComponent},
  {path: 'share/:utm_source/:utm_medium', component: ShareappComponent}
];

// {path: 'webview/retailer/:distributorId/:retailerId', component: RetailerOrderComponent},
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class ShareRoutingModule { }
