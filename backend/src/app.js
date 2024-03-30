import express from 'express';
import logger from 'pino-http';
import indexRoute from './routes/index.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger({ level: process.env.NODE_ENV === 'test' ? 'error' : 'info' }));

app.use('/', indexRoute);


// Generique Middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    
    if (statusCode < 200 || statusCode >= 400) {
      const description = `Error ${statusCode}: ${err.message || 'An unexpected error occurred'}`;
      res.status(statusCode).json({ description });
    } else {
      next(err);
    }
 });

export default app;