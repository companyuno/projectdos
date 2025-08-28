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
        subtitle: row.subtitle,
        industry: row.industry,
        publishDate: row.publish_date,
        readTime: row.read_time,
        tags: row.tags || [],
        content: row.content,
        contact: row.contact,
        sources: row.sources,
        live: row.live || false,
        featured: row.featured || false,
        type: row.type || 'thesis'
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
      subtitle: data.subtitle,
      industry: data.industry,
      publishDate: data.publish_date,
      readTime: data.read_time,
      tags: data.tags || [],
      content: data.content,
      contact: data.contact,
      sources: data.sources,
      live: data.live || false,
      featured: data.featured || false
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
        subtitle: thesisData.subtitle,
        industry: thesisData.industry,
        publish_date: thesisData.publishDate,
        read_time: thesisData.readTime,
        tags: thesisData.tags,
        content: thesisData.content,
        contact: thesisData.contact,
        sources: thesisData.sources,
        live: thesisData.live || false,
        featured: thesisData.featured || false,
        type: thesisData.type || 'thesis'
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
        subtitle: thesisData.subtitle,
        industry: thesisData.industry,
        publish_date: thesisData.publishDate,
        read_time: thesisData.readTime,
        tags: thesisData.tags,
        content: thesisData.content,
        contact: thesisData.contact,
        sources: thesisData.sources,
        live: thesisData.live,
        featured: thesisData.featured,
        type: thesisData.type
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

// Deals data functions
export interface DealRecord {
  id: string;
  transactionName: string;
  status: 'closed' | 'open' | 'upcoming';
  industry: string;
  targetRaise: string;
  preMoneyValuation: string;
  postMoneyValuation: string;
  targetOwnership: string;
  targetCloseDate: string;
  leadInvestor: string;
  memoRoute?: string | null;
  thesisRoute?: string | null;
  decompositionRoute?: string | null;
  featured?: boolean;
  live?: boolean;
  orderIndex?: number | null;
  links?: { name: string; url: string }[] | null;
  traction?: string | null;
  tractionNotes?: string | null;
}

// Raw row shape from the 'deals' table
type DealRow = {
  id: string;
  transaction_name: string;
  status: 'closed' | 'open' | 'upcoming';
  industry: string | null;
  target_raise: string | null;
  pre_money_valuation: string | null;
  post_money_valuation: string | null;
  target_ownership: string | null;
  target_close_date: string | null;
  lead_investor: string | null;
  memo_route: string | null;
  thesis_route: string | null;
  decomposition_route: string | null;
  featured: boolean | null;
  live: boolean | null;
  order_index: number | null;
  links: { name: string; url: string }[] | null;
  traction: string | null;
  traction_notes: string | null;
};

export async function getAllDeals(): Promise<DealRecord[]> {
  try {
    if (!supabase) {
      console.error('Supabase client not initialized');
      return [];
    }

    const { data, error } = await supabase
      .from('deals')
      .select('*')
      .order('order_index', { ascending: true, nullsFirst: false })
      .order('updated_at', { ascending: false });

    if (error) throw error;

    const deals: DealRecord[] = (data as DealRow[] | null || []).map((row: DealRow) => ({
      id: row.id,
      transactionName: row.transaction_name,
      status: row.status,
      industry: row.industry ?? '',
      targetRaise: row.target_raise ?? '',
      preMoneyValuation: row.pre_money_valuation ?? '',
      postMoneyValuation: row.post_money_valuation ?? '',
      targetOwnership: row.target_ownership ?? '',
      targetCloseDate: row.target_close_date ?? '',
      leadInvestor: row.lead_investor ?? '',
      memoRoute: row.memo_route ?? null,
      thesisRoute: row.thesis_route ?? null,
      decompositionRoute: row.decomposition_route ?? null,
      featured: Boolean(row.featured ?? false),
      live: Boolean(row.live ?? true),
      orderIndex: row.order_index ?? null,
      links: Array.isArray(row.links) ? row.links : null,
      traction: row.traction ?? null,
      tractionNotes: row.traction_notes ?? null,
    }));

    return deals;
  } catch (error) {
    console.error('Error fetching deals:', error);
    return [];
  }
}

