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
  "350",
  true,
);

addBookToLibrary("Clean Code", "Robert Martin", 431, "read");

console.log(myLibrary);
