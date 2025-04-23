import * as phones from "../controllers/phones.controller";

import express = require("express");
const phoneRouter: express.Router = express.Router();

// Post
phoneRouter.post("/createPhone", phones.createPhone);

// Get
phoneRouter.get("/getPhones", phones.getPhones);

// Put
phoneRouter.put("/updatePhone/:id", phones.updatePhone);

// Delete
phoneRouter.delete("/deletePhone/:id", phones.deletePhone);

export default phoneRouter;
