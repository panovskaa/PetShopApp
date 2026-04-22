import { Component, input, OnChanges, signal, SimpleChanges } from '@angular/core';

@Component({
  selector: 'dynamic-image',
  imports: [],
  templateUrl: './dynamic-image.html',
  styleUrl: './dynamic-image.css',
})
export class DynamicImage implements OnChanges {
  isValidImage = signal<boolean>(false);
  imageUrl = input.required<string>();

  ngOnChanges(changes: SimpleChanges<DynamicImage>): void {
    const value = changes.imageUrl?.currentValue;
    try {
      new URL(value || '');
      this.isValidImage.set(true);
    } catch (error) {
      this.isValidImage.set(false);
    }
  }
}
