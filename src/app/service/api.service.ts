import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    constructor(private http: HttpClient) {}
    private apiUrl = 'http://localhost/api/api.php';

    getTest(): Observable<Array<number>> {
        return this.http.get<Array<number>>(`${this.apiUrl}`);
    }
}
