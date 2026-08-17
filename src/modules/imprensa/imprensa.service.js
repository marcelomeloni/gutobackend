import { supabase } from '../../config/supabase.js';

// --- Entrevistas (imprensa_entrevistas) ---

export const getAllEntrevistas = async () => {
  const { data, error } = await supabase
    .from('imprensa_entrevistas')
    .select('*, imprensa_veiculos(nome, tipo)')
    .order('data_entrevista', { ascending: true });
  if (error) throw error;
  return data;
};

export const createEntrevista = async (payload) => {
  // Frontend sends: veiculo (string name), pauta, data, horario, status, briefing
  // DB table: veiculo_id, pauta, data_entrevista, horario, status, briefing
  const { veiculo, data, horario, pauta, status, briefing } = payload;

  const dbPayload = {
    pauta,
    data_entrevista: data,
    horario,
    status: status || 'Pendente',
    briefing: briefing || null,
  };

  // Try to find veiculo_id by name
  if (veiculo) {
    const { data: veiculoData } = await supabase
      .from('imprensa_veiculos')
      .select('id')
      .ilike('nome', veiculo)
      .maybeSingle();

    if (veiculoData) {
      dbPayload.veiculo_id = veiculoData.id;
    } else {
      // Auto-create the veiculo if it doesn't exist
      const { data: newVeiculo } = await supabase
        .from('imprensa_veiculos')
        .insert([{ nome: veiculo, tipo: 'Outros' }])
        .select()
        .single();
        
      if (newVeiculo) {
        dbPayload.veiculo_id = newVeiculo.id;
      } else {
        dbPayload.pauta = `[${veiculo}] ${pauta}`;
      }
    }
  }

  const { data: result, error } = await supabase
    .from('imprensa_entrevistas')
    .insert([dbPayload])
    .select()
    .single();
  if (error) throw error;

  // Return in frontend-friendly format
  return normalizeEntrevista(result, veiculo);
};

export const updateEntrevista = async (id, payload) => {
  const updateData = {};
  if (payload.status) updateData.status = payload.status;
  if (payload.pauta) updateData.pauta = payload.pauta;
  if (payload.horario) updateData.horario = payload.horario;
  if (payload.data) updateData.data_entrevista = payload.data;
  if (payload.briefing !== undefined) updateData.briefing = payload.briefing;

  const { data, error } = await supabase
    .from('imprensa_entrevistas')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return normalizeEntrevista(data);
};

export const removeEntrevista = async (id) => {
  const { error } = await supabase.from('imprensa_entrevistas').delete().eq('id', id);
  if (error) throw error;
  return true;
};

// --- Veículos (imprensa_veiculos) ---

export const getAllVeiculos = async () => {
  const { data, error } = await supabase
    .from('imprensa_veiculos')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

export const createVeiculo = async (payload) => {
  const { nome, tipo, cidade, site } = payload;
  const { data, error } = await supabase
    .from('imprensa_veiculos')
    .insert([{ nome, tipo, cidade: cidade || null, site: site || null }])
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const removeVeiculo = async (id) => {
  const { error } = await supabase.from('imprensa_veiculos').delete().eq('id', id);
  if (error) throw error;
  return true;
};

// --- Helpers ---

function normalizeEntrevista(row, veiculoName = null) {
  return {
    id: row.id,
    veiculo: veiculoName || row.veiculo_id || 'Não informado',
    pauta: row.pauta,
    data: row.data_entrevista,
    horario: row.horario,
    status: row.status,
    briefing: row.briefing,
    created_at: row.created_at,
  };
}
