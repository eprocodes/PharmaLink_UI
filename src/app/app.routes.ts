import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { NewCustomerComponent } from './pages/customers/new-customer/new-customer.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { NewMedicineComponent } from './pages/medicines/new-medicine/new-medicine.component';
import { MedicineListComponent } from './pages/medicines/medicine-list/medicine-list.component';
import { NewOrderComponent } from './pages/orders/new-order/new-order.component';
import { OrderListComponent } from './pages/orders/order-list/order-list.component';
import { ProfileComponent } from './pages/settings/profile/profile.component';
import { GeneralComponent } from './pages/settings/general/general.component';
import { CustomerDetailsComponent } from './pages/customers/customer-details/customer-details.component';

export const routes: Routes = [
  { path: 'customers', component: CustomersComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'customers/new', component: NewCustomerComponent },
  { path: 'customers/:id', component: CustomerDetailsComponent },
  { path: 'medicines/new', component: NewMedicineComponent },
  { path: 'medicines/list', component: MedicineListComponent },
  { path: 'orders/new', component: NewOrderComponent },
  { path: 'orders/list', component: OrderListComponent },
  { path: 'settings/profile', component: ProfileComponent },
  { path: 'settings/general', component: GeneralComponent },
  { path: '', redirectTo: 'customers', pathMatch: 'full' }
];
