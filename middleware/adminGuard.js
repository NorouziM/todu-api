import User from "../models/User.js";
export default async (req, res, next) => {
  const user = await User.findById(req.user);

  if (!user) {
    return res.status(401).json({
      status: "fail",
      data: {
        message: "احراز هویت انجام نشده‌ است.",
      },
    });
  }

  if (user.role !== "admin") {
    return res.status(401).json({
      status: "fail",
      data: {
        message: "دسترسی لازم را ندارید.",
      },
    });
  }

  next();
};
