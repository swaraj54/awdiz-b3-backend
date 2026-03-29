import { Router } from "express";
import { Login, Register, AddCart, GetCart , MakeOrder, GetOrders} from "../controllers/user.controllers.js";
import { checkToken } from "../middlewares/authMiddlewares.js";

const UserRouter = Router();

UserRouter.post("/register", Register);

UserRouter.post("/login", Login);


UserRouter.post("/add-cart",checkToken, AddCart);

UserRouter.get("/get-cart", checkToken, GetCart

)
UserRouter.get("/make-order", checkToken, MakeOrder)
UserRouter.get("/get-orders", checkToken, GetOrders)

export default UserRouter;
