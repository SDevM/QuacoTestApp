import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  user: any = {};

  constructor(private userService: UsersService, private router: Router) {}

  submit() {
    this.userService.signIn(this.user).subscribe((data) => {
      this.router.navigate(['/tabs/tab3']);
    });
  }
}
