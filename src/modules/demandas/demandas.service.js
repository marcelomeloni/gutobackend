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
  // Se não tem lead_id mas tem nome e telefone, cria o lead primeiro
  if (!demandaData.lead_id && (demandaData.cidadao_nome || demandaData.cidadao_telefone)) {
    const { data: newLead, error: leadError } = await supabase.from('leads').insert([{
      nome: demandaData.cidadao_nome || 'Sem Nome',
      telefone: demandaData.cidadao_telefone || '',
      bairro: demandaData.bairro || null,
      origem: demandaData.origem || 'Site/Gabinete Virtual',
      engajamento: 'Frio'
    }]).select().single();
    
    if (leadError) throw leadError;
    demandaData.lead_id = newLead.id;
  }

  const { data, error } = await supabase.from('demandas').insert([demandaData]).select().single();
  if (error) throw error;
  return data;
};

export const updateDemandaStatus = async (id, status) => {
  const { data, error } = await supabase.from('demandas').update({ status }).eq('id', id).select().single();
  if (error) throw error;
  return data;
};

export const deleteDemanda = async (id) => {
  const { error } = await supabase.from('demandas').delete().eq('id', id);
  if (error) throw error;
  return true;
};
