import express from 'express';
import { todos, userName } from '../todos.js';

const router = express.Router();

router.post('/', (request, response) => {
	const newTodo = request.body.name;
  todos.push({ id: todos[todos.length - 1], name: newTodo });
	response.redirect('/')
});

export default router;
