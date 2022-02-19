import Todo from "../models/Todo.js";
import asyncHandler from "express-async-handler";

/**
 * @description Create Todo
 * @access Private
 * @route POST /api/v1/todos/
 */

export const createTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.create(req.body);
  res.status(201).json({
    status: "success",
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
    status: "success",
    data: {
      todos: res.locals.advancedResults.results,
    },
  });
});

/**
 * @description Get one Todo
 * @access Private
 * @route GET /api/v1/todos/:id
 */

export const getTodo = asyncHandler(async (req, res, next) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo)
    return res.status(400).json({
      status: "fail",
      data: {
        message: "یافت نشد.",
      },
    });

  res.json({
    status: "success",
    data: {
      todo,
    },
  });
});

/**
 * @description Update one todo
 * @access Private
 * @route PUT /api/v1/todos/:id
 */

export const updateTodo = (req, res) => {
  Todo.findOneAndUpdate({ id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  })
    .then((todo) => {
      if (!todo)
        return res.status(400).json({
          status: "fail",
          data: {
            message: "Not Found",
          },
        });

      res.json({
        status: "success",
        data: {
          todo,
        },
      });
    })
    .catch((error) => {
      res.status(400).json({
        status: "fail",
        data: {
          message: error.message,
        },
      });
    });
};

/**
 * @description Delete one todo
 * @access Private
 * @route DELETE /api/v1/todos/:id
 * @returns {object}
 */

export const deleteTodo = asyncHandler(async (req, res) => {
  const todo = Todo.findOneAndDelete({ id: req.params.id });

  if (!todo)
    return res.status(400).json({
      status: "fail",
      data: {
        message: "Not Found",
      },
    });
  res.json({
    status: "success",
    data: {
      message: "Todo deleted",
    },
  });
});
