import express from 'express';
import bodyParser from 'body-parser';
import { router } from './routes/index.js';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(express.static('./views/partials'));
app.use('/', router);

app.listen(port, () => {
  console.log('listening port :', port);
});
