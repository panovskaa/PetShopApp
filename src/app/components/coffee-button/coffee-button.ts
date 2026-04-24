import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-coffee-button',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './coffee-button.html',
  styleUrl: './coffee-button.css'
})
export class CoffeeButtonComponent {
  constructor(public router: Router) {}

  get isDonatePage(): boolean {
    return this.router.url === '/donate';
  }
}