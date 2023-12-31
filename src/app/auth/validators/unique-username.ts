import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator } from "@angular/forms";
import { map, catchError, of } from "rxjs";
import { AuthService } from "../auth.service";


@Injectable({providedIn: 'root'})
export class UniqueUsername implements AsyncValidator {

    validate = (control: AbstractControl):any => {
        const {value} = control;
        return this.authService.usernameAvailable(value).pipe(map((value: any) => {
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

    constructor(private authService: AuthService) {}
}
