import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicineListComponent } from './pages/medicines/medicine-list/medicine-list.component';
import { NewMedicineComponent } from './pages/medicines/new-medicine/new-medicine.component';

const routes: Routes = [
  { path: '', redirectTo: '/medicines', pathMatch: 'full' },
  { path: 'medicines', component: MedicineListComponent },
  { path: 'medicines/new', component: NewMedicineComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 