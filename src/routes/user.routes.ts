import * as user from "../controllers/user.controller";

const { check } = require("express-validator");
import express = require("express");

const userRouter: express.Router = express.Router();

import * as token from "../middlewares/validate-jwt";

// Post
userRouter.post(
  "/createUser",
  [
    check("name", "the name is required").not().isEmpty(),
    check("email", "the email is required").not().isEmpty(),
  ],
  user.createUser
);

userRouter.post(
  "/searchUsers/:limit/:initial",
  [token.validarJWT],
  user.searchUsers
);

// Put

userRouter.put(
  "/updateUser/:_id",
  [
    check("name", "the name is required").not().isEmpty(),
    check("email", "the email is required").not().isEmpty(),
  ],
  [token.validarJWT],
  user.updateUser
);


// Get

userRouter.get("/getUsers/:limit/:initial", [token.validarJWT], user.getUsers);

userRouter.get(
  "/getUsersByRole/:limit/:initial/:code",
  [token.validarJWT],
  user.getUsersByRole
);

// Delete

userRouter.delete("/deleteUser/:_id", [token.validarJWT], user.deleteUser);

export default userRouter;
