import { FlatTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { MenuService } from '../../_service/menu.service';
import { MatSnackBar } from '@angular/material/snack-bar';

interface FoodNode {
  name: string;
  quantity?: number;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Tomato Salad',
    children: [
      { name: 'Tomato 2' },
      { name: 'Lemon 1' },
      { name: 'Lettuce 1' },
    ],
  },
  {
    name: 'Potato Rice',
    children: [
      { name: 'Potato 3' },
      { name: 'Rice 2' },
      { name: 'Onion 1' },
    ],
  },
  {
    name: 'Cheesy Meatloaf',
    children: [
      { name: 'Meat 2' },
      { name: 'Cheese 1' },
      { name: 'Onion 1' },
    ],
  },
  {
    name: 'Chicken Stir Fry',
    children: [
      { name: 'Chicken 2' },
      { name: 'Tomato 1' },
      { name: 'Lemon 1' },
    ],
  },
  {
    name: 'Lemon Rice',
    children: [
      { name: 'Rice 3' },
      { name: 'Lemon 2' },
      { name: 'Onion 1' },
    ],
  },
  {
    name: 'Ketchup Chicken',
    children: [
      { name: 'Tomato 2' },
      { name: 'Lemon 2' },
      { name: 'Lettuce 1' },
    ],
  },
];

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
  quantity?: number;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})


export class MenuComponent {
  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(
    private menuService: MenuService,
    private snackBar: MatSnackBar
  ) {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  createRandomRecipe() {
    this.menuService.createOrder().subscribe(
      () => {
        this.snackBar.open('Order created', 'Close', {
          duration: 3000,
        });
      },
      (error) => {
        this.snackBar.open('Failed to create order', 'Close', {
          duration: 3000,
        });
      }
    );
  }
  
}
