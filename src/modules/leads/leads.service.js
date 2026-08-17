import { supabase } from '../../config/supabase.js';

export const getLeads = async (captado_por) => {
  let query = supabase.from('leads').select('*').order('created_at', { ascending: false });
  if (captado_por) {
    query = query.eq('captado_por', captado_por);
  }
  const { data, error } = await query;
  if (error) throw error;
  return data;
};

export const getLeadById = async (id) => {
  const { data, error } = await supabase.from('leads').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
};

export const createLead = async (leadData) => {
  const { data, error } = await supabase.from('leads').insert([leadData]).select().single();
  if (error) throw error;
  return data;
};

export const updateLead = async (id, leadData) => {
  const { data, error } = await supabase.from('leads').update(leadData).eq('id', id).select().single();
  if (error) throw error;
  return data;
};

export const deleteLead = async (id) => {
  const { error } = await supabase.from('leads').delete().eq('id', id);
  if (error) throw error;
  return true;
};
