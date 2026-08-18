import { processVoluntario } from './webhook.service.js';

const REQUIRED_FIELDS = ['nome', 'email', 'telefone', 'estado', 'cidade', 'bairro'];

export const receberVoluntario = async (req, res) => {
  try {
    const payload = req.body;

    // 1. Honeypot — se preenchido, é bot. Retorna 200 silencioso.
    if (payload.website && payload.website.trim() !== '') {
      return res.status(200).json({
        success: true,
        message: 'Cadastro recebido.'
      });
    }

    // 2. Validar campos obrigatórios
    const missing = REQUIRED_FIELDS.filter(f => !payload[f] || !String(payload[f]).trim());
    if (missing.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Campos obrigatórios faltando.',
        missing_fields: missing
      });
    }

    // 3. Validar consentimentos obrigatórios
    if (!payload.consent_privacidade || !payload.consent_sensiveis) {
      return res.status(422).json({
        success: false,
        error: 'Consentimentos obrigatórios não foram aceitos.'
      });
    }

    // 4. Processar cadastro
    const result = await processVoluntario(payload);

    if (result.is_new_lead) {
      return res.status(201).json({
        success: true,
        message: 'Voluntário cadastrado com sucesso como Apoiador.',
        data: result
      });
    } else {
      return res.status(200).json({
        success: true,
        message: 'Voluntário já cadastrado anteriormente.',
        data: result
      });
    }
  } catch (error) {
    console.error('[Webhook Voluntários] Erro:', error.message);
    return res.status(500).json({
      success: false,
      error: 'Erro interno ao processar cadastro de voluntário.'
    });
  }
};
