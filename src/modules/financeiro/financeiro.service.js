import { supabase } from '../../config/supabase.js';

// Supabase table: financeiro
// Columns: id, tipo, categoria, valor, descricao, data_transacao, registrado_por, created_at, status, anexo_url

export const getAll = async () => {
  const { data, error } = await supabase
    .from('financeiro')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

export const getById = async (id) => {
  const { data, error } = await supabase
    .from('financeiro')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
};

export const create = async (payload) => {
  // Frontend sends: tipo, categoria, valor, data, nome, cpfCnpj, meio, observacoes
  // DB table cols:  tipo, categoria, valor, data_transacao, descricao, status, registrado_por
  const dbPayload = {
    tipo: payload.tipo,
    categoria: payload.categoria,
    valor: parseFloat(payload.valor) || 0,
    data_transacao: payload.data || new Date().toISOString().split('T')[0],
    descricao: [
      payload.observacoes || '',
      payload.nome ? `Nome: ${payload.nome}` : '',
      payload.cpfCnpj ? `CPF/CNPJ: ${payload.cpfCnpj}` : '',
      payload.meio ? `Meio: ${payload.meio}` : '',
    ].filter(Boolean).join(' | ') || null,
    status: 'Pendente',
    registrado_por: payload.registrado_por || null,
  };

  const { data, error } = await supabase
    .from('financeiro')
    .insert([dbPayload])
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const update = async (id, payload) => {
  const updateData = {};
  if (payload.status !== undefined) updateData.status = payload.status;
  if (payload.tipo !== undefined) updateData.tipo = payload.tipo;
  if (payload.categoria !== undefined) updateData.categoria = payload.categoria;
  if (payload.valor !== undefined) updateData.valor = parseFloat(payload.valor);
  if (payload.descricao !== undefined) updateData.descricao = payload.descricao;
  if (payload.data_transacao !== undefined) updateData.data_transacao = payload.data_transacao;

  const { data, error } = await supabase
    .from('financeiro')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const remove = async (id) => {
  const { error } = await supabase.from('financeiro').delete().eq('id', id);
  if (error) throw error;
  return true;
};
