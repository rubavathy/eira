import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from '../login/login.component';
import { UserSiteMappingComponent } from './user-site-mapping/user-site-mapping.component';

const routes: Routes = [
  {
    path: 'user-site-mapping',
    component: UserSiteMappingComponent,
  },
  { path: '', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserSiteMappingRouteingModule {}
