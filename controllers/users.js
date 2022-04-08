import User from '../models/User.js';
import asyncHandler from 'express-async-handler';
import { sendtokenInCookie } from '../utils/auth.js';
import { getTranslatedText } from '../utils/i18n.js';

/**
 * @description register user
 * @route POST /api/v1/auth/register
 * @access Public
 *
 */

export const register = asyncHandler(async (req, res, next) => {
  delete req.body.role;
  const user = await User.create(req.body);

  sendtokenInCookie(res, user.getUserToken(), 200);
});

/**
 * @description login user
 * @route POST /api/v1/auth/login
 * @access Public
 */

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');

  if (!email || !password)
    return res.status(401).json({
      status: 'fail',
      data: {
        message: getTranslatedText(req, 'NO_EMAIL_OR_PASSWORD'),
      },
    });

  if (!user)
    return res.status(401).json({
      status: 'fail',
      data: {
        message: getTranslatedText(req, 'WRONG_CREDENTIALS'),
      },
    });

  const isMatch = await user.matchPassword(password);

  if (!isMatch)
    return res.status(401).json({
      status: 'fail',
      data: {
        message: getTranslatedText(req, 'WRONG_CREDENTIALS'),
      },
    });

  sendtokenInCookie(res, user.getUserToken(), 200);
});

/**
 * @description Get current user data
 * @route GET /api/v1/auth/me
 * @access Private
 */

export const getCurrentUserData = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user);

  if (!user)
    return res.status(404).json({
      status: 'fail',
      data: {
        message: getTranslatedText(req, 'USER_NOT_FOUND'),
      },
    });

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

/**
 * @description get users
 * @route GET /api/v1/users
 * @access Private
 */
export const getUsers = asyncHandler(async (req, res, next) => {
  res.json({
    count: res.locals.advancedResults.count,
    status: 'success',
    data: {
      users: res.locals.advancedResults.results,
    },
  });
});

/**
 * @description delete user
 * @route DELETE /api/v1/users/:id
 * @access Private
 */

export const deleteUser = asyncHandler(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);

  res.json({
    status: 'success',
    data: null,
  });
});