export async function getDeal(dealId: string): Promise<DealRecord | null> {
  try {
    if (!supabase) {
      console.error('Supabase client not initialized');
      return null;
    }

    const { data, error } = await supabase
      .from('deals')
      .select('*')
      .eq('id', dealId)
      .single();

    if (error) {
      const code = (error as { code?: string }).code;
      if (code === 'PGRST116') return null;
      throw error;
    }

    const row = data as DealRow;

    return {
      id: row.id,
      transactionName: row.transaction_name,
      status: row.status,
      industry: row.industry ?? '',
      targetRaise: row.target_raise ?? '',
      preMoneyValuation: row.pre_money_valuation ?? '',
      postMoneyValuation: row.post_money_valuation ?? '',
      targetOwnership: row.target_ownership ?? '',
      targetCloseDate: row.target_close_date ?? '',
      leadInvestor: row.lead_investor ?? '',
      memoRoute: row.memo_route ?? null,
      thesisRoute: row.thesis_route ?? null,
      decompositionRoute: row.decomposition_route ?? null,
      featured: Boolean(row.featured ?? false),
      live: Boolean(row.live ?? true),
      orderIndex: row.order_index ?? null,
      links: Array.isArray(row.links) ? row.links : null,
      traction: row.traction ?? null,
      tractionNotes: row.traction_notes ?? null,
    };
  } catch (error) {
    console.error('Error fetching deal:', error);
    return null;
  }
}

export async function createDeal(record: DealRecord): Promise<boolean> {
  try {
    if (!supabase) {
      console.error('Supabase client not initialized');
      return false;
    }

    const { error } = await supabase
      .from('deals')
      .insert({
        id: record.id,
        transaction_name: record.transactionName,
        status: record.status,
        industry: record.industry,
        target_raise: record.targetRaise,
        pre_money_valuation: record.preMoneyValuation,
        post_money_valuation: record.postMoneyValuation,
        target_ownership: record.targetOwnership,
        target_close_date: record.targetCloseDate,
        lead_investor: record.leadInvestor,
        memo_route: record.memoRoute ?? null,
        thesis_route: record.thesisRoute ?? null,
        decomposition_route: record.decompositionRoute ?? null,
        featured: record.featured ?? false,
        live: record.live ?? true,
        order_index: record.orderIndex ?? null,
        links: record.links ?? null,
        traction: record.traction ?? null,
        traction_notes: record.tractionNotes ?? null,
      });

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error creating deal:', error);
    return false;
  }
}

export async function updateDeal(dealId: string, record: Partial<DealRecord>): Promise<boolean> {
  try {
    if (!supabase) {
      console.error('Supabase client not initialized');
      return false;
    }

    const { error } = await supabase
      .from('deals')
      .update({
        transaction_name: record.transactionName,
        status: record.status,
        industry: record.industry,
        target_raise: record.targetRaise,
        pre_money_valuation: record.preMoneyValuation,
        post_money_valuation: record.postMoneyValuation,
        target_ownership: record.targetOwnership,
        target_close_date: record.targetCloseDate,
        lead_investor: record.leadInvestor,
        memo_route: record.memoRoute,
        thesis_route: record.thesisRoute,
        decomposition_route: record.decompositionRoute,
        featured: record.featured,
        live: record.live,
        order_index: record.orderIndex,
        links: record.links ?? null,
        traction: record.traction,
        traction_notes: record.tractionNotes,
      })
      .eq('id', dealId);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error updating deal:', error);
    return false;
  }
}

