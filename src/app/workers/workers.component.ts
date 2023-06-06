import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { Worker } from '../models/worker';
import { WorkersService } from '../services/workers.service';
import {
    ConfirmationDialogComponent,
    ConfirmationDialogResponse,
} from '../confirmation.dialog/confirmation.dialog.component';

@Component({
    selector: 'app-workers',
    templateUrl: './workers.component.html',
    styleUrls: ['./workers.component.css'],
})
export class WorkersComponent implements OnInit {
    constructor(
        private workersService: WorkersService,
        private dialog: MatDialog,
    ) {}

    dataSource!: Worker[];
    isLoadingResults = true;
    workersID: number[] = [];
    displayedColumns: string[] = ['id', 'fullName', 'dob', 'panel'];
    employer!: boolean;

    ngOnInit(): void {
        this.workersService.getWorkers().subscribe({
            next: (data: Array<Worker>) => {
                this.dataSource = data;
                this.isLoadingResults = false;
            },
            error: (err) => {
                console.log(err);
            },
        });
    }

    clickedRow(row: Worker): void {
        const ID = this.workersID.indexOf(row.id);
        if (ID !== -1) {
            this.workersID.splice(ID, 1);
        } else {
            this.workersID.push(row.id);
        }
    }

    deleteEmploy(worker: Worker) {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            data: {
                title: 'CONFIRMATION_DIALOG_USER_DELETE.TITLE',
                message: 'CONFIRMATION_DIALOG_USER_DELETE.MESSAGE',
                action: 'CONFIRMATION_DIALOG_USER_DELETE.ACTION',
            },
            disableClose: true,
        });
        console.log(worker.id);
    }

    searchedEmployer(event: boolean): void {
        this.employer = event;
        console.log(event);
    }
}
