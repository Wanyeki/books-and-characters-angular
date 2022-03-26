import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharactersComponent } from './characters/characters.component';
import { CommentsComponent } from './comments/comments.component';
import { NewComponent } from './comments/new/new.component';
import { ConsumerComponent } from './consumer/consumer.component';
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [
  {
    path: '', component: LandingComponent
  },
  {
    path: 'consume/comments', component: CommentsComponent
  },
  {
    path: 'consume/comments/new', component: NewComponent
  },
  {
    path: 'consume/characters', component: CharactersComponent
  },
  {
    path: 'consume', component: ConsumerComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
