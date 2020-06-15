import { Component, OnInit } from '@angular/core';
import {taskJson} from "../../../data/task-json";

@Component({
  selector: 'app-user-tasks',
  templateUrl: './user-tasks.component.html',
  styleUrls: ['./user-tasks.component.css']
})
export class UserTasksComponent implements OnInit {

  userInfo = {
    "userName" : "Mohamed Riyas",
    "totalTasks" : 12,
    "opened" : 6,
    "inProgress" : 4,
    "closed" : 2
  };

  tasks = taskJson;

  constructor() { }

  ngOnInit(): void {
  }

}
