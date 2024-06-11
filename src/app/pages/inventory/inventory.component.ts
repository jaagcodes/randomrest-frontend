import { Component, OnInit, ViewChild } from '@angular/core';
import { InventoryService } from '../../_service/inventory.service';
import { Ingredient } from '../../_model/ingredient';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})
export class InventoryComponent implements OnInit {

  dataSource: MatTableDataSource<Ingredient>;
  displayedColumns: string[] = ['id', 'name', 'availableQuantity', 'lastUpdated'];

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private inventoryService: InventoryService
  ){}

  ngOnInit(): void {
    this.inventoryService.listIngredients().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
    });
  }

  filter(e : any){
    this.dataSource.filter = e.target.value.trim().toLowerCase();
  }

}
