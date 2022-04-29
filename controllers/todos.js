import Todo from '../models/Todo.js';
import asyncHandler from 'express-async-handler';
import { getTranslatedText } from '../utils/i18n.js';

/**
 * @description Create Todo
 * @access Private
 * @route POST /api/v1/todos/
 */

export const createTodo = asyncHandler(async (req, res) => {
  req.body.userId = req.user;
  const todo = await Todo.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      todo,
    },
  });
});

/**
 * @description Get all Todos
 * @access Private
 * @route GET /api/v1/todos/
 */

export const getTodos = asyncHandler(async (req, res) => {
  res.json({
    count: res.locals.advancedResults.count,
    status: 'success',
    data: {
      todos: res.locals.advancedResults.results,
    },
  });
});

/**
 * @description Get a user's Todos
 * @access Private
 * @route GET /api/v1/todos/user
 */
export const getUserTodos = asyncHandler(async (req, res) => {
  const { page = 1, page_size = 10 } = req.query;
  const reqQuery = { ...req.query };
  const sortBy = reqQuery.sort || '-date_added';
  const { search = '' } = req.query;

  const todos = await Todo.find({
    userId: req.user,
    $or: [
      { title: { $regex: search, $options: 'i' } },
      { content: { $regex: search, $options: 'i' } },
    ],
  })
    .limit(Number(page_size))
    .skip(Number(page_size) * (Number(page) - 1))
    .sort(sortBy);

  const totalCount = await Todo.countDocuments({ userId: req.user });

  res.json({
    status: 'success',
    count: totalCount,
    data: {
      todos,
    },
  });
});

/**
 * @description Update one todo
 * @access Private
 * @route PUT /api/v1/todos/:id
 */

export const updateTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findOne({ _id: req.params.id, userId: req.user });
  if (!todo)
    return res.status(400).json({
      status: 'fail',
      data: {
        message: getTranslatedText(req, 'NOT_FOUND'),
      },
    });

  todo.title = req.body.title || todo.title;
  todo.content = req.body.content || todo.content;
  todo.dateCompleted = req.body.dateCompleted || todo.dateCompleted;
  todo.isDone = req.body.isDone || todo.isDone;

  await todo.save();

  res.json({
    status: 'success',
    data: {
      todo,
    },
  });
});

/**
 * @description Delete one todo
 * @access Private
 * @route DELETE /api/v1/todos/:id
 * @returns {object}
 */

export const deleteTodo = asyncHandler(async (req, res) => {
  Todo.findByIdAndRemove(req.params.id, (err) => {
    if (err)
      return res.status(400).json({
        status: 'fail',
        data: {
          message: getTranslatedText(req, 'NOT_FOUND'),
        },
      });
    else
      return res.json({
        status: 'success',
        data: {
          message: getTranslatedText(req, 'TODO_DELETED'),
        },
      });
  });
});
