// need to use token to authenticate & authorize request
// need route to post new videos to current user
// need route to delete videos for current user
// use companies.js route from jobly as an example

"use strict";

/** Routes for videos. */

const jsonschema = require("jsonschema");
const express = require("express");

const { BadRequestError } = require("../expressError");
const { ensureAdmin } = require("../middleware/auth");
const Video = require("../models/video");

const videoSchema = require("../schemas/video.json");
const videoUpdateSchema = require("../schemas/videoUpdate.json");
const videoSearchSchema = require("../schemas/videoSearch.json");

const router = new express.Router();


/** POST / { video } =>  { video }
 *
 * video should be { userID, VideoID, title, videoLink}
 *
 * Returns { userID, VideoID, title, title, videoLink }
 *
 * Authorization required: none
 */

router.post("/",async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, videoSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const video = await Video.create(req.body);
    return res.status(201).json({ company });
  } catch (err) {
    return next(err);
  }
});

/** GET /  =>
 *   { videos: [ { userID, videoID, title, title, videoLink }, ...] }
 *
 * Can filter on provided search filters:
 * - userID
 * - videoID
 * - nameLike (will find case-insensitive, partial matches)
 *
 * Authorization required: none
 */

router.get("/", async function (req, res, next) {
  const q = req.query;
  // searchfor videos, search would be on useID, title, or both which are strings)

  try {
    const validator = jsonschema.validate(q, videoSearchSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const videos = await Company.findAll(q);
    return res.json({ videos });
  } catch (err) {
    return next(err);
  }
});

/** GET /[title]  =>  { video }
 *
 *  Video is { userID, VideoID, title, title, videoLink }
 *
 * Authorization required: none
 */

router.get("/:handle", async function (req, res, next) {
  try {
    const video = await Company.get(req.params.title);
    return res.json({ company });
  } catch (err) {
    return next(err);
  }
});

/** PATCH /[handle] { fld1, fld2, ... } => { video }
 *
 * Patches video data.
 *
 * fields can be: { userID, VideoID, title, title, videoLink }
 *
 * Returns { userID, VideoID, title, title, videoLink }
 *
 * Authorization required: none
 */

router.patch("/:title", async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, videoUpdateSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const company = await Video.update(req.params.title, req.body);
    return res.json({ video });
  } catch (err) {
    return next(err);
  }
});

/** DELETE /[handle]  =>  { deleted: handle }
 *
 * Authorization: none
 */

router.delete("/:title",async function (req, res, next) {
  try {
    await Video.remove(req.params.handle);
    return res.json({ deleted: req.params.title });
  } catch (err) {
    return next(err);
  }
});


module.exports = router;




