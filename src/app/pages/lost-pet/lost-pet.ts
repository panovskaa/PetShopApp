import { Component } from '@angular/core';
import { CardListing } from '../../components/card-listing/card-listing';

@Component({
  selector: 'page-lost-pet',
  imports: [CardListing],
  templateUrl: './lost-pet.html',
  styleUrl: './lost-pet.css',
})
export class PageLostPet {}
