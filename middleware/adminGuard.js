import User from '../models/User.js';
import { getTranslatedText } from '../utils/i18n.js';
export default async (req, res, next) => {
  const user = await User.findById(req.user);

  if (!user) {
    return res.status(401).json({
      status: 'fail',
      data: {
        message: getTranslatedText(req, 'AUTH_ERROR'),
      },
    });
  }

  if (user.role !== 'admin') {
    return res.status(401).json({
      status: 'fail',
      data: {
        message: getTranslatedText(req, 'ACCESS_DENIED'),
      },
    });
  }

  next();
};
