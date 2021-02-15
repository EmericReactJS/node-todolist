import express from 'express';
import { todos, userName } from '../todos.js';

const router = express.Router();

router.get('/', (request, response) => {
  response.render('../views/pages/index', {
    userName,
    todos
  });
});

export default router;
