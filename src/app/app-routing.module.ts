import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CryptoListComponent } from './crypto-list/crypto-list.component';
import { CryptoDetailComponent } from './crypto-detail/crypto-detail.component';


const routes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: 'list', component: CryptoListComponent },
  { path: 'detail/:id', component: CryptoDetailComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
