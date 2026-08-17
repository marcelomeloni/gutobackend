import { supabase } from '../../config/supabase.js';

// Supabase table: usuarios

export const getAll = async () => {
  const { data, error } = await supabase
    .from('usuarios')
    .select('id, nome, email, role, telefone, created_at, municipio_id, municipios(nome)')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

export const getById = async (id) => {
  const { data, error } = await supabase
    .from('usuarios')
    .select('id, nome, email, role, telefone, created_at, municipio_id, municipios(nome)')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
};

export const create = async (payload) => {
  const { senha_hash, ...safePayload } = payload;
  const { data, error } = await supabase
    .from('usuarios')
    .insert([safePayload])
    .select('id, nome, email, role, telefone, created_at, municipio_id')
    .single();
  if (error) throw error;
  return data;
};

export const update = async (id, payload) => {
  const { senha_hash, ...safePayload } = payload;
  const { data, error } = await supabase
    .from('usuarios')
    .update(safePayload)
    .eq('id', id)
    .select('id, nome, email, role, telefone, created_at, municipio_id')
    .single();
  if (error) throw error;
  return data;
};

export const remove = async (id) => {
  const { error } = await supabase.from('usuarios').delete().eq('id', id);
  if (error) throw error;
  return true;
};
