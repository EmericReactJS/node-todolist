import express from 'express';
import bodyParser from 'body-parser';
import { homeRouteHandler } from './routes/home.js';
import deleteRouter from './routes/delete.js';
import createRouter from './routes/create.js';
import db from './mongodb.js';

const app = express();
const port = 3000;
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(express.static('./views/partials'));
app.use('/', homeRouteHandler(router, db));
app.use('/delete', deleteRouter);
app.use('/create', createRouter);

app.listen(port, () => {
  console.log('listening port :', port);
});
