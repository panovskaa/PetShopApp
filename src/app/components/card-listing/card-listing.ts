import { Component, input } from '@angular/core';

@Component({
  selector: 'card-listing',
  imports: [],
  templateUrl: './card-listing.html',
  styleUrl: './card-listing.css',
})
export class CardListing {
  cardTitle = input.required<string>();
  cardDescription = input.required<string>();
  cardImage = input<string>();
}
