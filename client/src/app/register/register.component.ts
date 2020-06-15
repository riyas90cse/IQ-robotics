import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../service/auth/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public router: Router;
  public form: FormGroup;
  public username: AbstractControl;
  public name: AbstractControl;
  public email: AbstractControl;
  public password: AbstractControl;

  constructor(router: Router, fb: FormBuilder, private auth: AuthService) {
    this.router = router;
    this.form = fb.group({
      'username': [ '', Validators.compose([Validators.required]) ],
      'name': [ '', Validators.compose([Validators.required]) ],
      'email': [ '', Validators.compose([Validators.required]) ],
      'password': [ '', Validators.compose([ Validators.required, Validators.minLength(6) ]) ]
    });

    this.username = this.form.controls[ 'username' ];
    this.name = this.form.controls[ 'name' ];
    this.email = this.form.controls[ 'email' ];
    this.password = this.form.controls[ 'password' ];
  }

  public onSubmit(values: Object): void {
    if (this.form.valid) {
      this.auth.register({...values}).subscribe((user) => {
        console.log(user);
        window.alert("User Registered Successfully")
        this.router.navigate(['/auth/login']).then(r =>{});
      });
    }
  }

  ngOnInit(): void {
  }

}
