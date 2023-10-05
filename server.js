// npm
import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import i18n from 'i18n-express';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import hpp from 'hpp';
import * as path from 'path';
import cors from 'cors';
// middleware
import errorHandler from './middleware/error.js';
// routes
import users from './routes/users.js';
import todos from './routes/todos.js';
import collections from './routes/collections.js';
// config
import { connectDB } from './utils/db.js';

dotenv.config();

connectDB();

const app = express();
app.use(cors({
    origin: '*'
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize());
app.use(cookieParser());
app.use(helmet());
app.use(hpp());

app.use(
  i18n({
    translationsPath: path.join(path.resolve(path.dirname('')), 'locales'),
    siteLangs: ['en', 'fa'],
    textsVarName: 'translation',
    defaultLang: 'fa',
  })
);

app.use('/api/v1/auth', users);
app.use('/api/v1/todos', todos);
app.use('/api/v1/collection', collections);
app.use(errorHandler);

const server = app.listen(process.env.PORT);

process.on('unhandledRejection', (err, promise) => {
  server.close(() => {
    process.exit(1);
  });
});
