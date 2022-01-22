const errorHandler = (error, _, res, next) => {
  const errorMessagesObject = getErrorMessages(error);
  let errorSingleMessage = "";
  if(error.name === "ValidationError" ){

  } else if(error.name === "CastError") {
    errorSingleMessage = "CastError - مقادیر وارد شده در فیلد معتبر نیست.";
  } else {
    console.log(error.name,"error.name");
  }
  return res.status(400).json({
    status: "fail",
    data: {
      message: errorMessagesObject || errorSingleMessage || "خطایی رخ داده است.",
    },
  });

  res.status(500).json({
    status: "error",
    data: {
      message: "No data",
    },
  })
};

export default errorHandler;


const getErrorMessages = (error) => {
  const errorMessages = {};
  for (const key in error.errors) {
    errorMessages[key] = error.errors[key].properties.message;
  }

  return errorMessages;
}
