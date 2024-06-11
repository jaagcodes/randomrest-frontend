import { Component, OnInit, ViewChild } from '@angular/core';
import { Order } from '../../_model/order';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { OrderService } from '../../_service/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  dataSource: MatTableDataSource<Order>;
  displayedColumns: string[] = ['id', 'dish', 'status', 'createdAt', 'updatedAt'];
  cantidad: number = 0;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.listPurchaseHistory(1, 10).subscribe(data => {
      this.cantidad = data.total;
      this.dataSource = new MatTableDataSource(data.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  mostrarMas(event: any) {
    let pageIndex = event.pageIndex + 1;
    this.orderService.listPurchaseHistory(pageIndex, event.pageSize).subscribe(data => {
      this.cantidad = data.total;
      this.dataSource = new MatTableDataSource(data.data);
    });
  }
}
