import { Component, HostListener, OnInit, AfterViewInit, ElementRef, ViewChild, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SupabaseService } from '../../services/supabase.service';
import { FooterComponent } from "../../components/footer/footer";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, FooterComponent],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('deckWrap') deckWrapRef!: ElementRef<HTMLElement>;

  menuOpen = false;
  isScrolled = false;
  scrollY = 0;
  dogs: any[] = [];
  hoveredIndex: number | null = null;
  private containerWidth = 0;

  aboutCards = [
    { title: 'Affordability', text: 'We are committed to making high-quality services accessible to all pet owners. We believe that every pet deserves exceptional care, regardless of financial limitations.' },
    { title: 'Compassion', text: 'Built by pet lovers for pet lovers. We believe every animal deserves compassion, care, and a chance to thrive with a family who loves them deeply.' },
    { title: 'Safe Adoptions', text: 'Every listing is verified. Every pet has a story. We ensure transparent and caring connections between animals and their new families.' }
  ];

  constructor(private supabaseService: SupabaseService, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
  this.loadDogs();
  }

  ngAfterViewInit(): void {
  this.updateContainerWidth();

  if (!isPlatformBrowser(this.platformId)) return;

  const el = document.querySelector('.care-text-anim');
  if (!el) return;
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        el.classList.add('in-view');
        observer.disconnect();
      }
    },
    { threshold: 0.5 }
  );
  observer.observe(el);
}

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrollY = window.scrollY;
    this.isScrolled = this.scrollY > 50;
  }

  @HostListener('window:resize')
  onResize(): void {
    this.updateContainerWidth();
    this.loadDogs();
  }

private getDogLimit(): number {
  if (!isPlatformBrowser(this.platformId)) return 12;
  return window.innerWidth < 768 ? 8 : 12;
}

private loadDogs(): void {
  this.supabaseService.getDogsForDisplay(this.getDogLimit())
    .then(data => this.dogs = data || [])
    .catch(err => console.error('Failed to load dogs:', err));
}

  private updateContainerWidth(): void {
    const el = this.deckWrapRef?.nativeElement;
    this.containerWidth = el ? el.offsetWidth : window.innerWidth;
  }

  getHeroBlur(): string {
    return `blur(${Math.min(this.scrollY / 80, 14)}px)`;
  }

  getHeroDim(): string {
    return `rgba(0,0,0,${Math.min(this.scrollY / 600, 0.45)})`;
  }

  toggleMenu(): void { this.menuOpen = !this.menuOpen; }
  closeMenu(): void {
    if (window.matchMedia('(hover: hover)').matches) this.menuOpen = false;
  }

  onMenuLinkTouch(event: TouchEvent): void {
    const el = event.currentTarget as HTMLElement;
    el.style.color = '#F2A7C3';
    el.style.paddingLeft = '10px';
    setTimeout(() => { el.style.color = ''; el.style.paddingLeft = ''; }, 300);
  }

  getDogPhoto(dog: any): string {
    const photos = dog.photos;
    if (!photos || photos.length === 0) return 'https://placehold.co/300x400?text=No+Photo';
    return Array.isArray(photos) ? photos[0] : photos[0];
  }

  getCardStyle(index: number): any {
    const isHovered = this.hoveredIndex === index;
    const isAfterHovered = this.hoveredIndex !== null && index > this.hoveredIndex;
    const cardWidth = 220;
    const inset = 20;
    const total = this.dogs.length;
    const innerWidth =
      (this.containerWidth ||
        (isPlatformBrowser(this.platformId) ? window.innerWidth : 960)) -
      inset * 2;

    let baseX: number;
    if (total <= 1) {
      baseX = inset + (innerWidth - cardWidth) / 2;
    } else {
      const step = (innerWidth - cardWidth) / (total - 1);
      baseX = inset + index * step;
      if (isAfterHovered) baseX += 100;
    }

    return {
      left: '0',
      width: `${cardWidth}px`,
      height: '420px',
      transform: `translateX(${baseX}px)${isHovered ? ' translateY(-16px) scale(1.04)' : ''}`,
      zIndex: isHovered ? 100 : index,
      transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1)',
    };
  }
}