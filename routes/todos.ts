import express, { Router } from 'express';
import * as todosController from '../controllers/todos.controller';

const router: Router = express.Router();

router.get('/list', todosController.get);

router.post('/create', todosController.post);

router.post('/delete/:name', todosController.del);

export { router };
