import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { NewCustomerComponent } from './pages/customers/new-customer/new-customer.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { NewMedicineComponent } from './pages/medicines/new-medicine/new-medicine.component';
import { MedicineListComponent } from './pages/medicines/medicine-list/medicine-list.component';
import { NewOrderComponent } from './pages/orders/new-order/new-order.component';
import { OrderListComponent } from './pages/orders/order-list/order-list.component';
import { OrderDetailsComponent } from './pages/orders/order-details/order-details.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { EditProfileComponent } from './pages/profile/edit-profile.component';
import { ChangePasswordComponent } from './pages/profile/change-password.component';
import { CustomerDetailsComponent } from './pages/customers/customer-details/customer-details.component';
import { EditCustomerComponent } from './pages/customers/edit-customer/edit-customer.component';
import { DeliveryTrackerComponent } from './pages/delivery/delivery-tracker/delivery-tracker.component';
import { OpenTicketComponent } from './pages/tickets/open-ticket/open-ticket.component';
import { SubscriptionComponent } from './pages/subscription/subscription.component';
import { ForgotPasswordComponent } from './pages/auth/forgot-password/forgot-password.component';
import { NewPasswordComponent } from './pages/auth/new-password/new-password.component';
import { NotificationBroadcastComponent } from './pages/notification/notification-broadcast.component';

export const routes: Routes = [
  { path: 'customers', component: CustomersComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'new-password', component: NewPasswordComponent },
  { path: 'home', component: HomeComponent },
  { path: 'customers/new', component: NewCustomerComponent },
  {
    path: 'customers',
    children: [
      {
        path: ':id',
        component: CustomerDetailsComponent
      },
      {
        path: ':id/edit',
        component: EditCustomerComponent
      }
    ]
  },
  { path: 'medicines/new', component: NewMedicineComponent },
  { path: 'medicines/list', component: MedicineListComponent },
  { path: 'orders/new', component: NewOrderComponent },
  { path: 'orders/list', component: OrderListComponent },
  { path: 'orders/:id', component: OrderDetailsComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'profile/edit', component: EditProfileComponent },
  { path: 'profile/change-password', component: ChangePasswordComponent },
  { path: 'subscription', component: SubscriptionComponent },
  { path: 'delivery/tracker', component: DeliveryTrackerComponent },
  { path: 'tickets/open', component: OpenTicketComponent },
  { path: 'notification/broadcast', component: NotificationBroadcastComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
