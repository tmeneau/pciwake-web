import { Component,
         ViewChild,
         Output,
         EventEmitter }               from "angular2/core";
import { ControlGroup,
         FormBuilder,
         Validators }                 from 'angular2/common';
import { Router }                     from 'angular2/router';

import { AuthenticationService }      from './auth.service';
import { ProtectedDirective }         from './auth.directive';

import { MODAL_DIRECTIVES, ModalComponent } from 'ng2-bs3-modal/dist/ng2-bs3-modal';

@Component({
  selector: "login-form",
  directives: [MODAL_DIRECTIVES, ProtectedDirective],
  templateUrl: "app/shared/auth/login.component.html"
})
export class LoginForm {
  private loginForm: ControlGroup;
  private error: string;
  private success: string;
  private _loggingOut: boolean = false;

  private _username: String
  private _password: String;

  @Output() loginSuccess = new EventEmitter();
  @Output() loginFailure = new EventEmitter();
  @Output() logoutSuccess = new EventEmitter();

  @ViewChild(ModalComponent) modal: ModalComponent;
  constructor(private fb: FormBuilder,
              private _router: Router,
              public authService: AuthenticationService) {
    this.loginForm = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  private _clearLoginForm(): void {
    this._username = null;
    this._password = null;
  }

  open() {
    this.modal.open('md');
  }

  login() {
    this.authService.authenticate(
      this._username,
      this._password
    ).subscribe(
      data => {
        this.error = null;
        this.success = data.message;
        this.loginSuccess.emit(null);
        this._clearLoginForm();
        this.modal.close();
        setTimeout(() => this.success = null, 500);
      },
      err => {
        this.loginFailure.emit(err.message);
        this.error = err.message;
      }
    );
  }

  logout() {
    this._loggingOut = true;
    this.modal.open();
    this.authService.destroySession().subscribe(
      () => {
        this.logoutSuccess.emit(null);
        this.modal.close();
        this._router.navigate(['Home']);
        setTimeout(() => this._loggingOut = false, 500);
      }
    );

  }
}