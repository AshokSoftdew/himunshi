import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout.component';

import { ListBrandComponent } from './components/brand/list-brand/list-brand.component';
import { AddBrandComponent } from './components/brand/add-brand/add-brand.component';
import { EditBrandComponent } from './components/brand/edit-brand/edit-brand.component';
import { AddCategoryComponent } from './components/category/add-category/add-category.component';
import { EditCategoryComponent } from './components/category/edit-category/edit-category.component';
import { ListCategoryComponent } from './components/category/list-category/list-category.component';
import { BukusettingsComponent } from './components/bukusettings/bukusettings.component';
import { SendbroadcastComponent } from './components/sendbroadcast/sendbroadcast.component';
import { UserdetailsComponent } from './components/userdetails/userdetails.component';
import { SearchshowonMapComponent } from './components/searchshowon-map/searchshowon-map.component';
import { UserkpidetailsComponent } from './components/userkpidetails/userkpidetails.component';
import { UserLedgerComponent} from './components/user-ledger/user-ledger.component';

import { UseremidetailsComponent } from './components/useremidetails/useremidetails.component';
import { StaffServiceComponent } from './components/staff-service/staff-service.component';
import { from } from 'rxjs';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'dashboard'
            },
            {
                path: 'dashboard',
                loadChildren: './dashboard/dashboard.module#DashboardModule'
            },
            {
                path: 'category',
                component: ListCategoryComponent
            },
            {
                path: 'category/add-category',
                component: AddCategoryComponent
                
            },
            {
                path: 'category/edit-category/:cat-id',
                component: EditCategoryComponent
                
            },
            {
                path: 'brands',
                component: ListBrandComponent
            },
            {
                path: 'brands/add-brands',
                component: AddBrandComponent
                
            },
            {
                path: 'brands/edit-brands/:brand-id',
                component: EditBrandComponent
                
            },
            {
                path: 'sendbroadcast',
                component: SendbroadcastComponent
            },
            {
                path: 'bukusettings',
                component: BukusettingsComponent
            },
            {
                path: 'userdetails',
                component: UserdetailsComponent
            },{
                path: 'userkpidetails',
                component: UserkpidetailsComponent
            },
            {
                path: 'searchshowonmap',
                component: SearchshowonMapComponent
            },
            {
                path: 'user-ledger',
                component: UserLedgerComponent
            },
            {
                path: 'userEmiDetails',
                component: UseremidetailsComponent
            },{
                path: 'staff-service',
                component: StaffServiceComponent
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LayoutRoutingModule {}
