import { Router } from "express";
import { Login, Register, AddCart } from "../controllers/user.controllers.js";
import { checkToken } from "../middlewares/authMiddlewares.js";

const UserRouter = Router();

UserRouter.post("/register", Register);

UserRouter.post("/login", Login);


UserRouter.post("/add-cart",checkToken, AddCart);

export default UserRouter;
