import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UsersService} from '../users/users.service';
import {User} from '../users/user';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user: User = {avatar: '', email: '', first_name: '', id: 0, last_name: ''};

  constructor(private route: ActivatedRoute, private usersService: UsersService) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;
    this.usersService.getUser(id).subscribe(res => {
      this.user = res.data;
    });
  }

}
