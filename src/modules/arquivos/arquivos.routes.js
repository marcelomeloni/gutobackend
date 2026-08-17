import express from 'express';
import * as arquivosController from './arquivos.controller.js';

const router = express.Router();

router.get('/', arquivosController.getAll);
router.get('/:id', arquivosController.getOne);
router.post('/', arquivosController.create);
router.put('/:id', arquivosController.update);
router.delete('/:id', arquivosController.remove);

export default router;
