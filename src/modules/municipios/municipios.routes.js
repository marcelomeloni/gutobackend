import express from 'express';
import * as municipiosController from './municipios.controller.js';

const router = express.Router();

router.get('/', municipiosController.getAll);
router.post('/', municipiosController.create);
router.delete('/:id', municipiosController.remove);

export default router;
