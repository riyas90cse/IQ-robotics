import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../service/auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUser;
  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
    this.currentUser = this.auth.getLoggedUserName();
    console.log(this.currentUser);
  }
  logout() {
    this.auth.logout();
    this.router.navigate(['/auth/login']).then(r => {});
  }


}
