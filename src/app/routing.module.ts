import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [{
  path: '',
  component: LoginComponent
},{
  path: 'main',
  component: MainpageComponent,
  canActivate: [AuthGuard]
},{
  path: '**',
  redirectTo: 'login'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
