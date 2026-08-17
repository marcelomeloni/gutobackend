import express from 'express';
import cors from 'cors';

// Import Routes
import leadsRoutes from './modules/leads/leads.routes.js';
import demandasRoutes from './modules/demandas/demandas.routes.js';
import bairrosRoutes from './modules/bairros/bairros.routes.js';
import marketingRoutes from './modules/marketing/marketing.routes.js';
import imprensaRoutes from './modules/imprensa/imprensa.routes.js';
import tarefasRoutes from './modules/tarefas/tarefas.routes.js';
import agendaRoutes from './modules/agenda/agenda.routes.js';
import estoqueRoutes from './modules/estoque/estoque.routes.js';
import financeiroRoutes from './modules/financeiro/financeiro.routes.js';
import usuariosRoutes from './modules/usuarios/usuarios.routes.js';
import authRoutes from './modules/auth/auth.routes.js';
import arquivosRoutes from './modules/arquivos/arquivos.routes.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadsRoutes);
app.use('/api/demandas', demandasRoutes);
app.use('/api/bairros', bairrosRoutes);
app.use('/api/marketing', marketingRoutes);
app.use('/api/imprensa', imprensaRoutes);
app.use('/api/tarefas', tarefasRoutes);
app.use('/api/agenda', agendaRoutes);
app.use('/api/estoque', estoqueRoutes);
app.use('/api/financeiro', financeiroRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/arquivos', arquivosRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend Político Operacional' });
});

export default app;
