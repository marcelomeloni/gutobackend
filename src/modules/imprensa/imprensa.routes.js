import express from 'express';
import * as imprensaController from './imprensa.controller.js';

const router = express.Router();

// Entrevistas
router.get('/', imprensaController.getAllEntrevistas);
router.get('/veiculos', imprensaController.getAllVeiculos);
router.post('/', imprensaController.createEntrevista);
router.put('/:id', imprensaController.updateEntrevista);
router.delete('/:id', imprensaController.removeEntrevista);

// Veículos
router.post('/veiculos', imprensaController.createVeiculo);
router.delete('/veiculos/:id', imprensaController.removeVeiculo);

export default router;
