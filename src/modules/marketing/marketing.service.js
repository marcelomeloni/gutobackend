import { supabase } from '../../config/supabase.js';

const mapToFrontend = (item) => ({
  id: item.id,
  title: item.titulo,
  type: item.formato,
  priority: item.prioridade,
  status: item.status,
  creationDate: item.data_criacao,
  deadlineDate: item.data_publicacao,
  responsible: item.responsavel_id,
  channels: item.canais || [],
  script: item.roteiro
});

const mapToDB = (payload) => ({
  titulo: payload.title,
  formato: payload.type,
  prioridade: payload.priority,
  status: payload.status || 'Planejamento',
  data_criacao: payload.creationDate,
  data_publicacao: payload.deadlineDate || null,
  responsavel_id: payload.responsible || null,
  canais: payload.channels || [],
  roteiro: payload.script || null
});

export const getAll = async () => {
  const { data, error } = await supabase.from('marketing').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return data.map(mapToFrontend);
};

export const getById = async (id) => {
  const { data, error } = await supabase.from('marketing').select('*').eq('id', id).single();
  if (error) throw error;
  return mapToFrontend(data);
};

export const create = async (payload) => {
  const dbPayload = mapToDB(payload);
  const { data, error } = await supabase.from('marketing').insert([dbPayload]).select().single();
  if (error) throw error;
  return mapToFrontend(data);
};

export const update = async (id, payload) => {
  const dbPayload = mapToDB(payload);
  const { data, error } = await supabase.from('marketing').update(dbPayload).eq('id', id).select().single();
  if (error) throw error;
  return mapToFrontend(data);
};

export const remove = async (id) => {
  const { error } = await supabase.from('marketing').delete().eq('id', id);
  if (error) throw error;
  return true;
};

