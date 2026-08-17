import { supabase } from '../../config/supabase.js';

const mapToFrontend = (item) => ({
  id: item.id,
  title: item.titulo,
  type: item.tipo,
  priority: item.prioridade,
  status: item.status,
  creationDate: item.created_at,
  deadlineDate: item.prazo_publicacao,
  responsible: item.responsavel_id,
  channels: item.canais || [],
  script: item.roteiro
});

const mapToDB = (payload) => {
  const dbPayload = {
    titulo: payload.title,
    tipo: payload.type,
    prioridade: payload.priority,
    status: payload.status || 'Planejamento',
    prazo_publicacao: payload.deadlineDate || null,
    canais: payload.channels || [],
    roteiro: payload.script || null
  };
  if (payload.responsible) {
    dbPayload.responsavel_id = payload.responsible;
  }
  return dbPayload;
};

export const getAll = async () => {
  const { data, error } = await supabase.from('marketing_conteudos').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return data.map(mapToFrontend);
};

export const getById = async (id) => {
  const { data, error } = await supabase.from('marketing_conteudos').select('*').eq('id', id).single();
  if (error) throw error;
  return mapToFrontend(data);
};

export const create = async (payload) => {
  const dbPayload = mapToDB(payload);
  const { data, error } = await supabase.from('marketing_conteudos').insert([dbPayload]).select().single();
  if (error) throw error;
  return mapToFrontend(data);
};

export const update = async (id, payload) => {
  const dbPayload = mapToDB(payload);
  const { data, error } = await supabase.from('marketing_conteudos').update(dbPayload).eq('id', id).select().single();
  if (error) throw error;
  return mapToFrontend(data);
};

export const remove = async (id) => {
  const { error } = await supabase.from('marketing_conteudos').delete().eq('id', id);
  if (error) throw error;
  return true;
};

