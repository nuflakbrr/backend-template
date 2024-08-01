import express, { Request } from 'express';

interface LogMiddlewareInterface extends Request {
  time?: string;
}

const logMiddleware = express();

logMiddleware.use((req: LogMiddlewareInterface, res, next) => {
  const start = Date.now();
  req.time = new Date(start).toString();

  res.on('finish', () => {
      const duration = Date.now() - start;
      console.log(`${req.method} ${req.hostname} ${req.originalUrl} ${req.time} ${req.ip} ${res.statusCode} ${duration}ms`);
  });

  next();
});

export default logMiddleware;
