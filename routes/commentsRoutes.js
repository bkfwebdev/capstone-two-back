"use strict";

/** Routes for authentication. */

const jsonschema = require("jsonschema");
const userVideo = require("../models/videoComment");
const express = require("express");
const router = new express.Router();
const { BadRequestError } = require("../expressError");

// need to use token to authenticate & authorize request
// need route to post new comment to current video
// need route to delete comment for current video


module.exports = router;
