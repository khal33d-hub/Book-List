// Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor
function UI() {}

// Add book to list (Create addBookToList Prototype)
UI.prototype.addBookToList = function (book) {
  const list = document.getElementById('book-list');

  // Create tr element
  const row = document.createElement('tr');

  // Insert columns to the table data (td)
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
  `;

  list.appendChild(row);


}

//Show Alert
UI.prototype.showAlert = function (message, className) {
  // Create a div
  const div = document.createElement('div');

  // Add classes
  div.className = `alert ${className} `; /*because we want them all to have a class of alert and also the classname that is passed up */

  // Add text
  div.appendChild(document.createTextNode(message));

  // Get parent
  const container = document.querySelector('.container');

  // Get form
  const form = document.querySelector('#book-form');

  // Insert alert
  container.insertBefore(div, form); /*this is what we want to insert and what we want to insert before which is the form respectively */

  // Timeout after three seconds
  setTimeout(function () {
    document.querySelector('.alert').remove()
  }, 3000);

}

// Show Alert
UI.prototype.showAlert = function (message, className) {
  // Create div
  const div = document.createElement('div');
  // Add classes
  div.className = `alert ${className} `;
  // Add text 
  div.appendChild(document.createTextNode(message));
  // Get parent
  const container = document.querySelector('.container');
  // Get form
  const form = document.querySelector('#book-form');
  // Insert alert
  container.insertBefore(div, form);

  // Timeout after 3 sec
  setTimeout(function () {
    document.querySelector('.alert').remove();
  }, 3000);
}

// Delete Book
UI.prototype.deleteBook = function (target) {
  if (target.className === 'delete') {
    target.parentElement.parentElement.remove();
  }
}


// To clear fields after submitting (Create the clearField prototype)

UI.prototype.clearFields = function () {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}


// Event Listener for Add Book
document.getElementById('book-form').addEventListener('submit', function (e) {
  // Get form values
  const title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value;

  // Instantiate book
  const book = new Book(title, author, isbn);

  // Instantiate UI
  const ui = new UI();

  // Validate the form (we won't be allowed to add empty form fields to the ui)
  if (title === '' || author === '' || isbn === '') {
    // Error alert
    ui.showAlert('Please fill in all fields', 'error'); /* the message and the class name */

  } else {
    // Add book to list
    ui.addBookToList(book);

    // Show success
    ui.showAlert('Book Added!', 'success'); /* the message and the class name respectively */

    // Clear the fields after we submit
    ui.clearFields();
  }




  e.preventDefault();
});


// Event Listener for Delete
document.getElementById('book-list').addEventListener('click', function (e) {

  // Instantiate UI
  const ui = new UI();

  // Delete Book
  ui.deleteBook(e.target);

  // Show Alert
  ui.showAlert('Book Removed', 'success');


  e.preventDefault();
});