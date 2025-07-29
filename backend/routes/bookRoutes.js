const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

// FR-BM-01: Add new book
router.post("/", async (req, res) => {
    const { ISBN, Title, Author, Genre, PublicationYear, NumberOfCopies } = req.body;

    if (!/^\d{13}$/.test(ISBN)) {
        return res.status(400).json({ message: "ISBN must be 13 digits" });
    }

    const existingBook = await Book.findOne({ ISBN });
    if (existingBook) {
        return res.status(400).json({ message: "ISBN already exists" });
    }

    const book = new Book({ ISBN, Title, Author, Genre, PublicationYear, NumberOfCopies });
    await book.save();
    res.json({ message: `Book '${Title}' added successfully` });
});

// FR-BM-02: Search books
router.get("/search", async (req, res) => {
    const { query } = req.query;
    const books = await Book.find({
        $or: [
            { Title: new RegExp(query, "i") },
            { Author: new RegExp(query, "i") },
            { ISBN: query }
        ]
    });

    if (!books.length) {
        return res.json({ message: "No books found" });
    }

    res.json(books);
});

// FR-BM-03: View book details
router.get("/:isbn", async (req, res) => {
    const book = await Book.findOne({ ISBN: req.params.isbn });
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
});

module.exports = router;
