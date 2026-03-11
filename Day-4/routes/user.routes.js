import { Router } from "express";
import { Login, Register } from "../controllers/user.controllers.js";

const UserRouter = Router();

UserRouter.get("/register", Register);

UserRouter.get("/login", Login);

export default UserRouter;
