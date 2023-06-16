import {UpdateDataComponent} from './components/update-data/update-data.component';
import {Component, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {CategoryComponent} from './components/category/category.component';
import {QuestionsComponent} from './components/questions/questions.component';
import {SigninComponent} from './components/signin/signin.component';
import {SignupComponent} from './components/signup/signup.component';
import {EndScreenComponent} from './components/end-screen/end-screen.component';
import {AddDataComponent} from './components/add-data/add-data.component';
import {TokenGuard} from './guards/token.guard';
import {ModifyDataComponent} from './components/modify-data/modify-data.component';
import {UpdateCategoryComponent} from './components/update-category/update-category.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'signin',
    component: SigninComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'categories',
    component: CategoryComponent,
  },
  {
    path: 'questions/:categoryId',
    component: QuestionsComponent,
  },
  {
    path: 'end/:points',
    component: EndScreenComponent,
  },
  {
    path: 'addData',
    component: AddDataComponent,
    canActivate: [TokenGuard],
  },
  {
    path: 'modify',
    component: ModifyDataComponent,
    canActivate: [TokenGuard],
  },
  {
    path: 'update-question/:id',
    component: UpdateDataComponent,
    canActivate: [TokenGuard],
  },
  {
    path: 'update-category/:id',
    component: UpdateCategoryComponent,
    canActivate: [TokenGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
