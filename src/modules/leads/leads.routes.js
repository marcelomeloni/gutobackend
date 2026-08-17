import express from 'express';
import * as leadsController from './leads.controller.js';

const router = express.Router();

router.get('/', leadsController.getAll);
router.get('/:id', leadsController.getOne);
router.post('/', leadsController.create);
router.put('/:id', leadsController.update);
router.delete('/:id', leadsController.remove);

export default router;
