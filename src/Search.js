import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class Search extends Component {
  state = {
    query: '',
    filteredBooks: [],
    hasError: false
  }

  updateQuery = (query) => {
    if (query === '') {
      /* when the search field is empty or erased by user */
      this.setState({ query: '', filteredBooks: [] })
    } else {
      this.setState({ query })
      BooksAPI.search(query)
      .then(results => {
        if (results.error) {
          /* catching possibly search error, sources https://reactjs.org/docs/error-boundaries.html, https://dev.to/sarah_chima/error-boundaries-in-react-3eib */
          this.setState({ filteredBooks: [], hasError: true})
        } else {
          this.rightShelf(results)
        }
      })
    }}

  rightShelf(results) {
    /* filling the filteringBooks array with search result and assigning the right shelf to searched books (big thanks to Maeva FEND Study Jam) */
    this.setState({ filteredBooks: results })
    this.state.filteredBooks.map((filteredBook) => {
              filteredBook.shelf = 'none'
              this.props.books.map((book) => {
                  filteredBook.id === book.id ? (filteredBook.shelf=book.shelf) : ('none')}
              )})
  }

  newSearch = () => {
    this.setState({ hasError: false, query: '', filteredBooks: [] })
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(event) => this.updateQuery(event.target.value)} />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {/* Showing the grid or error message of limited searched words */}
            {this.state.hasError ? (
              <div>
                <span>Demo version. For possible search words see ReadMe file.</span>
                <button onClick={this.newSearch}>New Search</button>
              </div>
            ) : (
            <Book
              books={this.state.filteredBooks}
              changeShelf={this.props.changeShelf}
              />
            )}
          </ol>
        </div>
      </div>
    )
  }
}

export default Search
