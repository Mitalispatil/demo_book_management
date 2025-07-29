import React, { useState } from "react";
import axios from "axios";

export default function ReturnBook() {
  const [ISBN, setISBN] = useState("");
  const [message, setMessage] = useState("");

  const returnBook = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/checkout/return", { ISBN });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error returning");
    }
  };

  return (
    <div>
      <h2>Return Book</h2>
      <input value={ISBN} onChange={(e) => setISBN(e.target.value)} placeholder="ISBN" />
      <button onClick={returnBook}>Return</button>
      {message && <p>{message}</p>}
    </div>
  );
}
