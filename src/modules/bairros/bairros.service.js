import { supabase } from '../../config/supabase.js';

export const getAll = async (municipio_id) => {
  let query = supabase.from('bairros').select('*').order('created_at', { ascending: false });
  if (municipio_id) {
    query = query.eq('municipio_id', municipio_id);
  }
  const { data, error } = await query;
  if (error) throw error;
  return data;
};

export const getById = async (id) => {
  const { data, error } = await supabase.from('bairros').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
};

export const create = async (payload) => {
  const { data, error } = await supabase.from('bairros').insert([payload]).select().single();
  if (error) throw error;
  return data;
};

export const update = async (id, payload) => {
  const { data, error } = await supabase.from('bairros').update(payload).eq('id', id).select().single();
  if (error) throw error;
  return data;
};

export const remove = async (id) => {
  const { error } = await supabase.from('bairros').delete().eq('id', id);
  if (error) throw error;
  return true;
};
