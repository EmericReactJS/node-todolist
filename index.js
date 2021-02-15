import express from 'express';
import bodyParser from 'body-parser';
import homeRouter from './routes/home.js';
import deleteRouter from './routes/delete.js';
import createRouter from './routes/create.js';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(express.static('./views/partials'));
app.use('/', homeRouter);
app.use('/delete', deleteRouter);
app.use('/create', createRouter);

app.listen(port, () => {
  console.log('listening port :', port);
});
