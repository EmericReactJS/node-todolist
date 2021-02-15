import { todos, userName } from '../todos.js';

const homeRouteHandler = (router, db) => {
  return router.get('/', async (request, response) => {
    const todosCollection = db.collection('todos');
    const cursor = todosCollection.find({});
    const todos = await cursor.toArray();

    response.render('../views/pages/index', {
      userName,
      todos
    });
  });
};

export { homeRouteHandler };
