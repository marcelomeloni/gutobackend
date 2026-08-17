import express from 'express';
import * as imprensaController from './imprensa.controller.js';

const router = express.Router();

router.get('/', imprensaController.getAll);
router.get('/entrevistas', imprensaController.getAllEntrevistas);
router.post('/entrevistas', imprensaController.createEntrevista);
router.put('/entrevistas/:id', imprensaController.updateEntrevista);
router.delete('/entrevistas/:id', imprensaController.removeEntrevista);
router.get('/:id', imprensaController.getOne);
router.post('/', imprensaController.create);
router.put('/:id', imprensaController.update);
router.delete('/:id', imprensaController.remove);

export default router;
