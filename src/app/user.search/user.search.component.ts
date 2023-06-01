import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { tap } from 'rxjs';
import { filter } from 'rxjs';
import { debounceTime } from 'rxjs';
import { distinctUntilChanged } from 'rxjs';

import { User } from '../models/user';
import { UsersService } from '../service/users.service';
@Component({
    selector: 'app-user-search',
    templateUrl: './user.search.component.html',
    styleUrls: ['./user.search.component.css'],
})
export class UserSearchComponent implements OnInit {
    constructor(private userService: UsersService) {}

    searchUserCtrl = new FormControl();
    filteredUsers!: Array<User>;
    isLoading = false;
    errorMsg!: string;
    minlenghtTerm = 3;

    ngOnInit(): void {}
}
