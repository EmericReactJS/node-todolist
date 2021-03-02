import { findAll, update, deleteOne } from '../mongodb.js';

export async function get(request, response) {
  const userName = request.session.user.name;
  const todos = await findAll('users', { name: userName });
  response.render('../views/pages/todos', {
    userName: userName,
    todos: todos.todos
  });
}

export async function post(request, response) {
  const userName = request.session.user.name;
  const newTodo = request.body;
  await update('users', { name: userName }, { todos: newTodo });
  response.status(201).redirect('/todos/list');
}

export async function del(request, response) {
  const userName = request.session.user.name;
  const todoName = request.params.name;
  await deleteOne('users', { name: userName }, { name: todoName });
  response.redirect('../list');
}
