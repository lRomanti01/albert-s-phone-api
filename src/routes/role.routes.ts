import * as role from "../controllers/role.controller";

const { check } = require("express-validator");
import express = require("express");

const rolRouter: express.Router = express.Router();
import * as token from "../middlewares/validate-jwt";

rolRouter.post(
  "/createRole",
  [
    check("name", "the name is required").not().isEmpty(),
    check("code", "the code is required").not().isEmpty(),
  ],
  role.createRole
);

rolRouter.get("/getRoles", [token.validarJWT], role.getRoles);

export default rolRouter;
