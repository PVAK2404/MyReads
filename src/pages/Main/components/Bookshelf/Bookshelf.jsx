import React from "react";

import { Book } from "../../../../components";

function Bookshelf({ books, title, setFlag }) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        {books && (
          <ol className="books-grid">
            {books.map((book) => (
              <li key={book.id}>
                <Book book={book} setFlag={setFlag} />
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}

export default Bookshelf;
