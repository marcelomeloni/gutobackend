import { supabase } from '../../config/supabase.js';

export const getDemandas = async () => {
  const { data, error } = await supabase.from('demandas').select('*, leads(nome, telefone)').order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

export const getDemandaById = async (id) => {
  const { data, error } = await supabase.from('demandas').select('*, leads(nome, telefone)').eq('id', id).single();
  if (error) throw error;
  return data;
};

export const createDemanda = async (demandaData) => {
  const { data, error } = await supabase.from('demandas').insert([demandaData]).select().single();
  if (error) throw error;
  return data;
};

export const updateDemandaStatus = async (id, status) => {
  const { data, error } = await supabase.from('demandas').update({ status }).eq('id', id).select().single();
  if (error) throw error;
  return data;
};

export const updateDemanda = async (id, payload) => {
  const { data, error } = await supabase.from('demandas').update(payload).eq('id', id).select().single();
  if (error) throw error;
  return data;
};

export const deleteDemanda = async (id) => {
  const { error } = await supabase.from('demandas').delete().eq('id', id);
  if (error) throw error;
  return true;
};
