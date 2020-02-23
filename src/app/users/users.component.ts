import {Component, OnInit} from '@angular/core';
import {UsersService} from './users.service';
import {Router} from '@angular/router';

export interface Pagination {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: [];
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {
  pagination: Pagination;

  constructor(public usersService: UsersService, private router: Router) {
  }


  ngOnInit(): void {
    this.getUsers();
  }

  navigateUser(id: number) {
    this.router.navigate([`users/${id}`]);
  }

  paginate(page) {
    this.usersService.getUsers(page).subscribe(res => {
      this.usersService.users = res.body.data ? res.body.data : [];
    });
  }

  getUsers() {
    this.usersService.getUsers().subscribe(res => {
      this.usersService.users = res.body.data ? res.body.data : [];
      if (!this.pagination) {
        this.pagination = res.body;
      }
      res.body.data = this.pagination.data;
      delete this.pagination.data;
    });
  }

}
