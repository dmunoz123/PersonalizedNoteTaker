const fs = require("fs");
const { promisify } = require("util");

//going to use to read and write database for notes taken/new notes
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

//new id generator package
const uid = new ShortUniqueId({ length: 5 });


class StoredItems {
  //reads all notes  in db.json asynchronously 
  readNote() {
    return readFileAsync('db/db.json', 'utf8');
  };

  getNotes() {
    return this.readNote()
      .then((notes => {
        let parsedNotes;

        if (parsedNotes.isArray(false)) {
          
        }


      }))
  }

  addNote(note) {
    const{ title, text } = note;

    const newNote = { title, text, id: uid() };

    //making sure both title and text are not null
    if(title === null) {
      throw new Error("There must be an input for 'title'.");
    }
    if(text === null) {
      throw new Error("There must be an input for 'text'.")
    }

    return this.getNotes()
      .then((notes) => [...notes, newNote])
      
      //writes updated list of notes to db json
      .then((fullNotes)) => writeFileAsync('db/db.json', JSON.stringify(fullNotes))
      //returns new note
      .then(() => newNote);
  }
}

module.exports = new StoredItems();