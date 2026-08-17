import express from 'express';
import * as bairrosController from './bairros.controller.js';

const router = express.Router();

router.get('/', bairrosController.getAll);
router.get('/:id', bairrosController.getOne);
router.post('/', bairrosController.create);
router.put('/:id', bairrosController.update);
router.delete('/:id', bairrosController.remove);

export default router;
