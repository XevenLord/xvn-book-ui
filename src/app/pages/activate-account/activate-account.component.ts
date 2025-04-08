import { Component } from '@angular/core';
import {AuthenticationService} from "../../services/services/authentication.service";
import {Router} from "@angular/router";
import {CodeInputModule} from "angular-code-input";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-activate-account',
  imports: [CodeInputModule, CommonModule],
  templateUrl: './activate-account.component.html',
  styleUrl: './activate-account.component.css'
})
export class ActivateAccountComponent {

  message: string = '';
  isOkay: boolean = true;
  submitted: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) { }

  onCodeCompleted(token: string) {
    this.confirmAccount(token);
  }

  redirectToLogin() {
    this.router.navigate(['login']);
  }

  private confirmAccount(token: string) {
    this.authService.confirm({
      token
    }).subscribe({
      next: () => {
        this.message = 'Your account has been activated successfully. Please login to continue.';
        this.submitted = true;
        this.isOkay = true;
      },
      error: () => {
        this.message = 'Invalid or expired activation code.';
        this.submitted = true;
        this.isOkay = false;
      }
    });
  }
}
