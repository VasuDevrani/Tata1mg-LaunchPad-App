import { supabase } from './supabase';

export interface UserProfile {
  id: string;
  full_name?: string;
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

// Create user profile after sign up
export const createUserProfile = async (userId: string, fullName?: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .insert({
      id: userId,
      full_name: fullName,
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