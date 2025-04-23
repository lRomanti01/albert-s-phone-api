import { Router } from "express";

import rolRouter from "./routes/role.routes";
import userRouter from "./routes/user.routes";
import authRouter from "./routes/auth.routes";
import statusRouter from "./routes/status.routes";
import phoneRouter from "./routes/phone.routes";

const router: Router = Router();
router.use("/user", userRouter);
router.use("/role", rolRouter);
router.use("/auth", authRouter);
router.use("/status", statusRouter);
router.use("/phone", phoneRouter);

export default router;
