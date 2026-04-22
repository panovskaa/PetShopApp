import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { PageAdopt } from './pages/adopt/adopt';
import { PageLostPet } from './pages/lost-pet/lost-pet';
import { CreateListingComponent } from './pages/create-listing/create-listing';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home',
  },
  {
    path: 'adopt',
    component: PageAdopt,
    title: 'Adopt',
  },
  {
    path: 'lost-pet',
    component: PageLostPet,
    title: 'Lost Pet',
  },
  {
    path: 'create-listing',
    component: CreateListingComponent,
    title: 'Create Listing',
  },
];
