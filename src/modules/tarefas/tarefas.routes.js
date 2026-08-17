import express from 'express';
import * as tarefasController from './tarefas.controller.js';

const router = express.Router();

router.get('/', tarefasController.getAll);
router.get('/:id', tarefasController.getOne);
router.post('/', tarefasController.create);
router.put('/:id', tarefasController.update);
router.delete('/:id', tarefasController.remove);

export default router;
