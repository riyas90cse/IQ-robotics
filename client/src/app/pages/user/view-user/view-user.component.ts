import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NgbModal, NgbToast} from "@ng-bootstrap/ng-bootstrap";
import {UserService} from "../../../service/user.service";
import {map} from "rxjs/operators";
import {User} from "../../../interface/user";

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {

  title = 'USER DETAILS';
  dtOptions: DataTables.Settings = {};
  dtTrigger: any;
  users : User [];
  isModify: boolean;

  constructor(private router: Router, private modelService: NgbModal,
              private userService: UserService ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2
    };
    this.getUsers();
  }

  onRoute(modify: boolean) {
    this.isModify = modify;
    if(this.isModify == true) {
      this.router.navigate(['/user/edit']).then(r => {
        console.log('Navigate to Route Edit', r);
      });
    } else  {
      this.router.navigate(['/user/add']).then(r => {
        console.log('Navigate to Route Add', r);
      });
    }
  }

  // Get User list
  getUsers() {
    return this.userService.getAllUsers().pipe(map((data) => {
      console.log(data);
      return data;
    })).subscribe((users) => {
        this.users = users;
        console.log('Get All Users', users);
    });
  }

  getUserTasks() {
    // const modalRef = this.modelService.open(UserTasksComponent, { size: 'lg', centered: true });
    // modalRef.componentInstance.selectedPost = post;
    // this.router.navigate(['/?userId=1'], {queryParams: {userId: 1}});
    this.router.navigate(['/task/userId']);
  }
}
