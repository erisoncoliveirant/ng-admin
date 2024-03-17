import { Component, OnInit, ViewChild } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatProgressBar } from '@angular/material/progress-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  @ViewChild(MatProgressBar) progressBar!: MatProgressBar;
  @ViewChild(MatButton) submitButton!: MatButton;

  signupForm!: UntypedFormGroup;
  constructor() {}

  ngOnInit() {
    const password = new UntypedFormControl('', Validators.required);

    this.signupForm = new UntypedFormGroup({
      email: new UntypedFormControl('', [
        Validators.required,
        Validators.email,
      ]),
      password: password,
      agreed: new UntypedFormControl('', (control): any => {
        const agreed = control.value;
        if (!agreed) {
          return { agreed: true };
        }
        return null;
      }),
    });
  }

  signup() {
    const signupData = this.signupForm.value;
    console.log(signupData);

    this.submitButton.disabled = true;
    this.progressBar.mode = 'indeterminate';
  }
}
