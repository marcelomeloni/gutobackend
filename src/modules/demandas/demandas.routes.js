import express from 'express';
import * as demandasController from './demandas.controller.js';

const router = express.Router();

router.get('/', demandasController.getAll);
router.get('/:id', demandasController.getOne);
router.post('/', demandasController.create);
router.put('/:id', demandasController.update);
router.put('/:id/status', demandasController.updateStatus);
router.delete('/:id', demandasController.remove);

export default router;
