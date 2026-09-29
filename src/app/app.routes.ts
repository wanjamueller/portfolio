import { Routes } from '@angular/router';
import { About } from './layout/main/about/about';
import { Skills } from './layout/main/skills/skills';
import { Projects } from './layout/main/projects/projects';
import { Contact } from './layout/main/contact/contact';
import { Main } from './layout/main/main';

export const routes: Routes = [
  { path: '', component: Main },
  { path: 'about', component: About },
  { path: 'skills', component: Skills },
  { path: 'projects', component: Projects },
  { path: 'contact', component: Contact },
  { path: '**', redirectTo: '' },
];
