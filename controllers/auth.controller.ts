import { Request, Response } from 'express';
import { findOne, insertOne, User } from '../store/storeApi';

export async function signup(
  request: Request<{}, {}, User>,
  response: Response
) {
  const newUser: User = {
    name: request.body.name,
    password: request.body.password,
    todos: []
  };
  await insertOne('users', newUser);
  response.redirect('/');
}

export async function login(
  request: Request<{}, {}, User>,
  response: Response
) {
  const credentials = {
    name: request.body.name,
    password: request.body.password
  };
  const user: User = await findOne('users', {
    name: credentials.name,
    password: credentials.password
  });
  if (user !== undefined) {
    request.session.username = user.name;
    response.status(302).redirect('/');
  } else {
    response.status(404).send('<p>Error</p><a href="/">Home</a>');
  }
}
