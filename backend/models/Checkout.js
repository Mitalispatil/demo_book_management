const mongoose = require("mongoose");

const checkoutSchema = new mongoose.Schema({
    MemberID: { type: String, required: true },
    ISBN: { type: String, required: true },
    CheckoutDate: { type: Date, default: Date.now },
    Returned: { type: Boolean, default: false }
});

module.exports = mongoose.model("Checkout", checkoutSchema);
