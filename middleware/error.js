import { connectDB } from '../utils/db.js';
import { getTranslatedText } from '../utils/i18n.js';

const errorHandler = (error, req, res, next) => {
  const errorMessagesObject = getErrorMessages(error, req);

  console.log(error, 'error');

  if (error.name === 'MongooseError') connectDB();

  if (
    error.name === 'MongoServerError' ||
    error.name === 'MongoError' ||
    error.name === 'TypeError' ||
    error.name === 'ReferenceError'
  ) {
    if (error.code === 11000)
      return res.status(400).json({
        status: 'fail',
        data: {
          message:
            getTranslatedText(req, 'DUPLICATE_ERROR') +
            Object.keys(error.keyValue)[0],
        },
      });

    return res.status(500).json({
      status: 'error',
      data: {
        message: getTranslatedText(req, 'SERVER_ERROR'),
      },
    });
  }
  res.status(400).json({
    status: 'fail',
    data: {
      message: errorMessagesObject || getTranslatedText(req, 'GENERAL_ERROR'),
    },
  });
};

export default errorHandler;

const getErrorMessages = (error, req) => {
  const errorMessages = {};
  for (const key in error.errors) {
    errorMessages[key] =
      getTranslatedText(req, error.errors[key].properties?.message) ||
      error.errors[key].properties?.message;
  }

  if (error.name === 'CastError')
    errorMessages.CastError = getTranslatedText(req, 'INVALID_INPUTS');

  return errorMessages;
};
