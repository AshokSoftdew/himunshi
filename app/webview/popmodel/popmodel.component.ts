import { Component, OnInit, Inject, ViewChild, Output, OnChanges} from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig, MatDrawerContent } from '@angular/material';
import { MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { ActivatedRoute, Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DistributorService } from '../../shared/services/distributor.service';
import { ToastrService } from 'ngx-toastr';
import { Discurinventory } from '../discurrentinventory/discurinventory';
import { CategoryService } from '../../shared/services/category.service';
import { BrandService } from '../../shared/services/brand.service';
import { Brand } from '../../shared/services/brand';
import { AlertService } from '../../shared/services/alert.service';
import { EventEmitter } from 'events';

 
export interface Units {
  id: string;
  text: string;
}

interface AfterViewInit {
  ngAfterViewInit(): void;
}

@Component({
  selector: 'app-popmodel',
  templateUrl: './popmodel.component.html',
  styleUrls: ['./popmodel.component.scss']
})
 
export class PopmodelComponent implements OnInit {
 // modalTitle: string;
  modalTitle: string;
  IsmodelShow: boolean=false;
  popForm: FormGroup;
  response: any;
  brands: any;
  categories: any; 
  userId: any;
  paramss:any;
  editProductDetails: any;
  
  // data123: any;
  

  // prodetailsArray: Discurinventory[] = [];
  dataSource = new MatTableDataSource<Discurinventory>([]);
  //dataSource = new MatTableDataSource<PeriodicElement>([]);
 
  @ViewChild(MatPaginator ) paginator: MatPaginator;

  units: Units[] = [
    {id: '1', text: '1'}, {id: '5', text: '5'}, {id: '10', text: '10'}, {id: '15', text: '15'}
  ];

  constructor(private actroute: ActivatedRoute,
              private alertService: AlertService,
              private router: Router,
              public dialogRef: MatDialogRef<PopmodelComponent>,
              private brandService: BrandService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private distributorInventoryService: DistributorService,
              public toasterService: ToastrService,
              private categoryService: CategoryService,
              public dialog: MatDialog,
              private fb: FormBuilder) { 
 
     //  alert(data.Productid);
     // alert(data.userid);

 // data.formData1.ProName
 
      

              this.popForm = fb.group({
                productName: ['', [Validators.required]],
                skuCode: [''],
                tax: ['',[Validators.required]],
                hsnCode: ['',[Validators.required]],
                brandName: ['', [Validators.required]],
                categoryName: ['', [Validators.required]],
                sellingPriceToRetailer:['', [Validators.required]],
                additionalDiscount:['', [Validators.required]],
                minOrderQty: [''],
                purchasePrice: ['', [Validators.required]],
                subUnits: ['', [Validators.required]],
                selectUnits: ['', [Validators.required]],
                productDescription: ['', [Validators.required, Validators.minLength(1) ]],
                productClearence: [false, [Validators.required]],
                promotionalText: [''],
                productImg: ['', [Validators.required]]
              }); 


       
        
      
      this.fetchBrandData();

    }

   
  
    fetchBrandData() {
      return this.brandService.fetchBrands()
       .subscribe(
        (data) => {
          this.brands = data ;
          console.log(this.brands);
        },
        error => {

        });
    }

 

  onNoClick(): void {
    //let dialogRef = this.dialog.open(MyDialogComponent);

    this.dialogRef.close();
    //alert('popupClose');
    this.dialogRef.afterClosed().subscribe(result => {
      
    });
  }
  

  close() {
     this.dialogRef.close();
    return false;
}


  ngOnInit() {




    // alert(this.data123.userid1);
    // const userId = this.actroute.snapshot.params['userid'];
    // const id = this.actroute.snapshot.paramMap.get('userid');
     // this.userId = this.actroute.snapshot.params['userid'];
    // alert(id);
    
  }

  
  onSubmit() { 

    const productId = ((document.getElementById('productId') as HTMLInputElement).value);
    
    
    const userId = ((document.getElementById('userId') as HTMLInputElement).value);
   // const userId = this.actroute.snapshot.params['userid'];
 
   
    const formData = new FormData();
    formData.append('productImg', this.popForm.get('productImg').value);
    if(this.popForm.get('productName').value) {
      formData.append('productName', this.popForm.get('productName').value);
    }
    
    formData.append('hsnCode', this.popForm.get('hsnCode').value);
    formData.append('brandName', this.popForm.get('brandName').value);
    formData.append('sellingPriceToRetailer', this.popForm.get('sellingPriceToRetailer').value);
    formData.append('additionalDiscount', this.popForm.get('additionalDiscount').value);
    formData.append('skuCode', this.popForm.get('skuCode').value);
    formData.append('categoryName', this.popForm.get('categoryName').value);
    formData.append('minOrderQty', this.popForm.get('minOrderQty').value);
    formData.append('purchasePrice', this.popForm.get('purchasePrice').value);
    formData.append('tax', this.popForm.get('tax').value);
    formData.append('subUnits', this.popForm.get('subUnits').value);
    formData.append('Units', this.popForm.get('selectUnits').value);
    formData.append('productDescription', this.popForm.get('productDescription').value);
    formData.append('productClearence', this.popForm.get('productClearence').value);
    formData.append('promotionalText', this.popForm.get('promotionalText').value);
    formData.append('userId', userId);
    formData.append('productId', productId);
   
  return this.distributorInventoryService.createInventory(formData).subscribe(
    (data) => { 
          this.response = data;
          if (this.response.status === 1) {
           // this.categories = this.response.msg;
             this.toasterService.success(this.response.msg, 'Manage products!');
            // this.dialogRef.close({data:1});
              this.onNoClick();
             
          } else if (this.response.status === 2) {
              this.toasterService.success(this.response.msg, 'Manage products!');
              this.onNoClick();
              //this.refresh();
           } else {
              this.toasterService.error(this.response.msg, 'Manage products!');
          }
      });
  }

  getCategoryByBrand(id, Productid) {
     
    let brandId: number = id.value;
    if(Productid !== '') {
      brandId = Productid;
    }
 
    console.log(Productid);
    return this.categoryService.getCategoryByBrandsById(brandId).subscribe(
        (data) => {
         this.response = data;

            if (this.response.msg === 1) {
              this.categories = this.response.categories;
              console.log(this.categories);
             // this.toasterService.success('Category Not Available!', this.response.categories);
            } else {
              this.toasterService.error('Category!', 'Category Not Available!');
            }
        }
      );

  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.popForm.get('productImg').setValue(file);
    }
  }


}
