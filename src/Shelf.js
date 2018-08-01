import React, { Component } from 'react'
import Book from './Book'


class Shelf extends Component {
  render() {
    return (
      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">{this.props.shelfName}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              <Book
                books={this.props.books}
                changeShelf={(book, shelf) => {this.props.changeShelf(book, shelf)}}
                currentShelf={this.props.currentShelf}/>
            </ol>
          </div>
        </div>
      </div>
    )
  }
}

export default Shelf
