import Todo from "../models/Todo.js";

/**
 * @description Create Todo
 * @access Private
 * @route POST /api/v1/todos/
 */

export const createTodo = (req, res) => {
  if (!req.body.title)
    return res.status(400).json({
      status: "fail",
      data: {
        message: "No data",
      },
    });
  Todo.create(req.body)
    .then((todo) => {
      res.status(201).json({
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
 * @description Get all Todos
 * @access Private
 * @route GET /api/v1/todos/
 */

export const getTodos = (req, res) => {
  Todo.find()
    .then((todos) => {
      res.json({
        status: "success",
        data: {
          todos,
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
 * @description Get one Todo
 * @access Private
 * @route GET /api/v1/todos/:id
 */

export const getTodo = (req, res, next) => {
  Todo.findById(req.params.id)
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
      next(error);
    });
};

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
