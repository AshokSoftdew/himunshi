import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AgmCoreModule } from '@agm/core';
import { ReactiveFormsModule ,FormsModule} from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule} from '@angular/common/http';

import { SelectAutocompleteModule } from 'mat-select-autocomplete';
import {
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTableModule, 
    MatTableDataSource,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatFormFieldModule
    
} from '@angular/material';
 
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';

import { TranslateModule } from '@ngx-translate/core';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopnavComponent } from './components/topnav/topnav.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { NavComponent } from './nav/nav.component';

import { AddBrandComponent } from './components/brand/add-brand/add-brand.component';
import { ListBrandComponent } from './components/brand/list-brand/list-brand.component';
import { EditBrandComponent } from './components/brand/edit-brand/edit-brand.component';
import { BrandService } from '../shared/services/brand.service';
import { from } from 'rxjs';
import { AlertComponent } from './components/alert/alert.component';
import { AlertService } from '../shared/services/alert.service';
import { AddCategoryComponent } from './components/category/add-category/add-category.component';
import { EditCategoryComponent } from './components/category/edit-category/edit-category.component';
import { ListCategoryComponent } from './components/category/list-category/list-category.component';
import { SendbroadcastComponent } from './components/sendbroadcast/sendbroadcast.component';
import { BukusettingsComponent } from './components/bukusettings/bukusettings.component';
import { UserdetailsComponent } from './components/userdetails/userdetails.component';
import { SearchshowonMapComponent } from './components/searchshowon-map/searchshowon-map.component';
import { UserkpidetailsComponent } from './components/userkpidetails/userkpidetails.component';
import { UserLedgerComponent } from './components/user-ledger/user-ledger.component';
import { UseremidetailsComponent } from './components/useremidetails/useremidetails.component';
import { StaffServiceComponent } from './components/staff-service/staff-service.component';


@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatListModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatProgressSpinnerModule,
        MatSelectModule,
        TranslateModule,
        ReactiveFormsModule,
        FormsModule, 
        HttpClientModule,
        SelectAutocompleteModule,
        AgmCoreModule.forRoot({
            // please get your own API key here:
            // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
           // apiKey: 'AIzaSyA3Jws4Ms5aCM8ubMsuCaROnfw_8W2qkXs'
           // apiKey: 'AIzaSyBaUSe3aGkd4jcC4A7QMge_3GOPB8F4S9E'
            apiKey: 'AIzaSyDyjpaDQyy7AMX3-jtW9fgm3fz-7OnA9xY'

          }),
        FlexLayoutModule.withConfig({addFlexToParent: false})
    ],
    declarations: [LayoutComponent, NavComponent, TopnavComponent, SidebarComponent, AddBrandComponent, ListBrandComponent, EditBrandComponent, AlertComponent, AddCategoryComponent, EditCategoryComponent, ListCategoryComponent, SendbroadcastComponent, BukusettingsComponent, UserdetailsComponent, SearchshowonMapComponent, UserkpidetailsComponent, UserLedgerComponent, UseremidetailsComponent, StaffServiceComponent,],
    providers :[BrandService,AlertService]
})
export class LayoutModule { }
 