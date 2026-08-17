import express from 'express';
import * as imprensaController from './imprensa.controller.js';

const router = express.Router();

router.get('/', imprensaController.getAll);
router.get('/:id', imprensaController.getOne);
router.post('/', imprensaController.create);
router.put('/:id', imprensaController.update);
router.delete('/:id', imprensaController.remove);

export default router;
