import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ClientComponent} from './clients/client/client.component';
import { SearchComponent } from './search/search.component';
import { SelectComponent } from './select/select.component';
import { ContractorComponent } from './contractor/contractor.component';
import { DeliveryComponent } from './delivery/delivery.component';


const routes: Routes = [
  { path: '', redirectTo: 'charity', pathMatch: 'full'},
  { path: 'charity', component: ClientComponent },
  { path: 'search', component: SearchComponent },
  { path: 'select', component: SelectComponent },
  { path: 'contractor', component: ContractorComponent },
  { path: 'delivery', component: DeliveryComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
