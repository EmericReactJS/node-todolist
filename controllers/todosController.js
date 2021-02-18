import { findOne, findAll, create, del } from '../mongodb.js';
// collection and userName hard coded

const todoList = async (request, response) => {
  const todos = await findAll('todo_names');
  response.render('../views/pages/index', {
    userName: 'Emeric',
    todos
  });
};

const createTodo = async (request, response) => {
  const newTodoName = request.body;
  await create('todo_names', newTodoName);
  response.status(201).redirect('/');
};

const deleteTodo = async (request, response) => {
	const todoId = request.params.id;
	await del('todo_names', todoId);
	response.redirect('/');
}

export { todoList, createTodo, deleteTodo };
