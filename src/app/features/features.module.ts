import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { bearerTokenInterceptor } from '../core/interceptors/bearer-token.interceptor';
import { AdminModule } from './admin/admin.module';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    AdminModule
  ],
  providers: [
    provideHttpClient(withInterceptors([bearerTokenInterceptor]))
  ]
})
export class FeaturesModule { }
