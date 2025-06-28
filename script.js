const myLibrary = [];

class Book {
  constructor(title, author, pages, read, id) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.id = id
  }
  
  info() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'read' : 'not yet read'}` 
  }
}

function addBookToLibrary(title, author, pages, read) {
  const id = crypto.randomUUID();
  const book = new Book(title, author, pages, read, id);
  console.log(book.info());
  myLibrary.push(book);
}

const fieldsToShow = ["title", "author", "pages", "read"];
const table = document.getElementById("library");
const tbody = document.querySelector("#library > tbody");

function displayLibrary() {
  tbody.innerHTML = "";
  
  for (const book of myLibrary) {
    const row = document.createElement("tr");
    
    for (const field of fieldsToShow) {  
      const cell = document.createElement("td");
      const value = book[field];
      
      cell.textContent = field === "read" ? (value ? "Yes" : "No") : value
 
      row.appendChild(cell);
    }

    const removeCell = document.createElement("td");
    const removeBtn = document.createElement("button");
    removeBtn.innerText = "Remove"

    removeBtn.addEventListener("click", () => {
        const index = myLibrary.findIndex(b => b.id === book.id);
        if (index !== -1) {
            myLibrary.splice(index, 1);
            displayLibrary();
        }

    })

    removeCell.appendChild(removeBtn)
    row.appendChild(removeCell);

    const toggleCell = document.createElement("td");
    const toggleBtn = document.createElement("button");
    toggleBtn.innerText = "Toggle"

    toggleBtn.addEventListener("click", () => {
        const index = myLibrary.findIndex(b => b.id === book.id);
        if (index !== -1) {
            book.read = !book.read;
            displayLibrary();
        }
    })

    toggleCell.appendChild(toggleBtn);
    row.appendChild(toggleCell);

    tbody.appendChild(row);
  }
}

const bookDialog = document.getElementById("book-dialog");
const bookForm = document.getElementById("book-form")
const openBtn = document.getElementById("new-book-btn");
const cancelBtn = document.getElementById("cancel-btn");

openBtn.addEventListener("click", () => {
    bookDialog.showModal();
})

cancelBtn.addEventListener("click", () => {
    bookDialog.close();
})

bookForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(bookForm);
    const title = formData.get("title");
    const author = formData.get("author");
    const pages = formData.get("pages");
    const read = formData.get("read") === "on";

    addBookToLibrary(title, author, pages, read);
    displayLibrary();
    bookDialog.close();
    bookForm.reset();
})

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", "295", false);
addBookToLibrary("1984", "George Orwell", "328", true);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", "281", true);
addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", "180", false);
addBookToLibrary("Pride and Prejudice", "Jane Austen", "432", true);

displayLibrary();