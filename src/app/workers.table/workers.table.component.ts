import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import {
    MatTableDataSource,
    MatTableDataSourcePaginator,
} from '@angular/material/table';

import { Worker } from '../models/worker';
import { WorkersService } from '../services/workers.service';
import { WorkerInputDialogComponent } from '../worker-input-dialog/worker-input-dialog.component';
import { SnackService, SNACK_TYPE } from '../services/snack.service';
import {
    ConfirmationDialogComponent,
    ConfirmationDialogResponse,
} from '../confirmation.dialog/confirmation.dialog.component';

@Component({
    selector: 'app-workers-table',
    templateUrl: './workers.table.component.html',
    styleUrls: ['./workers.table.component.css'],
})
export class WorkersTableComponent implements OnInit {
    constructor(
        private workersService: WorkersService,
        private snackService: SnackService,
        private dialog: MatDialog,
    ) {}

    worker!: Worker[];
    dataSource!: MatTableDataSource<Worker, MatTableDataSourcePaginator>;
    isLoadingResults = true;
    workersID: number[] = [];
    displayedColumns: string[] = ['id', 'fullName', 'dob', 'panel'];

    ngOnInit(): void {
        this.workersService.getWorkers().subscribe({
            next: (data) => {
                this.worker = data;
                this.dataSource = new MatTableDataSource<Worker>(this.worker);
                this.isLoadingResults = false;
            },
            error: (err) => {
                this.snackService.showSnackBar(
                    'ERROR.USERS_GETTING_ERROR',
                    SNACK_TYPE.error,
                );
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

    openDialog(worker?: Worker) {
        const dialogRef = this.dialog.open(WorkerInputDialogComponent, {
            data: {
                worker,
            },
            disableClose: true,
        });
        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.updateTable(result);
                this.workersService.getWorkers().subscribe({
                    next: (data) => {
                        this.dataSource = new MatTableDataSource<Worker>(data);
                        this.isLoadingResults = false;
                    },
                    error: (err) => {
                        this.snackService.showSnackBar(
                            'ERROR.USERS_GETTING_ERROR',
                            SNACK_TYPE.error,
                        );
                        console.log(err);
                    },
                });
            }
        });
    }

    deleteEmployer(worker: Worker) {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            data: {
                title: 'CONFIRMATION_DIALOG_USER_DELETE.TITLE',
                message: 'CONFIRMATION_DIALOG_USER_DELETE.MESSAGE',
                action: 'CONFIRMATION_DIALOG_USER_DELETE.ACTION',
            },
            disableClose: true,
        });
        dialogRef.afterClosed().subscribe((req) => {
            if (req === ConfirmationDialogResponse.OK) {
                this.workersService.deleteWorker(worker.id).subscribe({
                    next: () => {
                        this.worker = this.worker.filter(
                            (ds: Worker) => ds.id !== worker.id,
                        );
                        this.dataSource = new MatTableDataSource<Worker>(
                            this.worker,
                        );
                        this.snackService.showSnackBar(
                            'CONFIRMATION_DIALOG_USER_DELETE.SNACK_MESSAGE',
                            SNACK_TYPE.success,
                        );
                        this.workersID = [];
                        this.workersService.getWorkers().subscribe({
                            next: (data) => {
                                this.dataSource =
                                    new MatTableDataSource<Worker>(data);
                                this.isLoadingResults = false;
                            },
                            error: (err) => {
                                console.log(err);
                                this.snackService.showSnackBar(
                                    'ERROR.USERS_GETTING_ERROR',
                                    SNACK_TYPE.error,
                                );
                            },
                        });
                    },
                    error: (err) => {
                        console.log(err);
                        this.snackService.showSnackBar(
                            'ERROR.USER_DELETE_ERROR',
                            SNACK_TYPE.error,
                        );
                    },
                });
            }
        });
    }
    private updateTable(newOrUpdatedPatient: Worker) {
        if (!!this.worker && !!newOrUpdatedPatient) {
            const tableWorkerIndex = this.worker.findIndex(
                (ds: Worker) => ds.name === newOrUpdatedPatient.name,
            );

            if (tableWorkerIndex !== -1) {
                // update
                this.worker[tableWorkerIndex] = newOrUpdatedPatient;
                this.worker = [...this.worker];
                this.dataSource = new MatTableDataSource<Worker>(this.worker);
            } else {
                // new
                this.worker = [...this.worker, newOrUpdatedPatient];
                this.dataSource = new MatTableDataSource<Worker>(this.worker);
            }
        }
    }
}
