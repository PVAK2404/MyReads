import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getAll } from "../../BooksAPI";
import Bookshelf from "./components";

const bookshelfs = [
  {
    value: "currentlyReading",
    title: "Currently Reading",
  },
  {
    value: "wantToRead",
    title: "Want to Read",
  },
  {
    value: "read",
    title: "Read",
  },
];

function Main() {
  const [allBook, setAllBook] = useState([]);
  const [flag, setFlag] = useState(true);

  useEffect(() => {
    (async () => {
      if (flag) {
        try {
          const result = await getAll();

          setAllBook(result);
        } catch (error) {
          console.error(error);
        } finally {
          setFlag(false);
        }
      }
    })();
  }, [flag]);

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        {allBook.length !== 0 && (
          <div>
            {bookshelfs.map((bookshelf, index) => {
              const books = allBook.filter(
                (books) => books.shelf === bookshelf.value
              );

              return (
                <Bookshelf
                  key={index}
                  books={books}
                  title={bookshelf.title}
                  setFlag={setFlag}
                />
              );
            })}
          </div>
        )}
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
}

export default Main;
