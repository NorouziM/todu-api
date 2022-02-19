import { Router } from "express";
import { register, getUsers, deleteUser } from "../controllers/users.js";
import { advancedResults } from "../middleware/advancedResults.js";
import User from "../models/User.js";

const router = Router();

router.route("/register").post(register);
router.route("/users").get(advancedResults(User), getUsers);
router.route("/users/:id").delete(deleteUser);

export default router;
