import { supabase } from '../../config/supabase.js';

export const getAll = async () => {
  const { data, error } = await supabase.from('imprensa_veiculos').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

export const getById = async (id) => {
  const { data, error } = await supabase.from('imprensa_veiculos').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
};

export const create = async (payload) => {
  const { data, error } = await supabase.from('imprensa_veiculos').insert([payload]).select().single();
  if (error) throw error;
  return data;
};

export const update = async (id, payload) => {
  const { data, error } = await supabase.from('imprensa_veiculos').update(payload).eq('id', id).select().single();
  if (error) throw error;
  return data;
};

export const remove = async (id) => {
  const { error } = await supabase.from('imprensa_veiculos').delete().eq('id', id);
  if (error) throw error;
  return true;
};

// --- Entrevistas ---
export const getAllEntrevistas = async () => {
  const { data, error } = await supabase.from('imprensa_entrevistas').select('*, imprensa_veiculos(nome, tipo)').order('data_entrevista', { ascending: true });
  if (error) throw error;
  return data;
};

export const createEntrevista = async (payload) => {
  const { data, error } = await supabase.from('imprensa_entrevistas').insert([payload]).select('*, imprensa_veiculos(nome, tipo)').single();
  if (error) throw error;
  return data;
};

export const updateEntrevista = async (id, payload) => {
  const { data, error } = await supabase.from('imprensa_entrevistas').update(payload).eq('id', id).select('*, imprensa_veiculos(nome, tipo)').single();
  if (error) throw error;
  return data;
};

export const removeEntrevista = async (id) => {
  const { error } = await supabase.from('imprensa_entrevistas').delete().eq('id', id);
  if (error) throw error;
  return true;
};
