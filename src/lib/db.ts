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
      .select('*')
      .order('updated_at', { ascending: false });
    
    if (error) throw error;
    
    // Convert database format to expected format
    const theses: Record<string, Record<string, unknown>> = {};
    data?.forEach((row) => {
      theses[row.id] = {
        title: row.title,
        industry: row.industry,
        publishDate: row.publish_date,
        readTime: row.read_time,
        tags: row.tags || [],
        content: row.content,
        contact: row.contact,
        sources: row.sources,
        live: row.live || false
      };
    });
    
    return theses;
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

export async function createThesis(thesisId: string, thesisData: Record<string, unknown>) {
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
        sources: thesisData.sources,
        live: thesisData.live || false
      });
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error creating thesis:', error);
    return false;
  }
}

export async function updateThesis(thesisId: string, thesisData: Record<string, unknown>) {
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
        sources: thesisData.sources,
        live: thesisData.live
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

// Visitor tracking functions
export async function getAllVisitors() {
  try {
    if (!supabase) {
      console.error('Supabase client not initialized');
      return [];
    }
    
    const { data, error } = await supabase
      .from('visitors')
      .select('*')
      .order('timestamp', { ascending: false });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching visitors:', error);
    return [];
  }
}

export async function addVisitor(visitorData: {
  firstName: string;
  lastName: string;
  email: string;
  accredited?: boolean;
  accreditedSelections?: string[];
}) {
  try {
    if (!supabase) {
      console.error('Supabase client not initialized');
      return false;
    }
    
    const { data, error } = await supabase
      .from('visitors')
      .insert({
        first_name: visitorData.firstName,
        last_name: visitorData.lastName,
        email: visitorData.email.toLowerCase().trim(),
        accredited: visitorData.accredited || false,
        accredited_selections: visitorData.accreditedSelections || null
      })
      .select();
    
    if (error) throw error;
    return data && data.length > 0;
  } catch (error) {
    console.error('Error adding visitor:', error);
    return false;
  }
}

export async function deleteVisitor(visitorId: number) {
  try {
    if (!supabase) {
      console.error('Supabase client not initialized');
      return false;
    }
    
    const { error } = await supabase
      .from('visitors')
      .delete()
      .eq('id', visitorId);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting visitor:', error);
    return false;
  }
} 