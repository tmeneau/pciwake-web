import { Component, ViewChild }       from "angular2/core";
import { ControlGroup,
         FormBuilder,
         Validators }                 from 'angular2/common';


import { AuthenticationService }      from '../service/authentication.service';
import { ProtectedDirective }         from '../directive/auth.directive';

import { MODAL_DIRECTIVES, ModalComponent } from 'ng2-bs3-modal';

@Component({
  selector: "login-form",
  directives: [MODAL_DIRECTIVES, ProtectedDirective],
  templateUrl: "template/html/login.component.html"
})
export class LoginForm {
  private loginForm: ControlGroup;
  @ViewChild(ModalComponent) modal: ModalComponent;
  constructor(private fb: FormBuilder,
              public authService: AuthenticationService) {
    this.loginForm = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  private _clearLoginForm(): void {
    for (var key in this.loginForm.controls) {
      this.loginForm.controls[key].updateValueAndValidity("");
    }
  }

  open() {
    this.modal.open();
  }

  login() {
    this.authService.authenticate(
      this.loginForm.value.username,
      this.loginForm.value.password
    );
    this._clearLoginForm();
    this.modal.close();
  }
}