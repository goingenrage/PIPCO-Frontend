import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { AuthGuard } from './shared/auth.guard';
import { SettingspageComponent } from './settingspage/settingspage.component';

const routes: Routes = [{
  path: '',
  component: LoginComponent
},{
  path: 'main',
  component: MainpageComponent,
  canActivate: [AuthGuard]
},{
  path: 'settings',
  component: SettingspageComponent,
  canActivate: [AuthGuard]
},{
  path: '**',
  redirectTo: ''
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
