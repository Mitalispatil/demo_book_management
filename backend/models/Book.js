const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    ISBN: { type: String, unique: true, required: true, length: 13 },
    Title: { type: String, required: true },
    Author: { type: String, required: true },
    Genre: String,
    PublicationYear: Number,
    NumberOfCopies: { type: Number, required: true, min: 1 }
});

module.exports = mongoose.model("Book", bookSchema);
