import React, { Component } from 'react'

const Book = (props) => {
  return (
    props.books.map((book) =>
    <li key={book.id}>
    <div className="book">
      <div className="book-top">
        {/* dealing with no thumbnail and no authors */}
        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: (book.imageLinks === undefined) ? `url(https://upload.wikimedia.org/wikipedia/commons/f/fa/No_photo_available.svg)` : `url(${book.imageLinks.thumbnail})` }}></div>
        <div className="book-shelf-changer">
          <select value={book.shelf} onChange={(event) => props.changeShelf(book, event.target.value)}>
            <option value="" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{book.authors === undefined ? 'No authors' : book.authors}</div>
    </div>
  </li>
))
}

export default Book
