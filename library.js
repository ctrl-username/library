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
function addBookToLibrary() {}

book1 = new Book("The pragmatic Programmer", "Andy hunt", "55", true);

console.log(book1.info());
