import { Request, Response } from 'express';
import { findAllTodos, update, deleteOne, Todo } from '../store/storeApi';

/**
 * Starting with Express 5, route handlers and middleware that return a
 * Promise will call next(value) automatically when they reject or throw an error.
 * Now we should wrap the Promise in a try/catch
 */
export async function get(request: Request, response: Response) {
  const todos: Todo[] = await findAllTodos('users', {
    name: request.session.username
  });
  response.render('../views/pages/todos', {
    userName: request.session.username,
    todos: todos
  });
}

export async function post(request: Request<{}, {}, Todo>, response: Response) {
  const newTodo = request.body;
  await update('users', { name: request.session.username }, newTodo);
  response.status(201).redirect('/todos/list');
}

export async function del(request: Request, response: Response) {
  const todoName = request.params.name;
  await deleteOne('users', { name: request.session.username }, todoName);
  response.redirect('../list');
}
