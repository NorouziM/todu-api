import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import hpp from 'hpp';
import errorHandler from './middleware/error.js';
import users from './routes/users.js';
import todos from './routes/todos.js';
import { connectDB } from './utils/db.js';

dotenv.config();

connectDB();

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
});

app.use(limiter);
app.use(helmet);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize());
app.use(hpp());
app.use(cookieParser());
app.use('/api/v1/auth', users);
app.use('/api/v1/todos', todos);
app.use(errorHandler);

const server = app.listen(process.env.PORT);

process.on('unhandledRejection', (err, promise) => {
  server.close(() => {
    process.exit(1);
  });
});
