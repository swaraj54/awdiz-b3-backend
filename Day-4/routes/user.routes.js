import { Router } from "express";
import { Login, Register } from "../controllers/user.controllers.js";

const UserRouter = Router();

UserRouter.post("/register", Register);

UserRouter.post("/login", Login);

export default UserRouter;
