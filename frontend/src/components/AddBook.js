import React, { useState } from "react";
import axios from "axios";

export default function AddBook() {
  const [form, setForm] = useState({
    ISBN: "",
    Title: "",
    Author: "",
    Genre: "",
    PublicationYear: "",
    NumberOfCopies: ""
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/books", form);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error adding book");
    }
  };

  return (
    <div>
      <h2>Add Book</h2>
      <form onSubmit={handleSubmit}>
        <input name="ISBN" placeholder="ISBN" onChange={handleChange} />
        <input name="Title" placeholder="Title" onChange={handleChange} />
        <input name="Author" placeholder="Author" onChange={handleChange} />
        <input name="Genre" placeholder="Genre" onChange={handleChange} />
        <input name="PublicationYear" placeholder="Year" onChange={handleChange} />
        <input name="NumberOfCopies" placeholder="Copies" onChange={handleChange} />
        <button type="submit">Add</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
