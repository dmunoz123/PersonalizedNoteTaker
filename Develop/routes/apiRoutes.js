const store = require("../db/store");

const router = require("express").Router();

// will get and deliver to us all notes that have been posted
router.get("/notes", (req, res) => {
  store
    .getNotes()
    .then((allNotes) => {
      return res.json(allNotes);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// choses where to post data of posted notes
router.post("/notes", (req, res) => {
  store
    .addNote(req.body)
    .then((note) => {
      res.json(note);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
