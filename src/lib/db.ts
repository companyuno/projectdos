import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Only create client if environment variables are set
const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

export async function getPermissions() {
  try {
    if (!supabase) {
      console.error('Supabase client not initialized');
      return [];
    }
    
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
    if (!supabase) {
      console.error('Supabase client not initialized');
      return false;
    }
    
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
    if (!supabase) {
      console.error('Supabase client not initialized');
      return false;
    }
    
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
    if (!supabase) {
      console.error('Supabase client not initialized');
      return false;
    }
    
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

// Thesis data functions
export async function getAllTheses() {
  try {
    if (!supabase) {
      console.error('Supabase client not initialized');
      return {};
    }
    
    const { data, error } = await supabase
      .from('thesis_data')
      .select('*');
    
    if (error) throw error;
    
    // Convert array to object format expected by the app
    const thesesObject: Record<string, any> = {};
    data?.forEach(thesis => {
      thesesObject[thesis.id] = {
        title: thesis.title,
        industry: thesis.industry,
        publishDate: thesis.publish_date,
        readTime: thesis.read_time,
        tags: thesis.tags || [],
        content: thesis.content,
        contact: thesis.contact,
        sources: thesis.sources
      };
    });
    
    return thesesObject;
  } catch (error) {
    console.error('Error fetching theses:', error);
    return {};
  }
}

export async function getThesis(thesisId: string) {
  try {
    if (!supabase) {
      console.error('Supabase client not initialized');
      return null;
    }
    
    const { data, error } = await supabase
      .from('thesis_data')
      .select('*')
      .eq('id', thesisId)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return null; // No rows found
      throw error;
    }
    
    return {
      title: data.title,
      industry: data.industry,
      publishDate: data.publish_date,
      readTime: data.read_time,
      tags: data.tags || [],
      content: data.content,
      contact: data.contact,
      sources: data.sources
    };
  } catch (error) {
    console.error('Error fetching thesis:', error);
    return null;
  }
}

export async function createThesis(thesisId: string, thesisData: any) {
  try {
    if (!supabase) {
      console.error('Supabase client not initialized');
      return false;
    }
    
    const { error } = await supabase
      .from('thesis_data')
      .insert({
        id: thesisId,
        title: thesisData.title,
        industry: thesisData.industry,
        publish_date: thesisData.publishDate,
        read_time: thesisData.readTime,
        tags: thesisData.tags,
        content: thesisData.content,
        contact: thesisData.contact,
        sources: thesisData.sources
      });
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error creating thesis:', error);
    return false;
  }
}

export async function updateThesis(thesisId: string, thesisData: any) {
  try {
    if (!supabase) {
      console.error('Supabase client not initialized');
      return false;
    }
    
    const { error } = await supabase
      .from('thesis_data')
      .update({
        title: thesisData.title,
        industry: thesisData.industry,
        publish_date: thesisData.publishDate,
        read_time: thesisData.readTime,
        tags: thesisData.tags,
        content: thesisData.content,
        contact: thesisData.contact,
        sources: thesisData.sources
      })
      .eq('id', thesisId);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error updating thesis:', error);
    return false;
  }
}

export async function deleteThesis(thesisId: string) {
  try {
    if (!supabase) {
      console.error('Supabase client not initialized');
      return false;
    }
    
    const { error } = await supabase
      .from('thesis_data')
      .delete()
      .eq('id', thesisId);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting thesis:', error);
    return false;
  }
} 