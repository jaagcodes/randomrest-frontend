import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryComponent } from './pages/inventory/inventory.component';
import { OrderComponent } from './pages/order/order.component';
import { RestockComponent } from './pages/restock/restock.component';
import { MenuComponent } from './pages/menu/menu.component';

const routes: Routes = [
  { path: 'pages/inventory', component: InventoryComponent },
  { path: 'pages/restock', component: RestockComponent },
  { path: 'pages/order', component: OrderComponent },
  { path: 'pages/menu', component: MenuComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
