const router = require("express").Router();
const path = require("path");

// returns info of the file and data contained in notes.html
router.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/notes.html"));
});
// returns info of the file and data contained in main index.html
router.get("*", (req, res) => {
  path.join(__dirname, "../public/index.html");
});

module.exports = router;
