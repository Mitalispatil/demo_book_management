import React from 'react';
import AddBook from './components/AddBook';
import SearchBook from './components/SearchBook';
import CheckoutBook from './components/CheckoutBook';
import ReturnBook from './components/ReturnBook';

function App() {
  return (
    <div>
      <h1>📚 Simple Library Management System</h1>
      <AddBook />
      <SearchBook />
      <CheckoutBook />
      <ReturnBook />
    </div>
  );
}

export default App;
