import { Component, OnInit, PLATFORM_ID, ViewChild, ElementRef } from '@angular/core';
import { CommonModule} from '@angular/common';
import emailjs from '@emailjs/browser';
import { SupabaseService } from '../../services/supabase.service';
import {FooterComponent} from '../../components/footer/footer';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';



function atLeastOnePhoto(control: AbstractControl): ValidationErrors | null {
  const arr = control as FormArray;
  return arr.length > 0 ? null : { noPhotos: true };
}

@Component({
  selector: 'app-create-listing',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FooterComponent],
  templateUrl: './create-listing.html',
  styleUrls: ['./create-listing.css']
})
export class CreateListingComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  submitSuccess = false;
  photoEntries: { preview: string; name: string; type: 'file' | 'url' }[] = [];
  photoInputMode: 'file' | 'url' = 'file';
  urlInput = new FormControl('', [
    Validators.pattern(/^https?:\/\/.+/)
  ]);

  petTypes = ['Dog', 'Cat', 'Rabbit', 'Bird', 'Other'];
  sizes = ['Small', 'Medium', 'Large'];
  genders = ['Male', 'Female'];

  constructor(
    private fb: FormBuilder,
    private supabaseService: SupabaseService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      petInfo: this.fb.group({
        petType:  ['', Validators.required],
        breed:    ['', [Validators.required, Validators.minLength(2)]],
        name:     ['', [Validators.required, Validators.minLength(2)]],
        age:      [null, [Validators.required, Validators.min(0), Validators.max(30)]],
        size:     ['', Validators.required],
        gender:   ['', Validators.required],
        color:    ['']
      }),
      healthInfo: this.fb.group({
        hasCertificate: [false],
        isVaccinated:   [false],
        isNeutered:     [false],
        healthNotes:    ['', Validators.maxLength(500)]
      }),
      photos: this.fb.array([], atLeastOnePhoto),
      listingInfo: this.fb.group({
        title:        ['', [Validators.required, Validators.minLength(5), Validators.maxLength(80)]],
        description:  ['', [Validators.required, Validators.minLength(30)]],
        location:     ['', Validators.required],
        contactEmail: ['', [Validators.required, Validators.email]],
        contactPhone: ['', Validators.pattern(/^[+\d\s\-()]{7,15}$/)],
        rehomingFee:  [0, [Validators.required, Validators.min(0)]]
      })
    });
  }

  get petInfo(): FormGroup { return this.form.get('petInfo') as FormGroup; }
  get healthInfo(): FormGroup { return this.form.get('healthInfo') as FormGroup; }
  get photos(): FormArray { return this.form.get('photos') as FormArray; }
  get listingInfo(): FormGroup { return this.form.get('listingInfo') as FormGroup; }

  field(group: FormGroup, name: string): FormControl {
    return group.get(name) as FormControl;
  }

  isInvalid(group: FormGroup, name: string): boolean {
    const c = group.get(name)!;
    return c.invalid && (c.touched || c.dirty || this.submitted);
  }

  getError(group: FormGroup, name: string): string {
    const c = group.get(name)!;
    if (!c.errors) return '';
    if (c.errors['required'])   return `This field is required.`;
    if (c.errors['minlength'])  return `Minimum ${c.errors['minlength'].requiredLength} characters.`;
    if (c.errors['maxlength'])  return `Maximum ${c.errors['maxlength'].requiredLength} characters.`;
    if (c.errors['min'])        return `Minimum value is ${c.errors['min'].min}.`;
    if (c.errors['max'])        return `Maximum value is ${c.errors['max'].max}.`;
    if (c.errors['email'])      return `Please enter a valid email address.`;
    if (c.errors['pattern'])    return `Invalid format.`;
    return 'Invalid value.';
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;
    
    Array.from(input.files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const previewUrl = e.target?.result as string;
        this.photos.push(new FormControl({ type: 'file', file, preview: previewUrl }));
        this.photoEntries.push({ 
          preview: previewUrl, 
          name: file.name,
          type: 'file'
        });
      };
      reader.readAsDataURL(file);
    });
    
    // Reset the input so the same file can be selected again
    input.value = '';
  }

  addPhotoUrl(): void {
    if (this.urlInput.invalid || !this.urlInput.value) return;
    const url = this.urlInput.value;
    this.photos.push(new FormControl({ type: 'url', url, preview: url }));
    this.photoEntries.push({ 
      preview: url, 
      name: url,
      type: 'url'
    });
    this.urlInput.reset();
  }

  removePhoto(index: number): void {
    this.photos.removeAt(index);
    this.photoEntries.splice(index, 1);
  }

  async onSubmit(): Promise<void> {
  this.submitted = true;
  if (this.form.invalid) {
    const firstInvalid = document.querySelector('.field-error');
    (firstInvalid as HTMLElement)?.focus();
    return;
  }

  const v = this.form.value;

  const listing = {
    pet_type:        v.petInfo.petType,
    breed:           v.petInfo.breed,
    pet_name:        v.petInfo.name,
    age:             v.petInfo.age,
    size:            v.petInfo.size,
    gender:          v.petInfo.gender,
    color:           v.petInfo.color,
    has_certificate: v.healthInfo.hasCertificate,
    is_vaccinated:   v.healthInfo.isVaccinated,
    is_neutered:     v.healthInfo.isNeutered,
    health_notes:    v.healthInfo.healthNotes,
    photos:          this.photoEntries.map(p => p.preview),
    title:           v.listingInfo.title,
    description:     v.listingInfo.description,
    location:        v.listingInfo.location,
    rehoming_fee:    v.listingInfo.rehomingFee,
    contact_email:   v.listingInfo.contactEmail,
    contact_phone:   v.listingInfo.contactPhone
  };

  try {
    await this.supabaseService.createListing(listing);
    this.submitSuccess = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch (err) {
    console.error('Failed to save listing:', err);
    alert('Something went wrong. Please try again.');
  }

  emailjs.send(
    'service_71cb1yl',
    'template_ai47mrm',
    {
      to_email:      v.listingInfo.contactEmail,
      pet_name:      v.petInfo.name,
      pet_type:      v.petInfo.petType,
      breed:         v.petInfo.breed,
      age:           v.petInfo.age,
      location:      v.listingInfo.location,
      description:   v.listingInfo.description,
      contact_email: v.listingInfo.contactEmail,
      contact_phone: v.listingInfo.contactPhone || 'N/A',
      rehoming_fee:  v.listingInfo.rehomingFee
    },
    'rB2gw9rizcyqb9XWc'
  ).then(() => {
    this.submitSuccess = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }).catch((err) => {
    console.error('Email error:', err);
    alert('Something went wrong sending the email. Please try again.');
  });
}

  resetForm(): void {
    this.submitted = false;
    this.submitSuccess = false;
    this.photoEntries = [];
    while (this.photos.length) this.photos.removeAt(0);
    this.form.reset({ listingInfo: { rehomingFee: 0 } });
  }

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }
}