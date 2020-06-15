import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskComponent } from './task.component';
import {RouterModule, Routes} from "@angular/router";
import {ViewTaskComponent} from "./view-task/view-task.component";
import {AddTaskComponent} from "./add-task/add-task.component";
import {EditTaskComponent} from "./edit-task/edit-task.component";
import {SharedModule} from "../../shared/shared.module";
import { UserTasksComponent } from './user-tasks/user-tasks.component';

const routes: Routes = [
  {
    path: '',
    component: TaskComponent,
    children: [
      { path: '', redirectTo: 'view', pathMatch: 'full'},
      { path: 'view', component: ViewTaskComponent },
      { path: 'add', component: AddTaskComponent },
      { path: 'edit', component: EditTaskComponent },
      { path: 'userId', component: UserTasksComponent }
    ]
  }
]

@NgModule({
  declarations: [TaskComponent, AddTaskComponent, EditTaskComponent, ViewTaskComponent, UserTasksComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ]
})
export class TaskModule { }
