import { supabase } from '../../config/supabase.js';

export const getAll = async () => {
  const { data, error } = await supabase.from('tarefas').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

export const getById = async (id) => {
  const { data, error } = await supabase.from('tarefas').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
};

export const create = async (payload) => {
  const { data, error } = await supabase.from('tarefas').insert([payload]).select().single();
  if (error) throw error;
  return data;
};

export const update = async (id, payload) => {
  const { data, error } = await supabase.from('tarefas').update(payload).eq('id', id).select().single();
  if (error) throw error;
  return data;
};

export const remove = async (id) => {
  const { error } = await supabase.from('tarefas').delete().eq('id', id);
  if (error) throw error;
  return true;
};
