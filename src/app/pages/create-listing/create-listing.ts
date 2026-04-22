import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-listing.html',
  styleUrls: ['./create-listing.css']
})
export class CreateListingComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  submitSuccess = false;
  photoEntries: { preview: string; name: string }[] = [];
  photoInputMode: 'file' | 'url' = 'file';
  urlInput = new FormControl('', [
    Validators.pattern(/^https?:\/\/.+/)
  ]);

  petTypes = ['Dog', 'Cat', 'Rabbit', 'Bird', 'Other'];
  sizes = ['Small', 'Medium', 'Large'];
  genders = ['Male', 'Female'];

  constructor(private fb: FormBuilder) {}

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
        this.photos.push(new FormControl({ type: 'file', file, preview: e.target?.result }));
        this.photoEntries.push({ preview: e.target?.result as string, name: file.name });
      };
      reader.readAsDataURL(file);
    });
  }

  addPhotoUrl(): void {
    if (this.urlInput.invalid || !this.urlInput.value) return;
    const url = this.urlInput.value;
    this.photos.push(new FormControl({ type: 'url', url, preview: url }));
    this.photoEntries.push({ preview: url, name: url });
    this.urlInput.reset();
  }

  removePhoto(index: number): void {
    this.photos.removeAt(index);
    this.photoEntries.splice(index, 1);
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      const firstInvalid = document.querySelector('.field-error');
      (firstInvalid as HTMLElement)?.focus();
      return;
    }
    console.log(this.form.value);
    this.submitSuccess = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  resetForm(): void {
    this.submitted = false;
    this.submitSuccess = false;
    this.photoEntries = [];
    while (this.photos.length) this.photos.removeAt(0);
    this.form.reset({ listingInfo: { rehomingFee: 0 } });
  }
}