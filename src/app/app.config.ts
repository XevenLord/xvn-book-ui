import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptors} from '@angular/common/http'; // 👈 import this

import { routes } from './app.routes';
import {httpTokenInterceptor} from "./services/interceptor/http-token.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([httpTokenInterceptor])
    )
  ]
};
