import { Component, ViewChild }       from "angular2/core";
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
    for (var key in this.loginForm.controls) {
      this.loginForm.controls[key].value = "";
    }
  }

  open() {
    this.modal.open('sm');
  }

  login() {
    this.authService.authenticate(
      this.loginForm.value.username,
      this.loginForm.value.password
    ).subscribe(
      data => {
        this.error = null;
        this.success = data.message;
        this._clearLoginForm();
        this.modal.close();
        setTimeout(() => this.success = null, 500);
      },
      err => this.error = err.message
    );
  }

  logout() {
    this._loggingOut = true;
    this.modal.open();
    this.authService.destroySession().subscribe(
      () => {
        this.modal.close()
        setTimeout(() => this._loggingOut = false, 500)
        this._router.navigate(['Home'])
      }
    );

  }
}