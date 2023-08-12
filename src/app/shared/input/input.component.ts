import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {
  @Input() label!: string;
  @Input() type!: string;
  @Input() placeholder!: string;
  @Input() control!: FormControl;

  showErrors() {
    const {dirty, touched, errors} = this.control;
    return dirty && touched && errors;
  }


  constructor() {}

}
