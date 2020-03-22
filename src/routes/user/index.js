const express = require("express");
const router = express.Router();

const userController = require("../../controllers/user");

/**
 * @api {POST} /user/login Login user
 * @apiName Login User
 * @apiGroup user
 *
 * @apiHeader {String} Token Unique token must be sent with each login request. user /apitoken/login api to get this.
 *
 * @apiParam (body) {String} email user's email OR user's username
 * @apiParam (body) {String} password user's password
 * @apiParam (body) {String} [token] user's push token
 *
 * @apiError message contains the error message. will be an array if the error is more than one, for example validation failed
 * @apiError status contains "failed"
 */
router.post("/login", userController.login);

module.exports = router;
