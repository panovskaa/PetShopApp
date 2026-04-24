import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Supporter {
  name: string;
  count: number;
  message?: string;
}

@Component({
  selector: 'app-donate',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './donate.html',
  styleUrl: './donate.css'
})
export class DonateComponent {
  selectedCount = 1;
  donorName = '';
  donorMessage = '';
  makeMonthly = false;
  thankYou = false;
  showAll = false;
  supporterCount = 42;

  supporters: Supporter[] = [
    { name: 'Mark', count: 1, message: 'Thanks, Mark!' },
    { name: 'Someone', count: 5, message: 'Love this platform! Keep helping pets find homes.' },
    { name: 'Ana', count: 1 },
  ];

  get visibleSupporters() {
    return this.showAll ? this.supporters : this.supporters.slice(0, 3);
  }

  toggleShowAll() {
    this.showAll = !this.showAll;
  }

  onSupport() {
    if (!this.donorName.trim()) return;
    this.supporters.unshift({
      name: this.donorName,
      count: this.selectedCount,
      message: this.donorMessage || undefined
    });
    this.supporterCount++;
    this.thankYou = true;
    this.donorName = '';
    this.donorMessage = '';
    this.selectedCount = 1;
    setTimeout(() => this.thankYou = false, 4000);
  }
}