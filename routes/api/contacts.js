const express = require('express');

const ctrl = require("../../controllers/contacts");

const { ctrlWrapper } = require("../../helpers");
const { authenticate, validationBody, isValidId } = require("../../middlewares");
const { schemas } = require("../../models/contact");

const router = express.Router();

router.get('/', authenticate, ctrlWrapper(ctrl.getAll)); 

router.get('/:contactId', isValidId, ctrlWrapper(ctrl.getById));

router.post('/', authenticate, validationBody(schemas.contactAddSchema), ctrlWrapper(ctrl.add));

router.patch("/:contactId/favorite", isValidId, validationBody(schemas.updateFavoriteSchema), ctrlWrapper(ctrl.updateStatusContact));

router.delete('/:contactId', isValidId, ctrlWrapper(ctrl.removeById));

router.put('/:contactId', isValidId, validationBody(schemas.contactAddSchema), ctrlWrapper(ctrl.updateById));

module.exports = router
