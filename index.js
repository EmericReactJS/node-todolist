import express from 'express';
import session from 'express-session';
import { authorize } from './auth/authorize.js';
import { router as todosRouter } from './routes/todos.js';
import { router as authRouter } from './routes/auth.js';

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('./views/partials'));
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    name: 'sid',
    secret: 'supersecret',
    resave: false,
    saveUninitialized: false
  })
);
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
