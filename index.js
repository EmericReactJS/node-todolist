import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import client from './store/client.js';
import morgan from 'morgan';
import { authorize } from './auth/authorize.js';
import { router as todosRouter } from './routes/todos.js';
import { router as authRouter } from './routes/auth.js';

const app = express();
const port = 3000;
const loggerFormat =
  ':remote-addr - :remote-user [:date[clf]] :status :user :sessionid';
	morgan.token('sessionid', (req, res, param) => {
		return req.sessionID;
	});
	morgan.token('user', (req, res, param) => {
		return req.session.user;
	});
app.set('view engine', 'ejs');
app.use(express.static('./views/partials'));
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.EXPRESS_SESSION_SECRET,
    store: MongoStore.create({
      client,
      dbName: process.env.MONGODB_DB_NAME,
      ttl: 86400 // 1 day
    }),
    resave: false,
    saveUninitialized: false
  })
);
app.use(morgan(loggerFormat));
app.disable('x-powered-by');

app.use('/auth', authRouter);
app.use('/todos', authorize, todosRouter);
app.get('/', (request, response) => {
  response.render('../views/pages/home', {
    authorizedUser: request.session.user
  });
});

app.listen(port, () => {
  console.log('listening port :', port);
});
