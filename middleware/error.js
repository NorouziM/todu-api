const errorHandler = (error, _, res, next) => {
  res.status(500).json({
    status: "error",
    data: {
      message: error.message,
    },
  });
};

export default errorHandler;
