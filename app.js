import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from 'cors';
import favicon from 'serve-favicon'
import path from 'path';
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import Routes from './routes/Routes.js';


const app = express();

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

app.set('view engine', 'ejs');

app.use(cors())
app.use(morgan("dev"));
// app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')))


// Main Routes
app.use('/', Routes);


// 404 page
app.use((req, res) => {
  res.status(404).sendFile('./views/404.html', { root: __dirname });
});

app.listen(3000);