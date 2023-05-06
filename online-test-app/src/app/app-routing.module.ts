import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddQuestionComponent } from './add-question/add-question.component';
import { AuthGuard } from './auth.guard';
import { HeaderComponent } from './header/header.component';

import { LoginFormComponent } from './login-form/login-form.component';

import { QuizComponent } from './quiz/quiz.component';
import { RegisterationFormComponent } from './registeration-form/registeration-form.component';

const routes: Routes = [
  { path: '', component: LoginFormComponent },
  { path: 'registeration-form', component: RegisterationFormComponent },
  {
    path: '',
    component: HeaderComponent,
    children: [
      { path: 'quiz', component: QuizComponent },
      { path: 'add-question', component: AddQuestionComponent },
    ],
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
