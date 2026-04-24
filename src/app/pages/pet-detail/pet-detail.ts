import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../../services/supabase.service';
import { FooterComponent } from '../../components/footer/footer';

@Component({
  selector: 'app-pet-detail',
  standalone: true,
  imports: [CommonModule, FooterComponent],
  templateUrl: './pet-detail.html',
  styleUrl: './pet-detail.css'
})
export class PetDetailComponent implements OnInit {
  pet: any = null;
  loading = true;
  adopted = false;
  adopting = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private supabase: SupabaseService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.supabase.getListingById(id)
        .then(data => { this.pet = data; this.loading = false; })
        .catch(() => { this.loading = false; });
    }
  }

  get photos(): string[] {
    if (!this.pet?.photos) return [];
    return Array.isArray(this.pet.photos) ? this.pet.photos : [this.pet.photos];
  }

  selectedPhoto = 0;

  async adopt() {
    if (!this.pet) return;
    this.adopting = true;
    try {
      await this.supabase.deleteListing(this.pet.id);
      this.adopted = true;
    } catch (e) {
      console.error(e);
    }
    this.adopting = false;
  }

  goBack() {
    this.router.navigate(['/']);
  }
}