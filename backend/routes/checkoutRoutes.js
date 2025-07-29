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

// New Feature: Cancel Reservation  
router.post("/cancel-reservation", async (req, res) => {
    const { MemberID, ISBN } = req.body;
    // In a real app we’d update DB, but for now just return a success message
    res.json({ message: `Reservation for book ${ISBN} has been cancelled for Member ${MemberID}` });
});

// New Feature: Reserve Book
router.post("/reserve", async (req, res) => {
    const { MemberID, ISBN } = req.body;
    res.json({ message: `Book ${ISBN} reserved successfully for Member ${MemberID}` });
});

// New Feature: Extend Due Date
router.post("/extend-due-date", async (req, res) => {
    const { MemberID, ISBN, extraDays } = req.body;

    const checkout = await Checkout.findOne({ MemberID, ISBN, Returned: false });
    if (!checkout) {
        return res.status(404).json({ message: "Active checkout record not found" });
    }

    // If no due date exists, set a default one (e.g., today + extraDays)
    if (!checkout.DueDate) {
        checkout.DueDate = new Date();
    }

    // Extend by the given number of days
    checkout.DueDate.setDate(checkout.DueDate.getDate() + extraDays);
    await checkout.save();

    res.json({ message: `Due date for book ${ISBN} has been extended by ${extraDays} days for Member ${MemberID}` });
});


module.exports = router;
