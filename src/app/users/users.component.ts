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
    isLoadingResults = true;
    displayedColumns: string[] = ['id', 'fullName', 'dob'];

    ngOnInit(): void {
        this.usersService.getUsers().subscribe({
            next: (data: Array<User>) => {
                this.dataSource = data;
                this.isLoadingResults = false;
            },
            error: (err) => {
                console.log(err);
            },
        });
    }
}
