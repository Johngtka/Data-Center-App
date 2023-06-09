import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
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

    @Output() worker = new EventEmitter<boolean>();
    searchUserCtrl = new FormControl();
    filteredUsers!: Array<Worker>;
    isLoading = false;
    noEmployeeAlert = true;
    errorMsg!: string;
    selectedWorker!: boolean;

    ngOnInit(): void {
        this.searchUserCtrl.valueChanges
            .pipe(
                filter((res) => {
                    return !!res && res !== null;
                }),
                distinctUntilChanged(),
                debounceTime(1000),
                tap(() => {
                    this.errorMsg = '';
                    this.filteredUsers = [];
                    this.isLoading = true;
                }),
            )
            .subscribe((user: Worker) => {
                this.workerService
                    .searchWorker(user)
                    .subscribe({
                        next: (data: Array<Worker>) => {
                            if (data.length >= 1) {
                                this.filteredUsers = data;
                                this.selectedWorker = true;
                            } else {
                                this.noEmployeeAlert = false;
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
    onSelected(): void {
        if (this.selectedWorker) {
            this.worker.emit(this.selectedWorker);
        } else {
            this.worker.emit(this.noEmployeeAlert);
        }
    }
}
