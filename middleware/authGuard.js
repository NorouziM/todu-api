import jwt from 'jsonwebtoken';
import { getTranslatedText } from '../utils/i18n.js';
export default async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token || !token.startsWith('Bearer ')) {
    return res.status(401).json({
      status: 'fail',
      data: {
        message: getTranslatedText(req, 'AUTH_ERROR'),
      },
    });
  }
  try {
    const decoded = await jwt.verify(
      token.split(' ')[1],
      process.env.JWT_SECRET
    );
    req.user = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({
      status: 'fail',
      data: {
        message: getTranslatedText(req, 'AUTH_ERROR'),
      },
    });
  }
};
