import React, { useState } from "react";
import axios from "axios";

export default function SearchBook() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState("");

  const searchBooks = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/books/search?query=${query}`);
      if (res.data.message) {
        setMessage(res.data.message);
        setResults([]);
      } else {
        setResults(res.data);
        setMessage("");
      }
    } catch (err) {
      setMessage("Error searching books");
    }
  };

  return (
    <div>
      <h2>Search Books</h2>
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by title/author/ISBN" />
      <button onClick={searchBooks}>Search</button>

      {message && <p>{message}</p>}

      {results.map((book) => (
        <div key={book.ISBN}>
          <h4>{book.Title} by {book.Author}</h4>
          <p>ISBN: {book.ISBN} | Copies: {book.NumberOfCopies}</p>
        </div>
      ))}
    </div>
  );
}
