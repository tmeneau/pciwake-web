import {Directive}                           from 'angular2/core';
import {AuthenticationService}               from './auth.service';
import {LoginForm}                           from './login.component';
import {ROUTER_DIRECTIVES, Router, Location} from "angular2/router";

/*
 * Stolen from http://stackoverflow.com/a/34335947/2807658
 */
@Directive({
  selector: '[redirect-unauthorized]'
})
export class ProtectedDirective {
  constructor(private authService: AuthenticationService,
              private router:Router,
              private location:Location) {
    if (!authService.isAuthenticated()) {
      this.router.navigate(['Home']);
    }
  }
}