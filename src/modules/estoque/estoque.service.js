import { supabase } from '../../config/supabase.js';

// Supabase table: estoque_itens
// Columns: id, nome, tipo, quantidade_atual, created_at, categoria, quantidade_minima, unidade, estado, valor

export const getAll = async () => {
  const { data, error } = await supabase
    .from('estoque_itens')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  // Normalize to frontend field names
  return (data || []).map(normalizeItem);
};

export const getById = async (id) => {
  const { data, error } = await supabase
    .from('estoque_itens')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return normalizeItem(data);
};

export const create = async (payload) => {
  // Frontend sends: nome, categoria, qtdAtual, qtdMin, unidade, estado, valor
  // DB columns:     nome, categoria, quantidade_atual, quantidade_minima, unidade, estado, valor, tipo
  const dbPayload = {
    nome: payload.nome,
    categoria: payload.categoria,
    quantidade_atual: parseInt(payload.qtdAtual) || 0,
    quantidade_minima: parseInt(payload.qtdMin) || 0,
    unidade: payload.unidade || 'un',
    estado: payload.estado || 'Novo',
    valor: parseFloat(payload.valor) || 0,
    tipo: payload.categoria || 'Geral', // tipo maps to categoria
  };

  const { data, error } = await supabase
    .from('estoque_itens')
    .insert([dbPayload])
    .select()
    .single();
  if (error) throw error;
  return normalizeItem(data);
};

export const update = async (id, payload) => {
  // Build update from either frontend fields or DB fields
  const dbPayload = {};
  if (payload.nome !== undefined) dbPayload.nome = payload.nome;
  if (payload.categoria !== undefined) dbPayload.categoria = payload.categoria;
  if (payload.qtdAtual !== undefined) dbPayload.quantidade_atual = parseInt(payload.qtdAtual);
  if (payload.quantidade_atual !== undefined) dbPayload.quantidade_atual = parseInt(payload.quantidade_atual);
  if (payload.qtdMin !== undefined) dbPayload.quantidade_minima = parseInt(payload.qtdMin);
  if (payload.unidade !== undefined) dbPayload.unidade = payload.unidade;
  if (payload.estado !== undefined) dbPayload.estado = payload.estado;
  if (payload.valor !== undefined) dbPayload.valor = parseFloat(payload.valor);

  const { data, error } = await supabase
    .from('estoque_itens')
    .update(dbPayload)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return normalizeItem(data);
};

export const remove = async (id) => {
  const { error } = await supabase.from('estoque_itens').delete().eq('id', id);
  if (error) throw error;
  return true;
};

// Map DB columns to frontend-friendly field names
function normalizeItem(item) {
  if (!item) return null;
  return {
    id: item.id,
    nome: item.nome,
    categoria: item.categoria,
    qtdAtual: item.quantidade_atual,
    qtdMin: item.quantidade_minima,
    unidade: item.unidade,
    estado: item.estado,
    valor: item.valor,
    created_at: item.created_at,
  };
}
