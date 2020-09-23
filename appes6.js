class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}




class UI {
  addBookToList(book) {
    const list = document.getElementById('book-list');
    // Create tr Element
    const row = document.createElement('tr');
    // Insert row
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
    `
    list.appendChild(row);
  }

  showAlert(message, className) {
    // Create div
    const div = document.createElement('div');
    // Add classes
    div.className = `alert ${className}`
    // Add Text 
    div.appendChild(document.createTextNode(message));
    // Get Parent
    const container = document.querySelector('.container');
    // Get form
    const form = document.querySelector('#book-form');

    //Insert Alert
    container.insertBefore(div, form);

    // Timeout after three seconds
    setTimeout(function () {
      document.querySelector('.alert').remove()
    }, 3000);
  }

  deleteBook(target) {
    if (target.className === 'delete') {
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }
}

// Local Storage class
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
      /* The JSON.parse is because we need it to be a JavaScript Object */
    }

    return books;

  }

  static displayBooks() {
    const books = Store.getBooks();

    books.forEach(function (book) {
      const ui = new UI(); /* we have a class called UI that has a method called addBookToList, in order to use that method, we have to instantiate the UI */

      // Add Book to UI
      ui.addBookToList(book)
    })
  }

  static addBook(book) {
    const books = Store.getBooks();

    books.push(book);

    localStorage.setItem('books', JSON.stringify(books)); /* we want to set the local storage as books and we want to set the books array but we need to run it through JSON.strigify in order to store it in local storage */
  }

  static removeBook(isbn) {
    const books = Store.getBooks();
    books.forEach(function (book, index) {
      if (book.isbn === isbn) {
        books.splice(index, 1)
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }

}

// DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayBooks)

// Event Listener for Add Book
document.querySelector('#book-form').addEventListener('submit', function (e) {

  // Get form Values
  const title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value;


  // Instantiate Book
  const book = new Book(title, author, isbn);

  // Instantiate UI
  const ui = new UI();



  // Validate the form
  if (title === '' || author === '' || isbn === '') {

    // Error Alert
    ui.showAlert('All fields must be filled!',
      'error');

  } else {
    // Add Book to UI
    ui.addBookToList(book);

    // Add to Local Storage
    Store.addBook(book); /*we are using the main class name because it is a static menthod, we do not need to instantiate it */

    // Show success
    ui.showAlert('Book has been added!', 'success');

    // Clear field
    ui.clearFields();
  }

  e.preventDefault();
});


//Event Listener for Delete
document.querySelector('#book-list').addEventListener('click', function (e) {

  //Instantiate UI
  const ui = new UI();

  // Delete Book
  ui.deleteBook(e.target);

  //Remove from Local Storage
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent) /* we want to get the isbn number, with vanilla JavaScript, we can use the previousElementSibling method to get that. the e.target.parentElement gets a td which is on top of the td of the isbn number */

  // Show Alert
  ui.showAlert('Book Removed', 'success');



  e.preventDefault();
})