import React, { useState } from "react";
import axios from "axios";

export default function CheckoutBook() {
  const [ISBN, setISBN] = useState("");
  const [MemberID, setMemberID] = useState("");
  const [message, setMessage] = useState("");

  const checkoutBook = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/checkout/checkout", { MemberID, ISBN });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error checking out");
    }
  };

  return (
    <div>
      <h2>Checkout Book</h2>
      <input value={ISBN} onChange={(e) => setISBN(e.target.value)} placeholder="ISBN" />
      <input value={MemberID} onChange={(e) => setMemberID(e.target.value)} placeholder="Member ID" />
      <button onClick={checkoutBook}>Checkout</button>
      {message && <p>{message}</p>}
    </div>
  );
}
