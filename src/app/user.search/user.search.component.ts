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
    minLengthTerm = 3;
    ngOnInit(): void {
        this.searchUserCtrl.valueChanges
            .pipe(
                filter((res) => {
                    return (
                        !!res &&
                        res !== null &&
                        res.length >= this.minLengthTerm
                    );
                }),
                distinctUntilChanged(),
                debounceTime(1000),
                tap(() => {
                    this.errorMsg = '';
                    this.filteredUsers = [];
                    this.isLoading = true;
                }),
            )
            .subscribe((user: string) => {
                this.userService
                    .searchUser(user)
                    .subscribe({
                        next: (data: Array<User>) => {
                            this.filteredUsers = data;
                        },
                        error: (err) => {
                            console.log('error:', err);
                        },
                    })
                    .add(() => {
                        this.isLoading = false;
                    });
            });
    }
    displayWith(value: any) {
        return value ? value.name : '';
    }
    clearSelection() {
        this.searchUserCtrl.setValue('');
        this.filteredUsers = [];
    }
}
