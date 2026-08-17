import express from 'express';
import * as marketingController from './marketing.controller.js';

const router = express.Router();

router.get('/', marketingController.getAll);
router.get('/:id', marketingController.getOne);
router.post('/', marketingController.create);
router.put('/:id', marketingController.update);
router.delete('/:id', marketingController.remove);

export default router;
