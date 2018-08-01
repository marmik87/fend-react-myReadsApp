import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './App.css'
import Shelf from './Shelf'
import Search from './Search'

class BooksApp extends Component {
  state = {
    books: []
  }

  /* for reusing the BooksApi.getAll in other functions */
  loadBooks = () =>
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
  })

  componentDidMount() {
    this.loadBooks()
  }

  /* Change shelf functionality for combos
  similar as taught at ContactApp*/
  changeShelf(book, shelf) {
    BooksAPI.update(book, shelf)
    .then( updatedBook => {
      this.setState(state => ({ books: state.books.filter((book) => book.id !== updatedBook.id).concat({ updatedBook })})),
      this.loadBooks()})

  }


  render() {
    return (
      <div className="app">
        <Route path={"/search"} render={({ history }) => (
            <Search
              changeShelf={(book, shelf) => {this.changeShelf(book, shelf)}}
              books={this.state.books}
              /> )} />
        <Route exact path={"/"} render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <Shelf
                books={this.state.books.filter(book => book.shelf === 'currentlyReading')}
                shelfName="Currently reading"
                changeShelf={(book, shelf) => {this.changeShelf(book, shelf)}}
                currentShelf="currentlyReading"/>
              <Shelf
                books={this.state.books.filter(book => book.shelf === 'wantToRead')}
                shelfName="Want To Read"
                changeShelf={(book, shelf) => {this.changeShelf(book, shelf)}}
                currentShelf="wantToRead"/>
              <Shelf
                books={this.state.books.filter(book => book.shelf === 'read')}
                shelfName="Read"
                changeShelf={(book, shelf) => {this.changeShelf(book, shelf)}}
                currentShelf="read"/>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
