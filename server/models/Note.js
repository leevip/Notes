const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let noteSchema = new Schema({
    note_id: String,
    topic: String,
    note_name: String,
    content: String,
    time: String
})

module.exports = mongoose.model("notes", noteSchema);