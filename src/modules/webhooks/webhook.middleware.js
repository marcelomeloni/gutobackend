/**
 * Middleware de autenticação para webhooks externos.
 * Valida o header x-webhook-secret contra a env WEBHOOK_SECRET.
 */
export const validateWebhookSecret = (req, res, next) => {
  const secret = req.headers['x-webhook-secret'];
  const expected = process.env.WEBHOOK_SECRET;

  if (!expected) {
    console.error('[Webhook] WEBHOOK_SECRET não configurado no .env');
    return res.status(500).json({
      success: false,
      error: 'Configuração do servidor incompleta.'
    });
  }

  if (!secret || secret !== expected) {
    return res.status(401).json({
      success: false,
      error: 'Webhook secret inválido ou ausente.'
    });
  }

  next();
};
