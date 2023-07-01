const fs = require("fs");
const { promisify } = require("util");

//generating unique id package
const { v4: uuidv4 } = require("uuid");

//going to use to read and write database for notes taken/new notes
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

class StoredItems {
  //reads all notes  in db.json asynchronously
  readNote() {
    return readFileAsync("db/db.json", "utf8");
  }

  writeNote(fullNotes) {
    return writeFileAsync("db/db.json", JSON.stringify(fullNotes));
  }

  getNotes() {
    return this.readNote().then((notes) => {
      let parsedNotes;

      try {
        parsedNotes = [].concat(JSON.parse(notes));
      } catch (err) {
        parsedNotes = [];
      }

      // if (parsedNotes.isArray(false)) {
      //   parsedNotes = [];
      // } else {
      //   parsedNotes = [].concat(JSON.parse(notes));
      // }

      return parsedNotes;
    });
  }

  addNote(note) {
    const { title, text } = note;

    const newNote = { title, text, id: uuidv4() };

    //making sure both title and text are not null
    if (title === null) {
      throw new Error("There must be an input for 'title'.");
    }
    if (text === null) {
      throw new Error("There must be an input for 'text'.");
    }

    return (
      this.getNotes()
        .then((notes) => [...notes, newNote])

        //writes updated list of notes to db json
        .then((updatedNotes) => this.writeNote(updatedNotes))
        //returns new note
        .then(() => newNote)
    );
  }
}

module.exports = new StoredItems();
