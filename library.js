const myLibrary = [];

function Book(title, author, pages, read) {
  if (!new.target) {
    throw new Error("Book must be instantiated with 'new'");
  }
  //
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}
// toggle read method
Book.prototype.toggleRead = function () {
  this.read = !this.read;
};
Book.prototype.info = function () {
  return `book id: ${this.id} ${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? "read" : "not read"}`;
};
function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
}

addBookToLibrary(
  "The pragmatic Programmer",
  "Dave Thomas, Andy hunt",
  350,
  false,
);

addBookToLibrary("Clean Code", "Robert Martin", 431, false);

// myLibrary[0].toggleRead();
// myLibrary[1].toggleRead();
// myLibrary[0].toggleRead();
console.log(myLibrary);

function createBookCard(book) {
  // book
  const bookDiv = document.createElement("div");
  bookDiv.className = "book";

  //book cover img
  const image = document.createElement("img");
  image.src = book.image || "book_cover.png";
  image.alt = "book img";
  // book meta div

  const bookMeta = document.createElement("div");
  bookMeta.className = "book-meta";

  // Title h3 tag
  const bookTitle = document.createElement("h3");
  bookTitle.className = "book-title";
  bookTitle.textContent = book.title;

  // book author
  const bookAuthor = document.createElement("div");
  bookAuthor.className = "book-author";
  bookAuthor.textContent = book.author;

  //book-pages
  const bookPages = document.createElement("div");
  bookPages.className = "book-pages";
  bookPages.textContent = `${book.pages} pages`;

  // book buttons

  const bookButtons = document.createElement("div");
  bookButtons.className = "book-buttons";

  // delete button
  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-button";
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => removeBookFromLibrary(book.id));

  // mark as read button

  const markAsReadButton = document.createElement("button");
  markAsReadButton.className = "mark-as-read";
  markAsReadButton.textContent = `${book.read ? "Mark as unread" : "Mark as read"}`;
  markAsReadButton.addEventListener("click", () => {
    book.toggleRead();
    renderBookCards();
  });
  // share button

  const shareButton = document.createElement("button");
  shareButton.textContent = "Share";

  //arrange elements
  //arrange buttons
  bookButtons.appendChild(deleteButton);
  bookButtons.appendChild(markAsReadButton);
  bookButtons.appendChild(shareButton);

  //arrange meta
  bookMeta.appendChild(bookTitle);
  bookMeta.appendChild(bookAuthor);
  bookMeta.appendChild(bookPages);
  bookMeta.appendChild(bookButtons);

  //arrange book card

  bookDiv.appendChild(image);
  bookDiv.appendChild(bookMeta);

  return bookDiv;
}
// render cards

function renderBookCards() {
  const libraryShelf = document.getElementById("books-section");

  libraryShelf.innerHTML = "";

  myLibrary.forEach((book) => {
    const bookSection = document.createElement("div");
    bookSection.className = "book-section";
    bookSection.dataset.bookId = book.id;

    bookSection.appendChild(createBookCard(book));

    libraryShelf.appendChild(bookSection);
  });
}

// delete book function

function removeBookFromLibrary(bookId) {
  const bookIndex = myLibrary.findIndex((book) => book.id === bookId);
  if (bookIndex !== -1) {
    myLibrary.splice(bookIndex, 1);
    const removeBookGUI = document.querySelector(`[data-book-id="${bookId}"]`);
    if (removeBookGUI) {
      removeBookGUI.remove();
    }
    console.log("state");
  }
}

function toggleBookModalState() {
  const openBookModal = document.querySelector("#add_book_btn");
  const closeModal = document.querySelector("#close_book_dialog");
  const bookModal = document.querySelector("#add_book_dialog");
  const bookForm = document.querySelector("#book-form");
  bookModal.showModal();
  openBookModal.addEventListener("click", () => {
    console.log("clicked me");
    bookModal.showModal();
  });
  closeModal.addEventListener("click", () => {
    bookModal.close();
  });

  const submitButton = document.querySelector("#submit");
  submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    getModalInputValues();
  });

  function getModalInputValues() {
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const read = document.querySelector("#read").checked;
    if ((title || author !== "") && pages > 0) {
      addBookToLibrary(title, author, pages - 0, read);
      bookModal.close();
      bookForm.reset();
      renderBookCards();
    }
  }
}
//display
function displayLibrary(index) {
  renderBookCards();
  toggleBookModalState();
}

displayLibrary();
