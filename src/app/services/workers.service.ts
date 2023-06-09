import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Worker } from '../models/worker';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class WorkersService {
    constructor(private http: HttpClient) {}
    private apiUrl = environment.API_URL;

    getWorkers(): Observable<Array<Worker>> {
        return this.http.get<Array<Worker>>(`${this.apiUrl}`);
    }

    searchWorker(data: Worker): Observable<Array<Worker>> {
        const body = { find: true, name: data };
        return this.http.post<Array<Worker>>(`${this.apiUrl}`, body);
    }

    newWorker(data: Worker): Observable<Worker> {
        const body = {
            new: true,
            name: data.name,
            surName: data.surname,
            dob: data.dob,
        };
        return this.http.post<Worker>(`${this.apiUrl}`, body);
    }

    editWorker(data: Worker): Observable<Worker> {
        const body = {
            edit: true,
            newName: data.name,
            newSurName: data.surname,
            Id: data.id,
        };
        return this.http.post<Worker>(`${this.apiUrl}`, body);
    }

    deleteWorker(data: number): Observable<Worker> {
        const body = { del: true, workerId: data };
        return this.http.post<Worker>(`${this.apiUrl}`, body);
    }
}
