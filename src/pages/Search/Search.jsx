import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getAll, search as searchBook } from "../../BooksAPI";
import { Book } from "../../components";

function Search() {
  const [books, setBooks] = useState(null);
  const [text, setText] = useState("");

  const handleChangeText = (event) => {
    setText(event.target.value);
  };

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        if (!text) {
          setBooks(null);
          return;
        }

        const query = text;

        const [allBook, filterBook] = await Promise.all([
          getAll(),
          searchBook(text, 20),
        ]);

        if (!Array.isArray(filterBook)) {
          setBooks(null);
          return;
        }

        if (isMounted && text === query) {
          const result = filterBook.map((book) => {
            const value = allBook.find((value) => value.id === book.id);
            return { ...book, shelf: value ? value.shelf : "none" };
          });

          setBooks(result);
        }
      } catch (error) {
        console.error(error);
      }
    })();

    return () => {
      isMounted = false;
    };
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
