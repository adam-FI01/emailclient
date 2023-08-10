import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { AbstractControl, AsyncValidator } from "@angular/forms";
import { map, catchError, of } from "rxjs";


@Injectable({providedIn: 'root'})
export class UniqueUsername implements AsyncValidator {

    validate = (control: AbstractControl):any => {
        const {value} = control;
        return this.http.post<any>('https://api.angular-email.com/auth/username', {
            username: value
        }).pipe(map((value: any) => {
            return null
        }),
        catchError((err) => {
            if (err.error.username) {
                return of({ nonUniqueUsername: true })
            } else {
                return of({noConnection: true})
            }
        })
    )}

    constructor(private http: HttpClient) {}
}
