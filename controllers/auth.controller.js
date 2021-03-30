import { findOne, insertOne } from '../store/storeApi.js';

export async function signup(request, response) {
  const newUser = {
    name: request.body.name,
    password: request.body.password,
    todos: []
  };
  await insertOne('users', newUser);
  response.redirect('/');
}

export async function login(request, response) {
  const credentials = {
    name: request.body.name,
    password: request.body.password
  };
  const user = await findOne('users', {
    name: credentials.name,
    password: credentials.password
  });
  if (user !== undefined) {
    request.session.user = {
      name: user.name
    };
    response.status(302).redirect('/');
  } else {
    response.status(404).send('<p>Error</p><a href="/">Home</a>');
  }
}
