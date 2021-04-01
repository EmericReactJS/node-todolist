import { NextFunction, Request, RequestHandler, Response } from 'express';
import { User } from '../store/storeApi';

export const authorize: RequestHandler = (
  request: Request<{}, {}, User>,
  response: Response,
  next: NextFunction
) => {
  if (!request.session.username) {
    response.status(401).send('<p>Unauthorized</p><a href="/">Home</a>');
  }
  next();
};
