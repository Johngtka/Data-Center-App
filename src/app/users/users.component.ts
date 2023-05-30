import { Component, OnInit } from '@angular/core';

import { User } from '../models/user';
import { UsersService } from '../service/users.service';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
    constructor(private usersService: UsersService) {}
    dataSource!: User[];
    displayedColumns: string[] = ['id', 'name', 'surname', 'dob'];

    ngOnInit(): void {
        this.usersService.getUsers().subscribe({
            next: (data: Array<User>) => {
                this.dataSource = data;
            },
            error: (err) => {
                console.log(err);
            },
        });
    }
}
