let myLibrary = [];
const getForm = document.forms[0]
const formContainer = document.getElementById(`pop-up`)
const newBookContainer = document.getElementById(`new-book`)
const bookContainer = document.querySelector(`.book-container`)
/*
const bookOne = new Book(`The Hobbit`,`J R R Martin`, `295 Pages`, `not read yet`)
const bookTwo = new Book(`Whack`, `Josh Cho`, `65 pages`, `read`)
myLibrary.push(bookOne);
myLibrary.push(bookTwo);
*/

//constructor
function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

//gets user inputs, makes a new Book object, and inserts into myLibrary Array
let getBook = (e) => {
    e.preventDefault();
    const {author, title, pages, read} = e.target.elements;
    let tempBook = new Book(author.value, title.value, pages.value, read.value)
    myLibrary.push(tempBook);
    displayBook();
    toggleForm();
    getForm.reset();
}


let toggleForm = () => {
    if(formContainer.style.display === "none"){
        formContainer.style.display = "block";
    }
    else {
        formContainer.style.display = "none";
    }
}
/*

*/
let displayBook = () => {

    let index = myLibrary.length-1;
    let card = document.createElement("div")
    card.className = `card`;
    cardStyle(card);

    //text container for below
    let textBox = document.createElement("div");
    textBox.className = "text-container";
    //style
    textBox.style.display = "flex";
    textBox.style.flexDirection = "column";
    textBox.style.justifyContent = "center";
    textBox.style.alignItems = "center";
    card.appendChild(textBox);

    let values = Object.values(myLibrary[index]); // the hobbit, jrr martin, 295 pages, not read
    let keys = Object.keys(myLibrary[index]); //title, author, etc.
    //text for textbox
    for(let i=0; i<keys.length;i++){ 
        let val = values[i];
        let text = document.createElement("div");
        text.className = "info";
        text.innerHTML = `${keys[i].toUpperCase()}: ${val}`;
        if(i === 0){
            text.style.fontSize = "36px";
        }
        else if(i === 1){
            text.style.fontSize = "24px";
        }
        else {
            text.style.fontSize = "20px";
        }
        textBox.appendChild(text);
    }
        
    //exit button
    let btn = document.createElement("button");
    btn.id = "exit";
    btn.innerHTML = "X";
    btn.style.alignSelf = "flex-start";
    card.appendChild(btn);

    //read switch

    //append card to container
    bookContainer.appendChild(card);
}

let cardStyle = (card) => {
    card.style.display = "flex";
    //card.style.flexDirection = "column";
    card.style.justifyContent = "space-between";
    card.style.alignItems = "center";
    card.style.border = "8px solid black";
    card.style.padding = "20px";
    card.style.borderRadius = "20px";
    card.style.gap = "15px";
}

let readSwitch = (card) => {
}

let erase = (e) => {
    console.log(e.target.id)
    console.log(e.target.parentElement)
    if(e.target.id === "exit"){
        for(let i=0;i<bookContainer.children.length;i++){
            if(bookContainer.children[i] === e.target.parentElement){
                let child = bookContainer.children[i]; //select the selected card
                bookContainer.removeChild(child); //remove the card from display
                myLibrary.splice(i, 1); //remove the card from array
                break;
            }
        }
    }
}

bookContainer.addEventListener("click", erase)
getForm.addEventListener("submit", getBook)
newBookContainer.addEventListener("click", toggleForm)

