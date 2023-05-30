import { Component, OnInit } from '@angular/core';

import { UsersService } from '../service/users.service';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
    constructor(private usersService: UsersService) {}
    items?: any[];

    ngOnInit() {
        this.usersService.getTest().subscribe({
            next: (data) => {
                this.items = data;
            },
            error: (err) => {
                console.log(err);
            },
        });
    }
}
