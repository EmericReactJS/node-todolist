import express from 'express';
import { todos, userName } from '../todos.js';

const router = express.Router();

router.post('/:id', (request, response) => {
  const todoId = request.params.id;
  const todoIndexToDelete = todos.findIndex(todo => todo.id == todoId)
  todos.splice(todoIndexToDelete, 1);
  response.redirect('/');
});

export default router;
