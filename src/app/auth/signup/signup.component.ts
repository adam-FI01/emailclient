import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatchPassword } from '../validators/match-password';
import { UniqueUsername } from '../validators/unique-username';
import { AuthService, SignupCridentials } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  authForm = new FormGroup({
    username: new FormControl('',[ 
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-z0-9]+$/),
    ], [this.uniqueUsername.validate]),
    password: new FormControl('',[
     Validators.required,
     Validators.minLength(4),
     Validators.maxLength(20)
    ]),
    passwordConfirmation: new FormControl('',[ 
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(20)
    ]),
  }, {validators: [this.matchPassword.validate]}
  );

  onSubmit() {
    if (this.authForm.invalid) {
      return;
    } else {
      this.authService.signUp(this.authForm.value as SignupCridentials).subscribe({

        next: (response) => {
          
        },

        complete() {
          /* this.signIn; */
        },
         
        error: (err) => {
          if (!err.status) {
            this.authForm.setErrors({noConnection: true})
          } else {
            this.authForm.setErrors({unknownError: true})
          }
        }

      })
  }
}

  constructor(private matchPassword: MatchPassword, private uniqueUsername: UniqueUsername, private authService: AuthService, private router: Router) {
    const signIn = this.router.navigate(['/sign-in'])
  }

}