export async function deleteDeal(dealId: string): Promise<boolean> {
  try {
    if (!supabase) {
      console.error('Supabase client not initialized');
      return false;
    }

    const { error } = await supabase
      .from('deals')
      .delete()
      .eq('id', dealId);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting deal:', error);
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

// Startup submission functions
export async function getAllStartupSubmissions() {
  try {
    if (!supabase) {
      console.error('Supabase client not initialized');
      return [];
    }
    
    const { data, error } = await supabase
      .from('startup_submissions')
      .select('*')
      .order('submitted_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching startup submissions:', error);
    return [];
  }
}

export async function addStartupSubmission(submissionData: {
  company_name: string;
  founder_names: string;
  email: string;
  phone?: string;
  stage: string;
  funding_sought: string;
  problem_statement: string;
  solution: string;
  founder_description: string;
  additional_materials_url?: string;
}) {
  try {
    if (!supabase) {
      console.error('Supabase client not initialized');
      return false;
    }
    
    const { data, error } = await supabase
      .from('startup_submissions')
      .insert({
        company_name: submissionData.company_name,
        founder_names: submissionData.founder_names,
        email: submissionData.email.toLowerCase().trim(),
        phone: submissionData.phone || null,
        stage: submissionData.stage,
        funding_sought: submissionData.funding_sought,
        problem_statement: submissionData.problem_statement,
        solution: submissionData.solution,
        founder_description: submissionData.founder_description,
        additional_materials_url: submissionData.additional_materials_url || null
      })
      .select();
    
    if (error) throw error;
    return data && data.length > 0;
  } catch (error) {
    console.error('Error adding startup submission:', error);
    return false;
  }
}

export async function updateStartupSubmissionStatus(
  submissionId: number, 
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected',
  notes?: string
) {
  try {
    if (!supabase) {
      console.error('Supabase client not initialized');
      return false;
    }
    
    const { error } = await supabase
      .from('startup_submissions')
      .update({
        status,
        notes: notes || null,
        reviewed: true,
        reviewed_at: new Date().toISOString()
      })
      .eq('id', submissionId);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error updating startup submission:', error);
    return false;
  }
} 

// Categories (for Research folders)
export interface CategoryRecord {
  slug: string
  name: string
  orderIndex: number | null
  active: boolean
  iconKey: string | null
}

export async function getAllCategories(): Promise<CategoryRecord[]> {
  try {
    if (!supabase) {
      console.error('Supabase client not initialized')
      return []
    }
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('order_index', { ascending: true, nullsFirst: false })
      .order('updated_at', { ascending: false })
    if (error) throw error
    const categories: CategoryRecord[] = (data as any[] | null || []).map((row: any) => ({
      slug: row.slug,
      name: row.name,
      orderIndex: row.order_index ?? null,
      active: row.active ?? true,
      iconKey: row.icon_key ?? null,
    }))
    return categories
  } catch (err) {
    console.error('Error fetching categories:', err)
    return []
  }
}

export async function createCategory(record: {
  slug: string
  name: string
  orderIndex?: number | null
  active?: boolean
  iconKey?: string | null
}): Promise<boolean> {
  try {
    if (!supabase) {
      console.error('Supabase client not initialized')
      return false
    }
    const { error } = await supabase
      .from('categories')
      .insert({
        slug: record.slug,
        name: record.name,
        order_index: record.orderIndex ?? null,
        active: record.active ?? true,
        icon_key: record.iconKey ?? null,
      })
    if (error) throw error
    return true
  } catch (err) {
    console.error('Error creating category:', err)
    return false
  }
}

export async function updateCategory(slug: string, patch: Partial<Omit<CategoryRecord, 'slug'>>): Promise<boolean> {
  try {
    if (!supabase) {
      console.error('Supabase client not initialized')
      return false
    }
    const { error } = await supabase
      .from('categories')
      .update({
        name: patch.name,
        order_index: patch.orderIndex,
        active: patch.active,
        icon_key: patch.iconKey,
      })
      .eq('slug', slug)
    if (error) throw error
    return true
  } catch (err) {
    console.error('Error updating category:', err)
    return false
  }
}

export async function deleteCategory(slug: string): Promise<boolean> {
  try {
    if (!supabase) {
      console.error('Supabase client not initialized')
      return false
    }
    // Soft-delete: set active=false to mirror previous behavior
    const { error } = await supabase
      .from('categories')
      .update({ active: false })
      .eq('slug', slug)
    if (error) throw error
    return true
  } catch (err) {
    console.error('Error deleting category:', err)
    return false
  }
} 