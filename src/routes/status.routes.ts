import * as status from "../controllers/status.controller";

const { check } = require("express-validator");
import express = require("express");

const statusRouter: express.Router = express.Router();
import * as token from "../middlewares/validate-jwt";

statusRouter.post(
  "/createStatus",
  [
    check("name", "the name is required").not().isEmpty(),
    check("code", "the code is required").not().isEmpty(),
  ],
  // [token.validarJWT],
  status.createStatus
);

statusRouter.get("/getStatus", [token.validarJWT], status.getStatus);

export default statusRouter;
