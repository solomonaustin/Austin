// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoComponent } from './todo/todo.component';
import { TodoFormComponent } from './todo-form/todo-form.component';

const routes: Routes = [
  { path: 'todos/new', component: TodoComponent },
  { path: 'todos/:id/edit', component: TodoComponent },
  { path: 'todos/:id', component: TodoComponent },
  { path: 'todos', component: TodoComponent },
  { path: '', redirectTo: '/todos', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
