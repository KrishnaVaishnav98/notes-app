const mongoose = require("mongoose");

const notesSchema = mongoose.Schema({
    title: String,
    body: String,
    userID: String,
    user: String
}, {
    versionKey: false
});

const NotesModel = mongoose.model("note", notesSchema);

module.exports = {
    NotesModel
}