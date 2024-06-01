import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DogListComponent } from './pages/dog-list/dog-list.component';
import { DogDetailsComponent } from './pages/dog-details/dog-details.component';

const routes: Routes = [
  {
    path: '',
    component: DogListComponent
  },
  {
    path: 'dog-details/:id',
    component: DogDetailsComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
