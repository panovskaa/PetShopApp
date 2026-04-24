import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  menuOpen = false;
  isScrolled = false;

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled = window.scrollY > 40;
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
  if (window.matchMedia('(hover: hover)').matches) {
    this.menuOpen = false;
  }
  }

  onMenuLinkTouch(event: TouchEvent): void {
  const el = event.currentTarget as HTMLElement;
  el.style.color = '#F2A7C3';
  el.style.paddingLeft = '10px';
  setTimeout(() => {
    el.style.color = '';
    el.style.paddingLeft = '';
  }, 300);
}
}