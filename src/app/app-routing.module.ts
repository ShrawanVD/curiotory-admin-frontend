import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogsComponent } from './blogs/blogs.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PressComponent } from './press/press.component';
import { SettingsComponent } from './settings/settings.component';
import { LoginComponent } from './login/login.component';
import { AfterLoginComponent } from './after-login/after-login.component';
import { AuthGuard } from './guards/auth.guard';
// import { PressComponent } from './press/press.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'dashboard', component: AfterLoginComponent, children: [
      { path: 'dash', component: DashboardComponent },
      // { path: 'lms', component: StatisticsComponent },
      { path: 'blogs', component: BlogsComponent },
      { path: 'press', component: PressComponent },
      // { path: 'press', component: PressComponent },
      // { path: 'client', component: LeadsComponent },
      // { path: 'media', component: MediaComponent },
      // { path: 'lms', component: DashboardComponent },
      { path: 'settings', component: SettingsComponent },
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
