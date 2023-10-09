const express = require("express");
const router = express.Router();
const ctrl = require('../../controllers/index');
const { validateBody, isValidId } = require("../../middlewares");
const { schemas } = require("../../models/contact");

router.get("/", ctrl.getAll);

router.get("/:contactId",isValidId, ctrl.getById);

router.post("/", validateBody(schemas.addSchema), ctrl.addContact);

router.put("/:contactId", isValidId, validateBody(schemas.addSchema), ctrl.updateById);

router.patch(
    "/:contactId/favorite",
    isValidId,
    validateBody(schemas.updateFavoriteSchema),
    ctrl.updateFavorite
  );

router.delete("/:contactId", isValidId, ctrl.removeById);

module.exports = router;
