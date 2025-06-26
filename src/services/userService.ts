import { supabase } from './supabase';

export interface UserProfile {
  id: string;
  full_name?: string;
  gender?: string;
  onboarding_completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface Goal {
  id: string;
  user_id: string;
  category: string;
  target_value: number;
  unit: string;
  start_date: string;
  created_at: string;
  updated_at: string;
}

export interface TrackingEntry {
  id: string;
  user_id: string;
  category: string;
  value: number;
  unit: string;
  date: string;
  created_at: string;
  updated_at: string;
}

// Create user profile after sign up
export const createUserProfile = async (userId: string, fullName?: string, gender?: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .insert({
      id: userId,
      full_name: fullName,
      gender: gender,
      onboarding_completed: false
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Get user profile
export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null; // No rows found
    throw error;
  }

  return data;
};

// Mark onboarding as completed
export const completeOnboarding = async (userId: string) => {
  const { error } = await supabase
    .from('profiles')
    .update({ onboarding_completed: true, updated_at: new Date().toISOString() })
    .eq('id', userId);

  if (error) throw error;
};

// Save goal
export const saveGoal = async (userId: string, category: string, targetValue: number, unit: string) => {
  const { data, error } = await supabase
    .from('goals')
    .upsert({
      user_id: userId,
      category,
      target_value: targetValue,
      unit,
      updated_at: new Date().toISOString()
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Get user goals
export const getUserGoals = async (userId: string): Promise<Goal[]> => {
  const { data, error } = await supabase
    .from('goals')
    .select('*')
    .eq('user_id', userId);

  if (error) throw error;
  return data || [];
};

// Save tracking entry
export const saveTrackingEntry = async (userId: string, category: string, value: number, unit: string, date?: string) => {
  const { data, error } = await supabase
    .from('tracking_entries')
    .insert({
      user_id: userId,
      category,
      value,
      unit,
      date: date || new Date().toISOString().split('T')[0], // Format as YYYY-MM-DD
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Get today's tracking entries
export const getTodayTrackingEntries = async (userId: string): Promise<TrackingEntry[]> => {
  const today = new Date().toISOString().split('T')[0];
  
  const { data, error } = await supabase
    .from('tracking_entries')
    .select('*')
    .eq('user_id', userId)
    .eq('date', today);

  if (error) throw error;
  return data || [];
};

// Get tracking entries for a specific category and date range
export const getTrackingEntries = async (userId: string, category?: string, startDate?: string, endDate?: string): Promise<TrackingEntry[]> => {
  let query = supabase
    .from('tracking_entries')
    .select('*')
    .eq('user_id', userId);

  if (category) query = query.eq('category', category);
  if (startDate) query = query.gte('date', startDate);
  if (endDate) query = query.lte('date', endDate);

  const { data, error } = await query.order('date', { ascending: false });

  if (error) throw error;
  return data || [];
};

// Add sample tracking data for testing (Development only)
export const seedSampleTrackingData = async (userId: string) => {
  const today = new Date().toISOString().split('T')[0];
  
  const sampleEntries = [
    { category: 'steps', value: 7500, unit: 'steps' },
    { category: 'water', value: 1, unit: 'glass' },
    { category: 'water', value: 1, unit: 'glass' },
    { category: 'water', value: 1, unit: 'glass' },
    { category: 'sleep', value: 7.5, unit: 'hours' },
    { category: 'meditationHrs', value: 15, unit: 'minutes' },
  ];

  try {
    for (const entry of sampleEntries) {
      await saveTrackingEntry(userId, entry.category, entry.value, entry.unit, today);
    }
    console.log('Sample tracking data seeded successfully');
  } catch (error) {
    console.error('Error seeding sample data:', error);
  }
};

// Get latest weight entry
export const getLatestWeight = async (userId: string): Promise<number> => {
  const { data, error } = await supabase
    .from('tracking_entries')
    .select('value')
    .eq('user_id', userId)
    .eq('category', 'currentWeight')
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return 0; // No entries found
    throw error;
  }
  return data?.value || 0;
};