import { Component, OnInit, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig, MatDrawerContent } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { DistributorService } from '../../../shared/services/distributor.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
//import { Transaction } from './retailer-order.component';
import { Discurinventory } from '../../discurrentinventory/discurinventory';
import { ToastrService } from 'ngx-toastr';

/*export interface ProductDescription {
  ProName: string;
  Id: number;
  ProImage: string;
  SellingPrice: number;
  PurchasePrice: number;
  CurrentInventory: number;
  quantity:number;
  description: string;
}*/

@Component({
  selector: 'app-productpopup',
  templateUrl: './productpopup.component.html',
  styleUrls: ['./productpopup.component.scss']
})
export class ProductpopupComponent implements OnInit {

  result: any;
  productDescription:any;
  distributorId: number;
  retailerId: number;
  paramss: any;
  response: any;
  p_id: number;
  //displayedColumns = ['ProImage', 'ProName', 'CurrentInventory', 'Action'];
  
  /*transactions: Transaction[] = [
  
    { ProName: 'Fan', Id: 1, ProImage: 'https://img.icons8.com/wired/2x/fan.png', SellingPrice: 200 , Description:'test'},
    { ProName: 'Tubelight', Id: 2, ProImage: 'https://img.icons8.com/wired/2x/fan.png', SellingPrice: 200 , Description:'test1'},
    { ProName: 'Tyre', Id: 3, ProImage: 'https://img.icons8.com/wired/2x/fan.png', SellingPrice: 200, Description:'test2' }
  ];
  */
  
  constructor(
    private actroute: ActivatedRoute, 
    private router: Router, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    private distributorInventoryService: DistributorService,
    public toasterService: ToastrService
    
  ) {
    
   }

  ngOnInit() {
    //console.log(this.data);
    this.distributorId = this.data.distributorId;
    this.retailerId = this.data.retailerId;
    this.findDataFromList(this.data.p_id);
    //this.p_id=this.data.p_id;
    //alert(this.retailerId);

    
  }

  

  //find data by product_id and distributorId
  findDataFromList(p_id) {
    
    this.paramss = JSON.stringify({'userid': this.distributorId, 'ProductId': p_id });
    const formData = new FormData();
    formData.append('cmd', this.paramss);
    
    return this.distributorInventoryService.getProductById(formData).subscribe(
      (data) => {
        // this.transactions = data;
        this.response = data;
        if (this.response.status === 1) {
          this.productDescription = this.response.records as Discurinventory[];
          // sending product Information to POP and Getting Details for Categegory and Brands
            console.log(this.productDescription);
        } else {
          this.toasterService.error('No Record Found!', 'Manage products!');
        }
      },
      error => {
        this.toasterService.error('No Record Found!', 'Manage products!');
      });

      console.log('sssss');
  }

}
