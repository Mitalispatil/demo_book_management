const express = require("express");
const router = express.Router();
const Book = require("../models/Book");
const Checkout = require("../models/Checkout");

// FR-CO-01: Checkout book
router.post("/checkout", async (req, res) => {
    const { MemberID, ISBN } = req.body;

    const book = await Book.findOne({ ISBN });
    if (!book) return res.status(404).json({ message: "Book not found" });
    if (book.NumberOfCopies <= 0) return res.status(400).json({ message: `No available copies for ISBN ${ISBN}` });

    book.NumberOfCopies -= 1;
    await book.save();

    const checkout = new Checkout({ MemberID, ISBN });
    await checkout.save();

    res.json({ message: `Book ${ISBN} checked out successfully to Member ${MemberID}` });
});

// FR-CO-02: Return book
router.post("/return", async (req, res) => {
    const { ISBN } = req.body;

    const book = await Book.findOne({ ISBN });
    if (!book) return res.status(404).json({ message: "Book not found" });

    book.NumberOfCopies += 1;
    await book.save();

    await Checkout.findOneAndUpdate({ ISBN, Returned: false }, { Returned: true });

    res.json({ message: `Book ${ISBN} returned successfully` });
});

module.exports = router;

// will just check the workflow so this comment is added.
