import {Component, OnInit} from '@angular/core';
import {Event as NavigationEvent, NavigationStart, Router} from '@angular/router';
import {UsersService} from '../../users/users.service';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  hasBack = false;

  constructor(public router: Router, private usersService: UsersService) {
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(
        (event: NavigationEvent) => {
          return (event instanceof NavigationStart);
        }
      )
    ).subscribe((route: NavigationStart) => {
      this.hasBack = route.url.includes('users/');
    });
  }

  search($event) {
    const id = $event.target.value.toLowerCase();
    if (id === '') {
      this.usersService.users = this.usersService.tempUsers;
      return;
    }
    this.usersService.users = this.usersService.users.filter(user => {
      return user.id === parseInt(id);
    });
  }

}
