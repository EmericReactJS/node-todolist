import express from 'express';
import {
  todoList,
  createTodo,
  deleteTodo
} from '../controllers/todosController.js';

const router = express.Router();

router.get('/', todoList);

router.post('/create', createTodo);

router.post('/delete/:id', deleteTodo);

export { router };
