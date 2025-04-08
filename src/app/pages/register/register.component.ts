import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {RegReqDto} from "../../services/models/reg-req-dto";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/services/authentication.service";

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerRequest: RegReqDto = {email: '', firstname: '', lastname: '', password: ''};
  errorMsg: Array<string> = [];

  constructor (
    private router: Router,
    private authService: AuthenticationService
  ) {}

  register() {
    this.errorMsg = [];
    this.authService.register({
      body: this.registerRequest
    }).subscribe({
      next: () => {
        this.router.navigate(['activate-account']);
      },
      error: (err) => {
        this.errorMsg = err.error.vldErrs;
      }
    });
  }

  login() {
    this.router.navigate(['login']);
  }
}
