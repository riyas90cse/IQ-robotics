import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {taskJson} from "../../../data/task-json";

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {

  title = 'TASK DETAILS';
  dtOptions: DataTables.Settings = {};
  dtTrigger: any;
  tasks = taskJson;
  isModify: boolean;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    };
  }

  onRoute(modify: boolean) {
    this.isModify = modify;
    if(this.isModify == true) {
      this.router.navigate(['/task/edit']).then(r => {
        console.log('Navigatd to Route Edit', r);
      });
    } else  {
      this.router.navigate(['/task/add']).then(r => {
        console.log('Navigatd to Route Add', r);
      });
    }
  }

}
