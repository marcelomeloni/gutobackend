import express from 'express';
import * as financeiroController from './financeiro.controller.js';

const router = express.Router();

router.get('/', financeiroController.getAll);
router.get('/:id', financeiroController.getOne);
router.post('/', financeiroController.create);
router.put('/:id', financeiroController.update);
router.delete('/:id', financeiroController.remove);

export default router;
