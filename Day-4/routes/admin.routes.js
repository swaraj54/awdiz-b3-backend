import { Router } from "express";

const AdminRouter = Router();

AdminRouter.get("/health-check", (req, res) => {
  res.send("Admin route is working");
});

export default AdminRouter;
