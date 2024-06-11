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
      { name: 'Tomato', quantity: 2 },
      { name: 'Lemon', quantity: 1},
      { name: 'Lettuce', quantity: 1 },
    ],
  },
  {
    name: 'Potato Rice',
    children: [
      { name: 'Potato', quantity: 3 },
      { name: 'Rice', quantity: 2},
      { name: 'Onion', quantity: 1 },
    ],
  },
  {
    name: 'Cheesy Meatloaf',
    children: [
      { name: 'Meat', quantity: 2 },
      { name: 'Cheese', quantity: 1},
      { name: 'Onion', quantity: 1 },
    ],
  },
  {
    name: 'Chicken Stir Fry',
    children: [
      { name: 'Chicken', quantity: 2 },
      { name: 'Tomato', quantity: 1},
      { name: 'Lemon', quantity: 1 },
    ],
  },
  {
    name: 'Lemon Rice',
    children: [
      { name: 'Rice', quantity: 3 },
      { name: 'Lemon', quantity: 2 },
      { name: 'Onion', quantity: 1 },
    ],
  },
  {
    name: 'Ketchup Chicken',
    children: [
      { name: 'Tomato', quantity: 2 },
      { name: 'Lemon', quantity: 2 },
      { name: 'Lettuce', quantity: 1 },
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
