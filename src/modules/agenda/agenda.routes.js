import express from 'express';
import * as agendaController from './agenda.controller.js';

const router = express.Router();

router.get('/', agendaController.getAll);
router.get('/:id', agendaController.getOne);
router.post('/', agendaController.create);
router.put('/:id', agendaController.update);
router.delete('/:id', agendaController.remove);

export default router;
