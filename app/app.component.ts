import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog, MatTable } from '@angular/material';
import { PopmodelComponent } from '../app/webview/popmodel/popmodel.component';

export interface UsersData {
    name: string;
    id: number;
  }

  const ELEMENT_DATA: UsersData[] = [
    {id: 1560608769632, name: 'Artificial Intelligence'},
    {id: 1560608796014, name: 'Machine Learning'},
    {id: 1560608787815, name: 'Robotic Process Automation'},
    {id: 1560608805101, name: 'Blockchain'}
  ];

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    
  displayedColumns: string[] = ['id', 'name', 'action'];
  dataSource = ELEMENT_DATA;
 
  @ViewChild(MatTable) table: MatTable<any>;
    
    constructor(public dialog: MatDialog, 
                private translate: TranslateService) {
        translate.setDefaultLang('en');
    }
    title = 'Munshi Admin';
    ngOnInit() {
    }

    openDialog(action,obj) {
        obj.action = action;
        const dialogRef = this.dialog.open(PopmodelComponent, {
          width: '250px',
          data:obj
        });
     
        dialogRef.afterClosed().subscribe(result => {
          if(result.event === 'Add') {
            this.addRowData(result.data);
          } else if(result.event === 'Update') {
            this.updateRowData(result.data);
          } else if(result.event === 'Delete') {
            this.deleteRowData(result.data);
          }
        });
      }
     
      addRowData(row_obj) {
        const d = new Date();
        this.dataSource.push({
          id:d.getTime(),
          name:row_obj.name
        });
        this.table.renderRows();
        
      }
      updateRowData(row_obj) {
        this.dataSource = this.dataSource.filter((value,key)=> {
          if(value.id === row_obj.id) {
            value.name = row_obj.name;
          }
          return true;
        });
      }
      deleteRowData(row_obj) {
        this.dataSource = this.dataSource.filter((value,key)=> {
          return value.id !== row_obj.id;
        });
      }


}