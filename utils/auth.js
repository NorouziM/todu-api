export const sendtokenInCookie = (res, token, statusCode) => {
  const options = {
    maxAge: process.env.JWT_COOKIE_EXPIRE,
    httpOnly: true,
    ...(process.env.NODE_ENV === "production" && { secure: true }),
  };

  res.status(statusCode).cookie("jwt_token", token, options).json({
    status: "success",
    data: {
      token,
    },
  });
};
