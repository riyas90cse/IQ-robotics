import { Component, OnInit } from '@angular/core';
import {DataService, Person} from "../../../service/data.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {

  assignUserLabel = 'Select Task';
  people: Person[] = [];
  selectedPeople = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getPeople()
      .pipe(map(x => x.filter(y => !y.disabled)))
      .subscribe((res) => {
        this.people = res;
        this.selectedPeople = [this.people[0].id, this.people[1].id];
      });
  }

}
