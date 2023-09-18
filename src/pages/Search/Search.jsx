import React, { useEffect, useState } from "react";

import { getAll, search as searchBook } from "../../BooksAPI";
import { Book } from "../../components";
import { Link } from "react-router-dom";

function Search() {
  const [books, setBooks] = useState(null);
  const [text, setText] = useState("");

  const handleChangeText = (event) => {
    setText(event.target.value);
  };

  useEffect(() => {
    (async () => {
      try {
        if (text) {
          const [allBook, filterBook] = await Promise.all([
            getAll(),
            searchBook(text, 20),
          ]);

          const result = filterBook.map((book) => {
            const value = allBook.find((value) => value.id === book.id);

            if (value) return { ...book, shelf: value.shelf };
            return { ...book, shelf: "none" };
          });

          setBooks(result);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [text]);

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            onChange={handleChangeText}
            value={text}
          />
        </div>
      </div>
      <div className="search-books-results">
        {books && (
          <ol className="books-grid">
            {books.map((book) => (
              <li key={book.id}>
                <Book book={book} />
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}

export default Search;
