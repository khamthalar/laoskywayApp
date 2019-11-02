import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookflightComponent } from './components/bookflight/bookflight.component';
import { SelectClassComponent } from './components/select-class/select-class.component';

const routes: Routes = [
{path:"bookflight",component:BookflightComponent},
{path:"selectClass",component:SelectClassComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
