import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormGroup,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatProgressBar } from '@angular/material/progress-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AppLoaderService } from 'src/app/shared/services/app-loader/app-loader.service';
import { JwtAuthService } from 'src/app/shared/services/auth/jwt-auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatProgressBar) progressBar!: MatProgressBar;
  @ViewChild(MatButton) submitButton!: MatButton;

  signinForm: UntypedFormGroup;
  errorMsg = '';
  // return: string;

  private _unsubscribeAll: Subject<any>;

  constructor(
    private jwtAuth: JwtAuthService,
    private matxLoader: AppLoaderService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this._unsubscribeAll = new Subject();
    this.signinForm = new UntypedFormGroup({
      username: new UntypedFormControl('Watson', Validators.required),
      password: new UntypedFormControl('12345678', Validators.required),
      rememberMe: new UntypedFormControl(true),
    });
  }

  ngOnInit() {
    // this.route.queryParams
    //   .pipe(takeUntil(this._unsubscribeAll))
    //   .subscribe(params => this.return = params['return'] || '/');
  }

  ngAfterViewInit() {
    this.autoSignIn();
  }

  ngOnDestroy() {
    this._unsubscribeAll.next(1);
    this._unsubscribeAll.complete();
  }

  signin() {
    const signinData = this.signinForm.value;

    this.submitButton.disabled = true;
    this.progressBar.mode = 'indeterminate';

    this.jwtAuth.signin(signinData.username, signinData.password).subscribe({
      next: (response) => {
        this.router.navigate([this.jwtAuth.return]);
      },
      error: (err) => {
        this.submitButton.disabled = false;
        this.progressBar.mode = 'determinate';
        this.errorMsg = err.message;
        console.log(err);
      },
    });
  }

  autoSignIn() {
    if (this.jwtAuth.return === '/') {
      return;
    }
    this.matxLoader.open(
      `Automatically Signing you in! \n Return url: ${this.jwtAuth.return
        .toString()
        .substring(0, 20)}...`,
      { width: '320px' }
    );
    setTimeout(() => {
      this.signin();
      console.log('autoSignIn');
      this.matxLoader.close();
    }, 2000);
  }
}
