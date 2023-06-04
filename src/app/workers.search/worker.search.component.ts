import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { tap } from 'rxjs';
import { filter } from 'rxjs';
import { debounceTime } from 'rxjs';
import { distinctUntilChanged } from 'rxjs';

import { Worker } from '../models/worker';
import { WorkersService } from '../services/workers.service';
@Component({
    selector: 'app-worker-search',
    templateUrl: './worker.search.component.html',
    styleUrls: ['./worker.search.component.css'],
})
export class WorkerSearchComponent implements OnInit {
    constructor(private workerService: WorkersService) {}

    searchUserCtrl = new FormControl();
    filteredUsers!: Array<Worker>;
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
                this.workerService
                    .searchWorker(user)
                    .subscribe({
                        next: (data: Array<Worker>) => {
                            if (data.length >= 1) {
                                this.filteredUsers = data;
                                console.log(
                                    typeof this.filteredUsers,
                                    typeof data,
                                );
                            }
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
