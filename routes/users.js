const express = require("express");

const router = express.Router();

router.get("/:id", (req, res) => {
  res.status("203").send(req.params.id);
});

module.exports = router;
