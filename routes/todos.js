import express from 'express';
import * as listController from '../controllers/todos.controller.js';

const router = express.Router();

router.get('/list', listController.get);

router.post('/create', listController.post);

router.post('/delete/:name', listController.del);

export { router };
