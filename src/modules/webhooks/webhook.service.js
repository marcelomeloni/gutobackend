import { supabase } from '../../config/supabase.js';

/**
 * Busca município por nome + estado. Se não existir, cria.
 * Retorna o registro do município.
 */
async function findOrCreateMunicipio(nome, estado) {
  // Busca existente (case-insensitive via ilike)
  const { data: existing, error: findError } = await supabase
    .from('municipios')
    .select('*')
    .ilike('nome', nome.trim())
    .eq('estado', estado.trim().toUpperCase())
    .limit(1)
    .maybeSingle();

  if (findError) throw findError;
  if (existing) return existing;

  // Cria novo município
  const { data: created, error: createError } = await supabase
    .from('municipios')
    .insert([{ nome: nome.trim(), estado: estado.trim().toUpperCase() }])
    .select()
    .single();

  if (createError) throw createError;
  return created;
}

/**
 * Busca bairro por nome + municipio_id. Se não existir, cria.
 * Retorna o registro do bairro.
 */
async function findOrCreateBairro(nome, municipioId) {
  const { data: existing, error: findError } = await supabase
    .from('bairros')
    .select('*')
    .ilike('nome', nome.trim())
    .eq('municipio_id', municipioId)
    .limit(1)
    .maybeSingle();

  if (findError) throw findError;
  if (existing) return existing;

  // Cria novo bairro com valores padrão
  const { data: created, error: createError } = await supabase
    .from('bairros')
    .insert([{
      nome: nome.trim(),
      municipio_id: municipioId,
      status: 'Ativo',
      prioridade: 'Média'
    }])
    .select()
    .single();

  if (createError) throw createError;
  return created;
}

/**
 * Monta o campo observacoes com todos os dados extras do formulário
 * que não cabem nas colunas da tabela leads.
 */
function buildObservacoes(payload) {
  const linhas = [];

  linhas.push('=== CADASTRO VIA FORMULÁRIO DE VOLUNTÁRIOS (Site Guto) ===');
  linhas.push('');

  if (payload.nome_preferido) {
    linhas.push(`Apelido: ${payload.nome_preferido}`);
  }
  if (payload.data_nascimento) {
    linhas.push(`Data de nascimento: ${payload.data_nascimento}`);
  }
  if (payload.redes_sociais) {
    linhas.push(`Redes sociais: ${payload.redes_sociais}`);
  }
  if (payload.abrangencia) {
    linhas.push(`Abrangência de atuação: ${payload.abrangencia}`);
  }
  if (payload.conexoes_cidades && payload.conexoes_cidades.length > 0) {
    const cidades = payload.conexoes_cidades.filter(c => c && c.trim());
    if (cidades.length > 0) {
      linhas.push(`Cidades com contatos: ${cidades.join(', ')}`);
    }
  }

  linhas.push(`Adesivo perfurado no veículo: ${payload.adesivo_perfurado_veiculo ? 'Sim' : 'Não'}`);
  linhas.push(`Aceita comunicações: ${payload.consent_comunicacao ? 'Sim' : 'Não'}`);

  return linhas.join('\n');
}

/**
 * Processa o cadastro de um voluntário vindo do site do Guto.
 * 1. Verifica duplicata por email
 * 2. Busca/cria município
 * 3. Busca/cria bairro
 * 4. Cria lead com engajamento "Apoiador"
 */
export async function processVoluntario(payload) {
  const email = payload.email.trim().toLowerCase();

  // 1. Verificar duplicata por email
  const { data: existingLead, error: findLeadError } = await supabase
    .from('leads')
    .select('*')
    .eq('email', email)
    .limit(1)
    .maybeSingle();

  if (findLeadError) throw findLeadError;

  if (existingLead) {
    return {
      lead: existingLead,
      is_new_lead: false
    };
  }

  // 2. Buscar ou criar município
  const municipio = await findOrCreateMunicipio(payload.cidade, payload.estado);

  // 3. Buscar ou criar bairro vinculado ao município
  const bairro = await findOrCreateBairro(payload.bairro, municipio.id);

  // 4. Montar e inserir o lead
  const leadData = {
    nome: payload.nome.trim(),
    email: email,
    telefone: payload.telefone.trim(),
    estado: payload.estado.trim().toUpperCase(),
    cidade: payload.cidade.trim(),
    bairro: payload.bairro.trim(),
    origem: 'Voluntário - Site Guto',
    engajamento: 'Apoiador',
    observacoes: buildObservacoes(payload)
  };

  const { data: newLead, error: createError } = await supabase
    .from('leads')
    .insert([leadData])
    .select()
    .single();

  if (createError) throw createError;

  return {
    lead: newLead,
    municipio_id: municipio.id,
    bairro_id: bairro.id,
    is_new_lead: true
  };
}
