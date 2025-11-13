import { Router } from "express";
import * as authController from "../controllers/auth.controller";
import * as userController from "../controllers/user.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/role.middleware";
import { Role } from "@prisma/client";

const router = Router();

// public
router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);
router.post("/auth/logout", authenticate, authController.logout);

// protected - view all users: only ADMIN or MODERATOR
router.get(
  "/users",
  authenticate,
  authorize([Role.ADMIN, Role.MODERATOR]),
  userController.listUsers
);

export default router;
