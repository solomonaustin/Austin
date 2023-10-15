// app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { todoComponent } from './todo/todo.component';

const routes: Routes = [
  { path: 'users/new', component: todoComponent },
  { path: 'users/:id/edit', component: todoComponent },
  { path: 'users/:id', component: todoComponent },
  { path: 'users', component: todoComponent },
  { path: '', redirectTo: '/users', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
