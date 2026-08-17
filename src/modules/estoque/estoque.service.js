import { supabase } from '../../config/supabase.js';

export const getAll = async () => {
  const { data, error } = await supabase.from('estoque_itens').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

export const getById = async (id) => {
  const { data, error } = await supabase.from('estoque_itens').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
};

export const create = async (payload) => {
  const { data, error } = await supabase.from('estoque_itens').insert([payload]).select().single();
  if (error) throw error;
  return data;
};

export const update = async (id, payload) => {
  const { data, error } = await supabase.from('estoque_itens').update(payload).eq('id', id).select().single();
  if (error) throw error;
  return data;
};

export const remove = async (id) => {
  const { error } = await supabase.from('estoque_itens').delete().eq('id', id);
  if (error) throw error;
  return true;
};

// --- Movimentações ---
export const getMovimentacoes = async () => {
  const { data, error } = await supabase.from('estoque_movimentacoes').select('*, estoque_itens(nome)').order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

export const movimentar = async (itemId, payload) => {
  // 1. Get current item
  const { data: item, error: itemError } = await supabase.from('estoque_itens').select('quantidade_atual').eq('id', itemId).single();
  if (itemError) throw itemError;

  // 2. Calculate new quantity
  const delta = payload.tipo_movimentacao === 'Entrada' ? payload.quantidade : -payload.quantidade;
  const novaQtd = (item.quantidade_atual || 0) + delta;
  if (novaQtd < 0) throw new Error('Quantidade insuficiente em estoque');

  // 3. Update item quantity
  const { error: updateError } = await supabase.from('estoque_itens').update({ quantidade_atual: novaQtd }).eq('id', itemId);
  if (updateError) throw updateError;

  // 4. Record movement
  const { data: mov, error: movError } = await supabase.from('estoque_movimentacoes').insert([{
    item_id: itemId,
    tipo_movimentacao: payload.tipo_movimentacao,
    quantidade: payload.quantidade,
    observacao: payload.observacao || null
  }]).select().single();
  if (movError) throw movError;

  return { movimentacao: mov, nova_quantidade: novaQtd };
};
