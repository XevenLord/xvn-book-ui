import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {AuthReqDto} from "../../services/models/auth-req-dto";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/services/authentication.service";
import {TokenService} from "../../token/token.service";

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  authRequest: AuthReqDto = {email: '', password: ''};
  errorMsg: Array<string> = [];

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private tokenService: TokenService) {
  }

  login() {
    this.errorMsg = [];
    this.authService.authenticate({
      body: this.authRequest
    }).subscribe({
      next: (rsp) => {
        this.tokenService.token = rsp.token as string;
        this.router.navigate(['books']);
      },
      error: (err) => {
        if (err.headers) {
          const headersList = err.headers.keys().map((k: string) => `${k}: ${err.headers?.get(k)}`);
          console.log('Response Headers:', headersList);
        }

        if (err.error.vldErrs) {
          this.errorMsg = err.error.vldErrs
        } else {
          this.errorMsg.push(err.error.errMsg)
        }
      }
    })
  }

  register() {
    this.router.navigate(['register'])
  }
}
