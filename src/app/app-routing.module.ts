import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ClientComponent} from './clients/client/client.component';
import { SearchComponent } from './search/search.component';
import { SelectComponent } from './select/select.component';


const routes: Routes = [
  { path: '', redirectTo: 'client', pathMatch: 'full'},
  { path: 'client', component: ClientComponent },
  { path: 'search', component: SearchComponent },
  // { path: 'select', component: SelectComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
