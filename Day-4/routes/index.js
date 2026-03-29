import { Router } from "express";
import AdminRouter from "./admin.routes.js";
import UserRouter from "./user.routes.js";
import ProductRouter from "./product.routes.js";
import OperatorRouter from "./operator.routes.js";

const MainRouter = Router();

// router level middleware
MainRouter.use("/admin", AdminRouter);
MainRouter.use("/user", UserRouter); // login register
MainRouter.use("/product", ProductRouter);
MainRouter.use("/operators", OperatorRouter)
// MainRouter.use("/user", AdminRouter)
// MainRouter.use("/seller", AdminRouter)

export default MainRouter;

// localhost:8000/api/v1/admin/health-check
