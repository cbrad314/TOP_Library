//Data Structures

let library = [];

class Book {
  constructor(title, author, isRead = false) {
    (this.title = title), (this.author = author), (this.isRead = isRead);
  }
}
true;

//Global Variables

const addBookButton = document.getElementById("add-book");
const form = document.querySelector("form");
const grid = document.querySelector(".grid");
const modal = document.querySelector(".modal");
const overlay = document.getElementById("overlay");
const closeModalButton = document.getElementById("close-modal");
//Event Listeners

form.addEventListener("submit", createNewBook);
form.addEventListener("submit", closeModal);
addBookButton.addEventListener("click", openModal);
closeModalButton.addEventListener("click", closeModal);

//Functions

function closeModal() {
  modal.classList.remove("active");
  overlay.classList.remove("active");
}

function openModal() {
  modal.classList.add("active");
  overlay.classList.add("active");
}

function existsInLibrary(newBook) {
  if (
    library.some((book) => book.title === newBook.title) &&
    library.some((book) => book.author === newBook.author)
  )
    return true;
}

function addBookToLibrary(newBook) {
  if (!existsInLibrary(newBook)) library.push(newBook);
}

function getBookInputs() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const isRead = document.getElementById("is-read").checked;
  return new Book(title, author, isRead);
}

function createNewBook(event) {
  event.preventDefault();
  const newBook = getBookInputs();
  addBookToLibrary(newBook);
  updateGrid();
  form.reset();
}

function updateGrid() {
  clearGrid();
  library.forEach((book, index) => {
    const card = document.createElement("div");
    const titleLabel = document.createElement("p");
    const authorLabel = document.createElement("p");
    const title = document.createElement("i");
    const author = document.createElement("i");
    const trashButton = document.createElement("button");
    const readLabel = document.createElement("p");
    const readButton = document.createElement("button");

    readButton.textContent = "read";
    const checked = library[index].isRead;
    readButton.setAttribute("data-attribute", index);
    checked
      ? readButton.classList.add("green")
      : readButton.classList.add("red");
    checked
      ? (readButton.textContent = "read")
      : (readButton.textContent = "not read");
    card.classList.add("card");
    card.setAttribute("data-attribute", index);

    trashButton.classList.add("trash");
    trashButton.textContent = "delete";
    trashButton.setAttribute("data-attribute", index);

    titleLabel.textContent = `title:`;
    authorLabel.textContent = `author:`;
    title.textContent = library[index].title;
    author.textContent = library[index].author;

    grid.appendChild(card);
    card.appendChild(titleLabel);
    card.appendChild(title);
    card.appendChild(authorLabel);
    card.appendChild(author);
    // card.appendChild(readDiv);
    card.appendChild(readLabel);
    card.appendChild(readButton);
    card.appendChild(trashButton);

    trashButton.addEventListener("click", deleteBookCard);
    readButton.addEventListener("click", toggleIsRead);
  });
}

function clearGrid() {
  grid.innerHTML = "";
}

function removeBookFromLibrary(index) {
  library.splice(index, 1);
}

function deleteBookCard(event) {
  const index = event.target.getAttribute("data-attribute");
  removeBookFromLibrary(index);
  updateGrid();
}

function toggleIsRead(event) {
  const index = event.target.getAttribute("data-attribute");
  const book = library[index];
  book.isRead = !book.isRead;
  if (book.isRead) {
    event.target.classList.add("green");
    event.target.classList.remove("red");
    event.target.textContent = "read";

    return;
  }
  event.target.classList.remove("green");
  event.target.classList.add("red");
  event.target.textContent = "not read";
}
