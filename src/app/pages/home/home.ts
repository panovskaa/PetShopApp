import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent {
  menuOpen = false;
  scrollY = 0;

  aboutCards = [
    {
      title: 'Affordability',
      text: 'We are committed to making high-quality services accessible to all pet owners. We believe that every pet deserves exceptional care, regardless of financial limitations.'
    },
    {
      title: 'Compassion',
      text: 'Built by pet lovers for pet lovers. We believe every animal deserves compassion, care, and a chance to thrive with a family who loves them deeply.'
    },
    {
      title: 'Safe Adoptions',
      text: 'Every listing is verified. Every pet has a story. We ensure transparent and caring connections between animals and their new families.'
    }
  ];

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrollY = window.scrollY;
  }

  getHeroBlur(): string {
    const blur = Math.min(this.scrollY / 80, 14);
    return `blur(${blur}px)`;
  }

  getHeroDim(): string {
    const dim = Math.min(this.scrollY / 600, 0.45);
    return `rgba(0,0,0,${dim})`;
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }
}