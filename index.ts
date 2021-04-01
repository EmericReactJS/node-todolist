import express, { Request, Response, Router } from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import client from './store/client';
import morgan from 'morgan';
import { authorize } from './auth/authorize';
import { router as todosRouter } from './routes/todos';
import { router as authRouter } from './routes/auth';

const app = express();
const port = 3000;

// const loggerFormat =
//   ':remote-addr - :remote-user [:date[clf]] :status :user :sessionid';
// morgan.token('sessionid', (req: Request, res, param) => {
//   if (req.sessionID) return req.sessionID;
// });
// morgan.token('user', (req: Request, res, param) => {
//   if (req.session.username) return req.session.username;
// });
// app.use(morgan(loggerFormat));

app.set('view engine', 'ejs');
app.use(express.static('./views/partials'));
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.EXPRESS_SESSION_SECRET as string,
    store: MongoStore.create({
      client,
      dbName: process.env.MONGODB_DB_NAME,
      ttl: 86400 // 1 day
    }),
    resave: false,
    saveUninitialized: false
  })
);
app.disable('x-powered-by');


app.use('/auth', authRouter);
app.use('/todos', authorize, todosRouter);

/**
 * It renders conditionaly on '/' path: 
 * - home page for a logged in uer
 * - login page for anonymous
 * request.session object is initialized after successful login
 * at '/login'
 */
app.get('/', (request: Request, response: Response) => {
  response.render('../views/pages/home', {
    authorizedUser: request.session.username
  });
});

app.listen(port, () => {
  console.log('listening port :', port);
});
