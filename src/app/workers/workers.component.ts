import { Component } from '@angular/core';

@Component({
    selector: 'app-workers',
    templateUrl: './workers.component.html',
    styleUrls: ['./workers.component.css'],
})
export class WorkersComponent {
    employer!: boolean;

    searchedEmployer(event: boolean): void {
        this.employer = event;
        console.log(event);
    }
}
