import httpErrors from 'http-errors';
import express from 'express';
import path from 'path';
import morgan from 'morgan';
import cors from 'cors';
import compression from 'compression';

import apiRouter from './routes/index';

const app = express();

// Setup Request logging
const logFormat = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';

app.use(
  morgan(logFormat, {
    skip: (_req, res) => {
      return res.statusCode < 400;
    },
    stream: process.stderr,
  })
);

app.use(
  morgan(logFormat, {
    skip: (_req, res) => {
      return res.statusCode >= 400;
    },
    stream: process.stdout,
  })
);

app.disable('x-powered-by');
app.use(compression());
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use((_req, _res, next) => {
  next(httpErrors(404));
});

// error handler
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({ status: 'error', message: err });
  }
);

export default app;
