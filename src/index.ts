import express, { json, urlencoded } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import config from './config/index';
import 'dotenv/config';
import loggerThis from './config/logger/index';
import route from './config/routes/index';

const port = config.PRODUCT_CATALOGUE_PORT || 6000;

const app = express();

const logger: any = loggerThis;

logger('info','Application starting...');

app.use(urlencoded({ extended: true }));
app.use(json());
app.use(helmet());
app.use(cors());
app.use(fileUpload());

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to product catalogue',
  });
});

route(app);

// 404 error handling
app.use((req, res) => res.status(404).json({
  status: 'error',
  code: 404,
  label: 'NOT_FOUND',
  message: 'Route not found',
}));

// server related error handling
app.use((req, res) => res.status(500).json({
  status: 'error',
  code: 500,
  label: 'INTERNAL_SERVER_ERROR',
  message: 'Ooopppps! Server error, please try again later',
}));

app.listen(port);

logger('info',`Server is running on port ${port}`);

export default app;
