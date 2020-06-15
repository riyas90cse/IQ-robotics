// @ts-ignore
import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../service/auth/auth.service";
import validate = WebAssembly.validate;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public router: Router;
  public form: FormGroup;
  public username: AbstractControl;
  public password: AbstractControl;

  constructor(router: Router, fb: FormBuilder, private auth: AuthService) {
    this.router = router;
    this.form = fb.group({
      'username': [ '', Validators.compose([Validators.required]) ],
      'password': [ '', Validators.compose([ Validators.required, Validators.minLength(6) ]) ]
    });

    this.username = this.form.controls[ 'username' ];
    this.password = this.form.controls[ 'password' ];
  }

  public onSubmit(values: Object): void {
    if (this.form.valid) {
      this.auth.login({...values}).subscribe((user) => {
        console.log(user);
        this.router.navigate(['home']).then(r =>{});
      });
    }
  }

  ngOnInit(): void {
  }

}
