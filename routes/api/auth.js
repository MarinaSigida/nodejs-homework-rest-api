const express = require('express');
const { validateBody, authenticate} = require("../../middlewares");
const { schemas } = require("../../models/user");
const auth = require('../../controllers/auth');
const router = express.Router();



router.post("/register", validateBody(schemas.registerSchema), auth.register);

router.post("/login", validateBody(schemas.loginSchema), auth.login);

router.get("/current", authenticate, auth.getCurrent);

router.post("/logout", authenticate, auth.logout);

router.patch(
    "/users",
    authenticate,
    validateBody(schemas.updateSubscriptionSchema),
    auth.updateUserSubscription
  );

module.exports = router;