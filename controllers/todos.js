import Todo from "../models/Todo.js";
import asyncHandler from 'express-async-handler'

/**
 * @description Create Todo
 * @access Private
 * @route POST /api/v1/todos/
 */

export const createTodo = asyncHandler( async (req, res) => {
  const todo = await Todo.create(req.body)
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
  const { page = 1, page_size = 10 } = req.query;
  const reqQuery = {...req.query};
  const sortBy = reqQuery.sort || "-date_added";
  const {search = ""} = req.query;
  const todos = await Todo.find({$or:[{title: { "$regex": search, "$options": "i" }},{content: { "$regex": search, "$options": "i" }}]}).limit(Number(page_size)).skip(Number(page_size) * (Number(page) - 1)).sort(sortBy);
  
  
  const count = await Todo.countDocuments();
  res.json({
    count,
    status: "success",
    data: {
      todos,
    },
  });
});

/**
 * @description Get one Todo
 * @access Private
 * @route GET /api/v1/todos/:id
 */

export const getTodo = asyncHandler( async (req, res, next) => {
  const todo = await Todo.findById(req.params.id)
  if(!todo)
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

export const deleteTodo = asyncHandler(async(req, res) => {
  const todo  = Todo.findOneAndDelete({ id: req.params.id })

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
    
})
