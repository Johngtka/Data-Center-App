import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Worker } from '../models/worker';
import { SnackService, SNACK_TYPE } from '../services/snack.service';
import { WorkersService } from '../services/workers.service';

@Component({
    selector: 'app-worker-input-dialog',
    templateUrl: './worker-input-dialog.component.html',
    styleUrls: ['./worker-input-dialog.component.css'],
})
export class WorkerInputDialogComponent implements OnInit {
    constructor(
        private workersService: WorkersService,
        private snackService: SnackService,
        private dialogRef: MatDialogRef<WorkerInputDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { worker: Worker },
    ) {}

    titleText!: string;
    isEdit!: boolean;
    buttonText!: string;
    registerForm!: FormGroup;
    originalFormValues!: Worker;
    workerId!: number;

    ngOnInit(): void {
        if (this.data?.worker) {
            this.isEdit = true;
            this.buttonText = 'USER_UPDATE.ACTION';
            this.titleText = 'USER_UPDATE.TITLE';
            this.workerId = this.data.worker.id;
            this.registerForm = new FormGroup({
                name: new FormControl(this.data.worker.name, [
                    Validators.required,
                ]),
                surname: new FormControl(this.data.worker.surname, [
                    Validators.required,
                ]),
            });
        } else {
            this.isEdit = false;
            this.buttonText = 'USER_CREATE.ACTION';
            this.titleText = 'USER_CREATE.TITLE';
            this.registerForm = new FormGroup({
                name: new FormControl('', [Validators.required]),
                surname: new FormControl('', [Validators.required]),
                dob: new FormControl('', [Validators.required]),
            });
        }
        this.originalFormValues = this.registerForm.value;
    }

    addEmployer() {
        const worker = this.registerForm.value;
        if (this.isEdit) {
            this.workersService.editWorker(worker, this.workerId).subscribe({
                next: () => {
                    this.dialogRef.close();
                },
                error: (err) => {
                    console.log(err);
                },
            });
        } else {
            this.workersService.newWorker(worker).subscribe({
                next: (newEmployer) => {
                    this.dialogRef.close(newEmployer);
                },
                error: (err) => {
                    console.log(err);
                },
            });
        }
    }

    hasChange() {
        return (
            JSON.stringify(this.registerForm.value) !==
            JSON.stringify(this.originalFormValues)
        );
    }
}
