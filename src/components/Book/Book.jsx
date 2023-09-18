import React, { useState } from "react";
import { update } from "../../BooksAPI";

function Book({ book, setFlag }) {
  const [shelf, setShelf] = useState(book.shelf);

  const handleChangeShelf = async (event) => {
    try {
      await update(book, event.target.value);
      setShelf(event.target.value);
      setFlag(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${book.imageLinks.thumbnail})`,
          }}
        ></div>
        <div className="book-shelf-changer">
          <select value={shelf} onChange={handleChangeShelf}>
            <option value="none" disabled>
              {shelf !== "none" ? "Move to..." : "Add to ..."}
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            {shelf !== "none" && <option value="none">None</option>}
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      {book.authors.map((author, index) => (
        <div key={index} className="book-authors">
          {author}
        </div>
      ))}
    </div>
  );
}

export default Book;
