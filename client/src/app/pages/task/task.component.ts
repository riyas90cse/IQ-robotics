import { Component, OnInit } from '@angular/core';
import {userJson} from "../../data/user-json";
import {Router} from "@angular/router";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
