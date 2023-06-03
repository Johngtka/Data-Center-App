import { Component, OnInit } from '@angular/core';

import { Worker } from '../models/worker';
import { WorkersService } from '../services/workers.service';
@Component({
    selector: 'app-workers',
    templateUrl: './workers.component.html',
    styleUrls: ['./workers.component.css'],
})
export class WorkersComponent implements OnInit {
    constructor(private workersService: WorkersService) {}
    dataSource!: Worker[];
    isLoadingResults = true;
    displayedColumns: string[] = ['id', 'fullName', 'dob'];

    ngOnInit(): void {
        this.workersService.getUsers().subscribe({
            next: (data: Array<Worker>) => {
                this.dataSource = data;
                this.isLoadingResults = false;
            },
            error: (err) => {
                console.log(err);
            },
        });
    }
}
