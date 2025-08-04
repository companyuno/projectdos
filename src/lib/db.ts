import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function getPermissions() {
  try {
    const { data, error } = await supabase
      .from('permissions')
      .select('email, added_at, added_by')
      .order('added_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching permissions:', error);
    return [];
  }
}

export async function addPermission(email: string) {
  try {
    const { data, error } = await supabase
      .from('permissions')
      .insert({
        email: email.toLowerCase().trim(),
        added_by: 'admin'
      })
      .select();
    
    if (error) {
      // If it's a duplicate key error, that's fine
      if (error.code === '23505') return false;
      throw error;
    }
    
    return data && data.length > 0;
  } catch (error) {
    console.error('Error adding permission:', error);
    return false;
  }
}

export async function removePermission(email: string) {
  try {
    const { error } = await supabase
      .from('permissions')
      .delete()
      .eq('email', email.toLowerCase().trim());
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error removing permission:', error);
    return false;
  }
}

export async function checkPermission(email: string) {
  try {
    const { data, error } = await supabase
      .from('permissions')
      .select('id')
      .eq('email', email.toLowerCase().trim())
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return false; // No rows found
      throw error;
    }
    
    return !!data;
  } catch (error) {
    console.error('Error checking permission:', error);
    return false;
  }
} 