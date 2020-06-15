import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {delay, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getPeople(term: string = null): Observable<Person[]> {
    let items = getMockPeople();
    if (term) {
      items = items.filter(x => x.name.toLocaleLowerCase().indexOf(term.toLocaleLowerCase()) > -1);
    }
    return of(items).pipe(delay(500));
  }
}

function getMockPeople() {
  return [
    {
      'id': '5a15b13c36e7a7f00cf0d7cb',
      'index': 2,
      'isActive': true,
      'picture': 'http://placehold.it/32x32',
      'age': 23,
      'name': 'Karyn Wright',
      'gender': 'female',
      'company': 'ZOLAR',
      'email': 'karynwright@zolar.com',
      'phone': '+1 (851) 583-2547'
    },
    {
      'id': '5a15b13c2340978ec3d2c0ea',
      'index': 3,
      'isActive': false,
      'picture': 'http://placehold.it/32x32',
      'age': 35,
      'name': 'Rochelle Estes',
      'disabled': true,
      'gender': 'female',
      'company': 'EXTRAWEAR',
      'email': 'rochelleestes@extrawear.com',
      'phone': '+1 (849) 408-2029'
    },
    {
      'id': '5a15b13c663ea0af9ad0dae8',
      'index': 4,
      'isActive': false,
      'picture': 'http://placehold.it/32x32',
      'age': 25,
      'name': 'Mendoza Ruiz',
      'gender': 'male',
      'company': 'ZYTRAX',
      'email': 'mendozaruiz@zytrax.com',
      'phone': '+1 (904) 536-2020'
    },
    {
      'id': '5a15b13cc9eeb36511d65acf',
      'index': 5,
      'isActive': false,
      'picture': 'http://placehold.it/32x32',
      'age': 39,
      'name': 'Rosales Russell',
      'gender': 'male',
      'company': 'ELEMANTRA',
      'email': 'rosalesrussell@elemantra.com',
      'phone': '+1 (868) 473-3073'
    },
    {
      'id': '5a15b13c728cd3f43cc0fe8a',
      'index': 6,
      'isActive': true,
      'picture': 'http://placehold.it/32x32',
      'age': 32,
      'name': 'Marquez Nolan',
      'gender': 'male',
      'company': 'MIRACLIS',
      'disabled': true,
      'email': 'marqueznolan@miraclis.com',
      'phone': '+1 (853) 571-3921'
    },
    {
      'id': '5a15b13ca51b0aaf8a99c05a',
      'index': 7,
      'isActive': false,
      'picture': 'http://placehold.it/32x32',
      'age': 28,
      'name': 'Franklin James',
      'gender': 'male',
      'company': 'CAXT',
      'email': 'franklinjames@caxt.com',
      'phone': '+1 (868) 539-2984'
    },
    {
      'id': '5a15b13cc3b9381ffcb1d6f7',
      'index': 8,
      'isActive': false,
      'picture': 'http://placehold.it/32x32',
      'age': 24,
      'name': 'Elsa Bradley',
      'gender': 'female',
      'company': 'MATRIXITY',
      'email': 'elsabradley@matrixity.com',
      'phone': '+1 (994) 583-3850'
    }
  ]
}

export interface Person {
  id: string;
  isActive: boolean;
  age: number;
  name: string;
  gender: string;
  company: string;
  email: string;
  phone: string;
  disabled?: boolean;
}
