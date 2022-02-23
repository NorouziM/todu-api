import { Router } from "express";
import {
  register,
  getUsers,
  deleteUser,
  login,
  getCurrentUserData,
} from "../controllers/users.js";
import { advancedResults } from "../middleware/advancedResults.js";
import User from "../models/User.js";
import authGuard from "../middleware/authGuard.js";
import adminGuard from "../middleware/adminGuard.js";

const router = Router();

router.route("/register").post(register);
router.route("/login").post(login);
router
  .route("/users")
  .get(authGuard, adminGuard, advancedResults(User), getUsers);
router.route("/users/:id").delete(authGuard, adminGuard, deleteUser);
router.route("/me").get(authGuard, getCurrentUserData);

export default router;
