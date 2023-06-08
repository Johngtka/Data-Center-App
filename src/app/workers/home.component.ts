import { Component } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent {
    employer!: boolean;

    searchedEmployer(event: boolean): void {
        this.employer = event;
        console.log(event);
    }
}
