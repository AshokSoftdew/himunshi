import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../shared/services/alert.service';
import { DistributorService } from '../../shared/services/distributor.service';
import { MatDialog, MatDialogConfig, MatDrawerContent, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
//import { Transaction } from './retailer-order.component';
import { Discurinventory } from '../discurrentinventory/discurinventory';
import { ProductpopupComponent } from './productpopup/productpopup.component';
import { MyAlertDialogComponent } from '../my-alert-dialog/my-alert-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { concatAll } from 'rxjs/operators';

// import pdfMake from 'pdfmake/build/pdfmake';
// import pdfFonts from 'pdfmake/build/vfs_fonts';
// pdfMake.vfs = pdfFonts.pdfMake.vfs;

//declare let pdfMake: any ;

export interface Transaction {
  ProName: string;
  Id: number;
  ProImage: string;
  SellingPrice: number;
  PurchasePrice: number;
  CurrentInventory: number;
  quantity: number;
}



@Component({
  selector: 'app-retailer-order',
  templateUrl: './retailer-order.component.html',
  styleUrls: ['./retailer-order.component.scss']

})

export class RetailerOrderComponent implements OnInit {
  title = 'Manage Inventory';
  distributorId: number;
  retailerId: number;
  paramss: any;
  response: any;
  bill: any;
  favoriteBill: string;
  bills: string[] = ['Kachh', 'Packka'];
  billType: string = '2';
  registerForm: FormGroup;
  batchCount: boolean;
  totalCartPrice: any;
  totalTax: any;
  invoiceDtl: any[];
  statesList: any[] = [];
  retailerDtl: any;
  selectedTab = 0;
  name: any;
  filterText: string = '';
  orderNo: string = '';
  totalPaidAmnt: any = 0;
  chkOrderStatus: number = 0;
  orderID: number = 0;
  //customCollapsedHeight: string = '190px';
  //customExpandedHeight: string = '190px';
  //panelOpenState: boolean = false
  invoiceType: number = 0;
  //selectedFnYer: string = '19';
  selectedFnYer: string = (new Date()).getFullYear().toString().substr(2, 2);
  financialYear = [];
  cartItemId: any[] = [];
  retaileDtlForm: FormGroup;
  



  //pdfSrc = "../../../assets/images/12_17_2019_14_46_43Bill.pdf";

  //pdfSrc ="http://himunshi.com/webapi/webview/upload/invoice/12_17_2019_14_46_43Bill.pdf";
  //qty=[0,0,0];
  //i:number;
  //prodetailsArray: Discurinventory[] = [];
  /*displayedColumns = ['ProImage', 'ProName', 'CurrentInventory', 'Action'];
  transactions: Transaction[] = [
  
    { ProName: 'Fan', Id: 1, ProImage: 'https://img.icons8.com/wired/2x/fan.png', PurchasePrice: 100, SellingPrice: 200, CurrentInventory: 4, quantity:1},
    { ProName: 'Tubelight', Id: 2, ProImage: 'https://img.icons8.com/wired/2x/fan.png', PurchasePrice: 100, SellingPrice: 200, CurrentInventory: 15, quantity:1 },
    { ProName: 'Tyre', Id: 3, ProImage: 'https://img.icons8.com/wired/2x/fan.png', PurchasePrice: 100, SellingPrice: 200, CurrentInventory: 20, quantity:0 }
  ];*/

  constructor(private actroute: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private distributorInventoryService: DistributorService,
    public toasterService: ToastrService
  ) { }

  dataSource = new MatTableDataSource<Discurinventory>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {

    this.registerForm = this.fb.group({
      bill: ['1']
    });

    this.retaileDtlForm = this.fb.group({
      name: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      gst: ['', Validators.required],
      address: []

    });

    
    this.distributorId = this.actroute.snapshot.params['distributorId'];
    this.retailerId = this.actroute.snapshot.params['retailerId'];

    //this.fetchDistributorItemList();
    this.getBatch();
    //this.getInvoice();
    this.getRetailerDtl();

    this.financialYear = this.getInvFinancialYear();
    this.getStatesList();
    this.getOrderItemAndAllItemByDistrIDAndRetailerId();
    //console.log('sss' + this.billType);

  }


  //generate pdf not in use
  generatePdf(action = 'open') {
    //console.log(pdfMake);
    //return false;
    //const documentDefinition = this.getDocumentDefinition();
    const documentDefinition = {
      content: [
        'Check out our nice column example:\n', // first this line
        {
          alignment: 'justify', // then two justified columns of text
          columns: [
            {
              text: 'Some cool text for first column goes here.'
            },
            {
              text: 'Some cool text for second column goes here.'
            }
          ]
        }
      ]
    };

/*
    switch (action) {
      case 'open': pdfMake.createPdf(documentDefinition).open(); break;
      case 'print': pdfMake.createPdf(documentDefinition).print(); break;
      case 'download': pdfMake.createPdf(documentDefinition).download(); break;

      default: pdfMake.createPdf(documentDefinition).open(); break;
    }*/

  }


  downloadinvoice(invid) {
    //alert(invid);
    this.paramss = JSON.stringify({
      'ordid': invid,
      'retailerid': this.retailerId
    });
    const formData = new FormData();
    formData.append('cmd', this.paramss);

    return this.distributorInventoryService.getPdf(formData)
      .subscribe(
        (data) => {
          // this.transactions = data;

          this.response = data;
          if (this.response.status === 0) {
            // this.toasterService.success(this.response.msg, 'Manage products!');
            this.toasterService.error(this.response.records, 'Invoice!');
          } else if (this.response.status === 1) {
            this.toasterService.success(this.response.filename, 'Invoice!');

          }

          //window.location.href = this.response.filename;
          window.open(this.response.filename, '_blank');
        },
        error => {

        });



  }


  //stateList
  getStatesList() {

    return this.distributorInventoryService.getStatesList()
      .subscribe(
        (data) => {
          // this.transactions = data;
          this.response = data;
          if (this.response.status === 0) {
            // this.toasterService.success(this.response.msg, 'Manage products!');
            this.toasterService.error('States Not Found', 'States!');
          } else if (this.response.status === 1) {
            //this.transactions = this.response.records;
            this.statesList = this.response.statesList;
            console.log(this.statesList);
          }
        },
        error => {
          this.toasterService.error(error);
        });
  }




  //create Fianacilar Year
  getInvFinancialYear() {
    return [
      { id: '18', name: '18-19' },
      { id: '19', name: '19-20' },
      { id: '20', name: '20-21' },
      { id: '21', name: '21-22' }
    ];
  }

  //financila year change by retailer or distributor
  onChangeFinancialYear(event: any) {
    //console.log(event.value);
    this.selectedFnYer = event.value;

  }
  //Retailer 
  //console.log(this.retaileDtlForm.controls.name.value);
  retailerPersonalDtl() {
    this.paramss = JSON.stringify({
      'retailerid': this.retailerId,
      'name': this.retaileDtlForm.controls.name.value,
      'city': this.retaileDtlForm.controls.city.value,
      'state': this.retaileDtlForm.controls.state.value,
      'gst': this.retaileDtlForm.controls.gst.value,
      'address': this.retaileDtlForm.controls.address.value
    });
    const formData = new FormData();
    formData.append('cmd', this.paramss);

    return this.distributorInventoryService.insertUpdateRetailerPersonalDtl(formData).subscribe(
      (data) => {
        this.response = data;
        if (this.response.status === 1) {
          this.toasterService.success(this.response.msg, 'Retailer!');
          this.getCartDtl();
        } else {
          this.toasterService.error(this.response.msg, 'Retailer!');
        }
      });
      
  }

  // fetch List By Distributor Id
  fetchDistributorItemList() {

    this.paramss = JSON.stringify({ 'userid': this.distributorId });
    const formData = new FormData();
    formData.append('cmd', this.paramss);
    //console.log(formData);
    return this.distributorInventoryService.fetchAllProducts(formData)
      .subscribe(
        (data) => {
          // this.transactions = data;
          this.response = data;
          if (this.response.status === 0) {
            // this.toasterService.success(this.response.msg, 'Manage products!');
            this.toasterService.error(this.response.msg, 'Manage products!');
          } else if (this.response.status === 1) {
            //this.transactions = this.response.records;
            this.dataSource.data = this.response.records as Discurinventory[];
            this.dataSource.paginator = this.paginator;
            //console.log(this.dataSource.data);
          } else if (this.response.status === 2) {
            this.toasterService.error('No Record Found!', 'Manage products!');
          }
        },
        error => {
          this.toasterService.error(error);
        });
  }

  //now test new order
  getOrderItemAndAllItemByDistrIDAndRetailerId() {

    this.paramss = JSON.stringify({
      'userid': this.distributorId,
      'retailerid': this.retailerId
    });
    const formData = new FormData();
    formData.append('cmd', this.paramss);
    //console.log(formData);
    return this.distributorInventoryService.fetchAllProductsNew(formData)
      .subscribe(
        (data) => {
          // this.transactions = data;
          this.response = data;
          if (this.response.status === 0) {
            // this.toasterService.success(this.response.msg, 'Manage products!');
            this.toasterService.error(this.response.msg, 'Manage products!');
          } else if (this.response.status === 1) {
            //this.transactions = this.response.records;
            this.dataSource.data = this.response.records as Discurinventory[];
            this.dataSource.paginator = this.paginator;

            if (this.response.orderNo !== 's') {
              this.orderNo = this.response.orderNo;
              this.chkOrderStatus = 1;
            } else {
              this.orderNo = '';
              this.chkOrderStatus = 0;
            }
            console.log('this.chkOrderStatus' + this.orderNo);
            console.log(this.chkOrderStatus);
          } else if (this.response.status === 2) {
            this.toasterService.error('No Record Found!', 'Manage products!');
          }
        },
        error => {
          this.toasterService.error(error);
        });
  }


  //order update
  orderUpdate(orderID) {

    //alert('orderUpdate'+orderID);
    this.selectedTab = 2;  //tab change after OrderUpdate
    //console.log(this.selectedTab);
    //return false;
    this.paramss = JSON.stringify({
      'retailerid': this.retailerId,
      'distributorId': this.distributorId,
      //'billType': this.bill,
      'billType': this.billType,
      'financialYear': this.selectedFnYer,
      'orderId': orderID,
      'action': 'update'
    });
    const formData = new FormData();
    formData.append('cmd', this.paramss);

    //this.createOrder(formData);
    return this.distributorInventoryService.placeorder(formData)
      .subscribe(
        (data) => {
          // this.transactions = data;
          this.response = data;
          if (this.response.status === 0) {
            // this.toasterService.success(this.response.msg, 'Manage products!');
            this.toasterService.error(this.response.records, 'Manage Cart!');
          } else if (this.response.status === 1) {
            this.toasterService.success(this.response.records, 'Manage Cart!');

          }
        },
        error => {

        });

  }


  //currently Not working
  addItem(i) {
    //this.qty[i]++;


    const qty = ++this.dataSource.data[i].min_ord_qty;

    //alert("p_id" + this.dataSource.data[i].Id + "Qty" + qty);
    //alert(qty);
    //alert(this.transactions[i].SellingPrice*qty);
    //this.insertCart(this.dataSource.data[i].Id, qty);
  }

  insertCart(p_id, qty, action) {
    this.paramss = JSON.stringify({
      'retailerid': this.retailerId,
      'qty': qty,
      'p_id': p_id,
      'action': action
    });
    const formData = new FormData();
    formData.append('cmd', this.paramss);

    return this.distributorInventoryService.insertCart(formData)
      .subscribe(
        (data) => {
          // this.transactions = data;
          this.response = data;
          if (this.response.status === 0) {
            // this.toasterService.success(this.response.msg, 'Manage products!');
            this.toasterService.error(this.response.msg, 'Manage Cart!');
          } else if (this.response.status === 1) {
            this.toasterService.success(this.response.msg, 'Manage Cart!');
            //this.batchCount = this.response.cartItem;
          }
        },
        error => {

        });
  }

  //currently Not working
  removeItem(i) {
    if (this.dataSource.data[i].min_ord_qty !== 0) {
      //this.qty[i]--;
      const qty = --this.dataSource.data[i].min_ord_qty;
    }
   // alert(qty);
  }
 
  //cart qty insert and update 
  cartQtyUpdate(i, action) {
    //alert(action);
    if (action === 'firstTab') {
      const qty = this.dataSource.data[i].min_ord_qty;
      const itemId = this.dataSource.data[i].Id;

      if (qty > 0) {
        this.insertCart(this.dataSource.data[i].Id, qty, action);
        if (this.batchCount) {
          this.cartItemId = this.cartItemId || [];
          this.cartItemId.push(itemId);

          this.cartItemId = this.makeUnique(this.cartItemId);
          this.batchCount = true;// this.cartItemId.length;
          //console.log(this.cartItemId);
        } else {
          this.batchCount = true;
          this.cartItemId = this.cartItemId || [];
          this.cartItemId.push(itemId);
          //console.log(this.cartItemId);
        }
      } else {
        this.toasterService.error('Quantity Invalid', 'Cart!');
      }
    }
    if (action === 'cart') {
      const qty = this.dataSource.data[i].cart_qty;
      //alert(qty + "userId" + this.dataSource.data[i].Id);
      if (qty > 0) {
        //let sellingPrice = this.dataSource.data[i].SellingPrice;
        this.insertCart(this.dataSource.data[i].Id, qty, action);

        this.getCartDtl();
      } else {
        this.toasterService.error('Quantity Invalid', 'Cart!');
      }
    }


  }

  // this is checking for unique in cart
  makeUnique(arr) {
    const uniqueArray = [];
    arr.forEach(function (element) {
      if (uniqueArray.indexOf(element) === -1) {
        uniqueArray.push(element);
      }
    });
    return uniqueArray;
  }



  get formControls() { return this.registerForm.controls; }

  //Invoice generate
  templateForm() {
    //bill type 1=Challan ,2=Invoice
    this.bill = this.formControls.bill.value;
    this.selectedTab = 2; //tab change after placeOrder
    this.paramss = JSON.stringify({
      'retailerid': this.retailerId,
      'distributorId': this.distributorId,
      //'billType': this.bill,
      'billType': this.billType,
      'financialYear': this.selectedFnYer,
      'action': 'insert'
    });
    const formData = new FormData();
    formData.append('cmd', this.paramss);

    //this.createOrder(formData);
    return this.distributorInventoryService.placeorder(formData)
      .subscribe(
        (data) => {
          // this.transactions = data;

          this.response = data;
          if (this.response.status === 0) {
            // this.toasterService.success(this.response.msg, 'Manage products!');
            this.toasterService.error(this.response.records, 'Manage Cart!');
          } else if (this.response.status === 1) {
            this.toasterService.success(this.response.records, 'Manage Cart!');

          }
        },
        error => {

        });

  }

  //create order from my cart tab
  createOrder(formData) {
    return this.distributorInventoryService.createFinalOrder(formData)
      .subscribe(
        (data) => {
          // this.transactions = data;

          this.response = data;
          if (this.response.status === 0) {
            // this.toasterService.success(this.response.msg, 'Manage products!');
            this.toasterService.error(this.response.msg, 'Manage Cart!');
          } else if (this.response.status === 1) {
            this.toasterService.success(this.response.msg, 'Manage Cart!');
          }
        },
        error => {

        });
  }



  //batch show in cartTab
  getBatch() {

    this.paramss = JSON.stringify({ 'retailerid': this.retailerId });
    const formData = new FormData();
    formData.append('cmd', this.paramss);

    return this.distributorInventoryService.batchCountByRetailId(formData)
      .subscribe(
        (data) => {
          this.response = data;
          if (this.response.status === 0) {
            // this.toasterService.success(this.response.msg, 'Manage products!');
            this.toasterService.error('test', 'Manage Cart!');
          } else if (this.response.status === 1) {
            //this.toasterService.success('test', 'Manage Cart!');
            this.batchCount = this.response.cartItem;
            this.cartItemId = this.response.cartItemId;
            //console.log(this.response.records);
          }
        },
        error => {
          this.toasterService.error(error);
        });
  }

  //all order tab data
  getInvoice() {

    this.paramss = JSON.stringify({ 'retailerid': this.retailerId });
    const formData = new FormData();
    formData.append('cmd', this.paramss);

    return this.distributorInventoryService.getInvoiceByRetailId(formData)
      .subscribe(
        (data) => {
          this.response = data;
          if (this.response.status === 0) {
            // this.toasterService.success(this.response.msg, 'Manage products!');
            this.toasterService.error('Order not found', ' All Orders!');
            this.invoiceDtl = [];
          } else if (this.response.status === 1) {
            //this.toasterService.success('test', 'Manage Cart!');

            this.invoiceDtl = this.response.records;
            //console.log(this.invoiceDtl);
            //console.log("sss");
          }
        },
        error => {
          this.toasterService.error(error);
        });
  }



  // tab click
  tabChanged($event) {
    const clickedIndex = $event.index;
    //alert(clickedIndex);
    if (clickedIndex === '0') {
      //this.fetchDistributorItemList();
      this.getOrderItemAndAllItemByDistrIDAndRetailerId();
    }
    if (clickedIndex === '1') {
      this.getCartDtl();
      this.invoiceType = 1;

      if (this.orderNo !== '') {
        this.chkOrderStatus = 1;
      }

    }
    if (clickedIndex === '2') {
      this.getInvoice();
    }
    // console.log(this.chkOrderStatus+"tabchange");
    //console.log('index => ', tabChangeEvent.index); 
  }


  // get Mycart detail Tab
  getCartDtl() {

    this.paramss = JSON.stringify({ 'retailerid': this.retailerId, 'distributorid': this.distributorId });
    const formData = new FormData();
    formData.append('cmd', this.paramss);
    //console.log(formData);
    return this.distributorInventoryService.getCartByRetailId(formData)
      .subscribe(
        (data) => {
          // this.transactions = data;
          this.response = data;
          if (this.response.status === 0) {
            // this.toasterService.success(this.response.msg, 'Manage products!');
            this.toasterService.error(this.response.msg, 'Manage products!');
          } else if (this.response.status === 1) {
            this.dataSource.data = this.response.records as Discurinventory[];
            this.totalCartPrice = this.response.totalCartPrice;
            this.batchCount = this.response.cartItem;
            this.totalTax = this.response.totalTax;
            this.totalPaidAmnt = this.response.totalPaidAmount;
            this.orderID = this.response.orderId;
            //console.log(this.batchCount);
          } else if (this.response.status === 2) {
            this.toasterService.error('No Record Found!', 'Manage products!');
          }
        }, 
        error => {
          this.toasterService.error(error);
        });
  }

  //delete cartItem
  deleteCartItem(i) {

    const dialogRef = this.dialog.open(MyAlertDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      // NOTE: The result can also be nothing if the user presses the `esc` key or clicks outside the dialog
      if (result === 'confirm') {
        console.log('Delete');

        this.paramss = JSON.stringify({
          'retailerid': this.retailerId,
          'distributorid': this.distributorId,
          'cart_id': this.dataSource.data[i].cart_id
        });
        const formData = new FormData();
        formData.append('cmd', this.paramss);
        //console.log(formData);
        return this.distributorInventoryService.getCartItemIsRemoved(formData)
          .subscribe(
            (data) => {
              // this.transactions = data;
              this.response = data;
              if (this.response.status === 0) {
                this.toasterService.error(this.response.msg, 'Cart Item!');
              } else if (this.response.status === 1) {

                this.toasterService.success(this.response.msg, 'Cart Item!');
                this.getCartDtl();
              }
            },
            error => {
              this.toasterService.error(error);
            });
      }
    });

  }


  //get retailer dtl retailer_id=userid
  getRetailerDtl() {

    this.paramss = JSON.stringify({ 'retailerid': this.retailerId });
    const formData = new FormData();
    formData.append('cmd', this.paramss);
    //console.log(formData);

    return this.distributorInventoryService.getRetailerDtl(formData)
      .subscribe(data => {

        this.response = data;
        this.retaileDtlForm.setValue({
          name: this.response.records.retailerName,
          city: this.response.records.city,
          state: this.response.records.state,
          gst: this.response.records.GST,
          address: this.response.records.address,
        });

        if (this.response.status === 1) {
          //this.transactions = this.response.records;
          this.retailerDtl = this.response.records;
          //console.log(this.response.records.retailerName);
        }
      },
        error => {
          this.toasterService.error(error);
        }
      );
    /* return this.distributorInventoryService.getRetailerDtl(formData)
       .subscribe(
         (data) => {
           // this.transactions = data;
           this.response = data;
           if (this.response.status === 0) {
             // this.toasterService.success(this.response.msg, 'Manage products!');
             this.toasterService.error(this.response.msg, 'Manage products!');
           } else if (this.response.status === 1) {
             //this.transactions = this.response.records;
             this.retailerDtl = this.response.records;
             console.log(this.response.records.retailerName);
           }
         },
         error => {
           this.toasterService.error(error);
         });*/
  }

  //tab selected on Edit button
  openContentOne(ordId, action) {

    if (action === 'view') {
      this.selectedTab = 1;
      this.getOrderNoEdit(ordId);

      if (this.orderNo !== 's') {
        //this.orderNo = this.response.orderNo;
        this.chkOrderStatus = 1;
      } else {
        this.orderNo = '';
        this.chkOrderStatus = 0;
      }
    } else if (action === 'edit') {
      this.selectedTab = 0;
      this.getOrderNoEdit(ordId);
    }


  }




  //Edit order in cart
  getOrderNoEdit(ordId) {

    this.paramss = JSON.stringify({ 'retailerid': this.retailerId, 'id': ordId });
    const formData = new FormData();
    formData.append('cmd', this.paramss);

    return this.distributorInventoryService.getInvoiceByRetailId(formData)
      .subscribe(
        (data) => {
          this.response = data;
          if (this.response.status === 0) {
            this.toasterService.error('Order Id Not found', 'Order!');
          } else if (this.response.status === 1) {
            this.orderNo = this.response.records; // api return orderID

          }
        },
        error => {
          this.toasterService.error(error);
        });
  }

  //cancel order
  cancelOrder(ordId) {
    //alert(ordId);


    const dialogRef = this.dialog.open(MyAlertDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      // NOTE: The result can also be nothing if the user presses the `esc` key or clicks outside the dialog
      if (result === 'confirm') {
        console.log('Delete');
        return false;
      this.paramss = JSON.stringify({ 'id': ordId });
      const formData = new FormData();
      formData.append('cmd', this.paramss);
      //console.log(formData);
      return this.distributorInventoryService.cancelOrder(formData)
        .subscribe(
          (data) => {
            // this.transactions = data;
            this.response = data;
            if (this.response.status === 0) {
              this.toasterService.error(this.response.msg, 'All Orderss!');
              this.getInvoice();
            } else if (this.response.status === 1) {

              this.toasterService.success(this.response.msg, 'All Order222!');
              this.getInvoice();
            }
          },
          error => {
            this.toasterService.error(error);
          });
        }
      });
    //this.getCartDtl();
  }

  //
  openOrderList(orderId) {
    //alert(orderId);
    //const userId = this.actroute.snapshot.params['userid'];

  }




  //product detail popup Open
  openCreate(p_id) {

    const userId = this.actroute.snapshot.params['userid'];
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(ProductpopupComponent, {
      data: { p_id: p_id, distributorId: this.distributorId, retailerId: this.retailerId, action: 'Create Product' },
      // position: { top: '5rem' },
      maxWidth: '80vw',
      maxHeight: '80vh',
      width: '500px',
      height: '50vh',
    });


    dialogRef.afterClosed().subscribe(result => {
      //console.log('afterClosed called');
      //this.userId = this.actroute.snapshot.params['userid'];
      //this.fetchProducts(userId);
    });

  }




}
