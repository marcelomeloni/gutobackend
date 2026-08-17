import express from 'express';
import * as estoqueController from './estoque.controller.js';

const router = express.Router();

router.get('/', estoqueController.getAll);
router.get('/movimentacoes', estoqueController.getMovimentacoes);
router.get('/:id', estoqueController.getOne);
router.post('/', estoqueController.create);
router.post('/:id/movimentar', estoqueController.movimentar);
router.put('/:id', estoqueController.update);
router.delete('/:id', estoqueController.remove);

export default router;
