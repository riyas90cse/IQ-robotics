import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { AddUserComponent } from './add-user/add-user.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { RouterModule, Routes } from '@angular/router';
import { EditUserComponent } from './edit-user/edit-user.component';
import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      { path: '', redirectTo: 'view', pathMatch: 'full'},
      { path: 'view', component: ViewUserComponent },
      { path: 'add', component: AddUserComponent },
      { path: 'edit', component: EditUserComponent }
    ]
  }
]

@NgModule({
  declarations: [AddUserComponent, ViewUserComponent, EditUserComponent, UserComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
})
export class UserModule { }
