import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://gdiroxlvcowutptumkgu.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdkaXJveGx2Y293dXRwdHVta2d1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY4OTkzNTIsImV4cCI6MjA5MjQ3NTM1Mn0.WOIASvJXqLZ01xyVfpn5iyG-ChSnqcsO4EgYFok5QVE';

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
  }

  async createListing(data: any) {
    const { error } = await this.supabase
      .from('listings')
      .insert(data);
    if (error) throw error;
  }

  async getDogsForDisplay(limit = 12) {
  const { data, error } = await this.supabase
    .from('listings')
    .select('id, pet_name, age, photos, breed')
    .limit(limit);
  if (error) throw error;
  return data;
  }
}