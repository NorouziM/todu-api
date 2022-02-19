import User from "../models/User.js";
import asyncHandler from "express-async-handler";

/**
 * @description register user
 * @route POST /api/v1/auth/register
 * @access Public
 *
 */

export const register = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      ...user.email,
      ...user._id,
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
    status: "success",
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
    status: "success",
    data: null,
  });
});
