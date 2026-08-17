import { supabase } from '../../config/supabase.js';

export const getAll = async () => {
  const { data, error } = await supabase
    .from('municipios')
    .select('*')
    .order('nome', { ascending: true });
  if (error) throw error;
  return data;
};

export const create = async (payload) => {
  const { data, error } = await supabase
    .from('municipios')
    .insert([payload])
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const remove = async (id) => {
  const { error } = await supabase.from('municipios').delete().eq('id', id);
  if (error) throw error;
  return true;
};
