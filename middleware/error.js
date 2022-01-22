const errorHandler = (error, _, res, next) => {
  const errorMessagesObject = getErrorMessages(error);
  console.log(error.name,"error.name");

  if(error.name === "MongoServerError")
  return res.status(500).json({
    status: "error",
    data: {
      message: "مشکلی در سرور پیش آمده است.",
    },
  })
  res.status(400).json({
    status: "fail",
    data: {
      message: errorMessagesObject || "خطایی رخ داده است.",
    },
  });

  
};

export default errorHandler;


const getErrorMessages = (error) => {
  const errorMessages = {};
  for (const key in error.errors) {
    errorMessages[key] = error.errors[key].properties.message;
  }

  if(error.name === "CastError")
    errorMessages.CastError = "مقادیر وارد شده در فیلد معتبر نیست.";

  return errorMessages;
}
