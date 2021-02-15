import { Component, OnInit, ViewChild , AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { Brand } from '../../../../shared/services/brand';
import { BrandService } from '../../../../shared/services/brand.service';
import { AlertService } from '../../../../shared/services/alert.service';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

export interface OnChanges {
  ngOnChanges();
  ngDoCheck();
  ngAfterContentInit();
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];


@Component({
  selector: 'app-list-brand',
  templateUrl: './list-brand.component.html',
  styleUrls: ['./list-brand.component.scss']
})
export class ListBrandComponent implements OnInit, AfterViewInit {

  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol','action'];
  // dataSource = new MatTableDataSource(ELEMENT_DATA);
  error: string;
  isLoadingResults = true;
  displayedColumnsBrands: string[] = ['Sn', 'brand_name', 'action'];
  brandData: Brand[] = [];
  
  dataSource = new MatTableDataSource<Brand>();
   
  
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private router: Router,
    private brandService: BrandService,
    private alertService: AlertService
    ) { }
    
  ngOnInit() {
    
    
    this.fetchBrandData ();
      
     
  }

  ngAfterViewInit(): void {

    this.dataSource.sort = this.sort;
    //this.dataSource.paginator = this.paginator;
  }
  
  // fetch brand Data
  fetchBrandData() {

    return this.brandService.fetchBrands()
     .subscribe(
       (data) => { 
        this.brandData = data;
        this.dataSource.data = data as Brand[];
        this.isLoadingResults = false;
        // this.dataSource = new MatTableDataSource<Brand>(this.brandData);
        // this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        console.log(data);
       },
       error => {
        this.alertService.error(error);
        // this.loading = false;
      });
      
  }
  
  deleteBrand(id) {
    
    if (confirm('Are you sure to delete?')) {
      // this.isLoadingResults = true;
    // reset alerts on submit
    this.alertService.clear();
    // let brand_id = 'brand_id='+id;
    this.brandService.deleteBrand(id)
      .subscribe(res => {
          // this.isLoadingResults = false;
          console.log(res);
          this.alertService.success('Delete Successfully', true);
          this.fetchBrandData();
          this.router.navigate(['/brands']);
        }, (error) => {
          this.alertService.error(error);
          // this.isLoadingResults = false;
        }
      );
    }
    
    
  }

  // filter function
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

   // this.dataSource1.filter = filterValue.trim().toLowerCase();

  }


}


 