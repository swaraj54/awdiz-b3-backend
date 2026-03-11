import { Router } from "express";
import { HealthCheck } from "../controllers/admin.controllers.js";

const AdminRouter = Router();

AdminRouter.get("/health-check", HealthCheck);

export default AdminRouter;
