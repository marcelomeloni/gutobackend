import express from 'express';
import * as estoqueController from './estoque.controller.js';

const router = express.Router();

router.get('/', estoqueController.getAll);
router.get('/:id', estoqueController.getOne);
router.post('/', estoqueController.create);
router.put('/:id', estoqueController.update);
router.delete('/:id', estoqueController.remove);

export default router;
