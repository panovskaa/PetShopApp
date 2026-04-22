export type PetType = 'dog' | 'cat' | 'rabbit' | 'bird' | 'other';
export type PetSize = 'small' | 'medium' | 'large';
export type PetGender = 'male' | 'female';

export interface PetInfo {
  petType: PetType;
  breed: string;
  name: string;
  age: number;
  size: PetSize;
  gender: PetGender;
  color: string;
}

export interface HealthInfo {
  hasCertificate: boolean;
  isVaccinated: boolean;
  isNeutered: boolean;
  healthNotes: string;
}

export interface PhotoEntry {
  type: 'file' | 'url';
  file?: File;
  url?: string;
  preview: string;
}

export interface ListingInfo {
  title: string;
  description: string;
  location: string;
  contactEmail: string;
  contactPhone: string;
  rehomingFee: number;
}

export interface PetListing {
  petInfo: PetInfo;
  healthInfo: HealthInfo;
  photos: PhotoEntry[];
  listingInfo: ListingInfo;
}