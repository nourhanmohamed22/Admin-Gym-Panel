import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassesListComponent } from './classes/classes-list/classes-list.component';
import { ClientDetailsComponent } from './clients/client-details/client-details.component';
import { ClientsListComponent } from './clients/clients-list/clients-list.component';


const routes: Routes = [
  { path: 'clients', component: ClientsListComponent },
  { path: 'client-details/:id', component: ClientDetailsComponent },
  { path: 'classes', component: ClassesListComponent },
  { path: '', redirectTo: '/clients', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
