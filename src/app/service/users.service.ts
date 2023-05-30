import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UsersService {
    constructor(private http: HttpClient) {}
    private apiUrl = 'http://localhost/php_rest_api_local/';

    getUsers(): Observable<Array<number>> {
        return this.http.get<Array<number>>(`${this.apiUrl}`);
    }
}
