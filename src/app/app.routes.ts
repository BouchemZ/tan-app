import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Timer } from './pages/timer/timer';
import { Profile } from './pages/profile/profile';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'profile', component: Profile },
  { path: 'timer', component: Timer }
];
