import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../service/user.service";
import {AuthService} from "../../../service/auth/auth.service";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  public form: FormGroup;
  public username: AbstractControl;
  public name: AbstractControl;
  public email: AbstractControl;
  public password: AbstractControl;

  constructor(
    private fb: FormBuilder, public userService: UserService,
    public router: Router, public actRoute: ActivatedRoute, public auth : AuthService
  ) {
    this.form = this.fb.group({
      'name': [ '', Validators.compose([Validators.required])],
      'email': [ '',  Validators.compose([Validators.required]) ],
      'username': [ '', Validators.compose([Validators.required])],
      'password': [ '', Validators.compose([ Validators.required, Validators.minLength(6) ]) ]
    });

    this.name = this.form.controls[ 'name' ];
    this.email = this.form.controls[ 'email' ];
    this.username = this.form.controls[ 'username' ];
    this.password = this.form.controls[ 'password' ];
  }

  ngOnInit(): void {
  }

  saveUser() {
    const userData = this.form.value;
    console.log(userData)
    this.userService.createUser(userData).subscribe((data: {}) => {
      console.log('Data in add User', data);
      window.alert("User Added Successfully");
      return this.router.navigate([ 'view' ]);
    });
  }

  resetUser() {
    this.form.reset();
  }

}
