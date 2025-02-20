const express = require("express");
const { resumeSearch, extractData } = require("../Controllers/protectedController");
const authenticate = require("../Middleware/auth");

const router2 = express.Router();

router2.get("/resume-search", authenticate, resumeSearch);
router2.post("/extract-data", authenticate, extractData);

module.exports = router2;
