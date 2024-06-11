import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Restock } from '../../_model/restock';
import { RestockService } from '../../_service/restock.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-restock',
  templateUrl: './restock.component.html',
  styleUrl: './restock.component.css'
})
export class RestockComponent implements OnInit {

  
  dataSource: MatTableDataSource<Restock>;
  displayedColumns: string[] = ['id', 'ingredientName', 'quantityPurchased', 'purchasedAt'];
  cantidad: number = 0;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private restockService: RestockService
  ){}

  ngOnInit(): void {
    this.restockService.listPurchaseHistory(1, 10).subscribe(data => {
      this.cantidad = data.total;
      this.dataSource = new MatTableDataSource(data.data);
      this.dataSource.sort = this.sort;
    });
  }

  filter(e : any){
    this.dataSource.filter = e.target.value.trim().toLowerCase();
  }

  mostrarMas(e:any){
    let pageIndex = e.pageIndex + 1;
    this.restockService.listPurchaseHistory(pageIndex, e.pageSize).subscribe(data => {
      this.cantidad = data.total;
      this.dataSource = new MatTableDataSource(data.data);
    })
  }
}
