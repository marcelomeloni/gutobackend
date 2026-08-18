import express from 'express';
import { validateWebhookSecret } from './webhook.middleware.js';
import { receberVoluntario } from './webhook.controller.js';

const router = express.Router();

// POST /api/webhooks/voluntarios
router.post('/voluntarios', validateWebhookSecret, receberVoluntario);

export default router;
