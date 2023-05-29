import { Component, OnInit } from '@angular/core';

import { ApiService } from '../service/api.service';

@Component({
    selector: 'app-test',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.css'],
})
export class TestComponent implements OnInit {
    constructor(private apiService: ApiService) {}
    items?: any[];

    ngOnInit() {
        this.apiService.getTest().subscribe({
            next: (data) => {
                this.items = data;
            },
            error: (err) => {
                console.log(err);
            },
        });
    }
}
