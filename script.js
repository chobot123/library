let myLibrary = [];
const getForm = document.forms[0]
const formContainer = document.getElementById(`pop-up`)
const newBookContainer = document.getElementById(`new-book`)
const bookContainer = document.querySelector(`.book-container`)
const btnContainer = document.querySelector(`.btnContainer`)
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
    const {title, author, pages, read} = e.target.elements;
    let tempBook = new Book(title.value, author.value, pages.value, read.value)
    myLibrary.push(tempBook);
    toggleForm();
    displayBook();
    getForm.reset();
}

//displays most recent book
let displayBook = () => {
    //display the last (ie most recent) book
    let newBook = document.createElement("div");
    let index = myLibrary.length - 1;
    newBook.className = `card ${index}`; //set className === myLibrary index
    let textContainer = document.createElement("div");
    textContainer.className = "textAndRead";
    displayText(textContainer, index);
    newBook.append(textContainer);
    bookContainer.appendChild(newBook);

    //switch if read
    let switchContainer = document.createElement("div");
    switchContainer.className = "switchContainer";
    newBook.appendChild(switchContainer);
    let readSwitch = document.createElement("label"); 
    readSwitch.className = "switch";
    let markRead = document.createElement("div");
    markRead.innerHTML = "Mark as Read:";
    switchContainer.appendChild(markRead);
    let checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    let slider = document.createElement("span");
    slider.className = "slider round";
    if(myLibrary[index].read === "yes"){
        checkbox.checked = true;
        newBook.style.background = "linear-gradient(135deg, rgba(24, 77, 104, 0.8) 0%, rgba(87, 202, 133, 0.8) 100%)";
        newBook.style.color = "white";
    }
    else {
        checkbox.checked = false;
        newBook.style.background = "linear-gradient(135deg, #e3e3e3 0%, #5d6874 100%)";
        newBook.style.color = "black";
    }
    readSwitch.appendChild(checkbox);
    readSwitch.appendChild(slider);
    switchContainer.appendChild(readSwitch); //add read switch to card
    changeRead(readSwitch, checkbox);

    //btn
    let exitButton = document.createElement("button");
    exitButton.id = "exit";
    exitButton.innerHTML = "X";
    textContainer.appendChild(exitButton);
    exitButton.addEventListener("click", exitFunction);
}

//change read status in myLibrary when switch is triggered
let changeRead = (readSwitch, checkbox) =>{
    readSwitch.addEventListener("click", function(event){
        let card = event.target.parentElement.parentElement.parentElement;
        let cardIndex = event.target.parentElement.parentElement.parentElement.className.substring(5); //get card index for mylibrary
        let checker = checkbox.checked;
        if(checker){
            myLibrary[cardIndex].read = "yes";
            card.style.background = "linear-gradient(135deg, rgba(24, 77, 104, 0.8) 0%, rgba(87, 202, 133, 0.8) 100%)";
            card.style.color = "white";
        }
        else if(!checker){
            card.style.background = "linear-gradient(135deg, #e3e3e3 0%, #5d6874 100%)";
            card.style.color = "black";
        }
    });
}

let exitFunction = (e) => {
    //when book is deleted
    //  1) myLibrary updates
    //  2) display updates
    let cardIndex = e.target.parentElement.parentElement.className.substring(5); //after 'card ' 
    let card = document.getElementsByClassName(`card`)[cardIndex];
    myLibrary.splice(cardIndex, 1); //remove the book from library
    if(card.parentNode){
        card.parentNode.removeChild(card);
    }
    for(let i = cardIndex; i < myLibrary.length;i++){
        cardIndex++; //get pos of card (if there is one) one after deleted card
        card = document.querySelector(`.card-${cardIndex}`); //nextCard
        card.className = `card-${i}`; //make nextCard take pos of deleted card
    }
}

//get newBook element and place text
let displayText = (newBook, index) => {
    let values = Object.values(myLibrary[index]); //gets value of title, author, etc
    for(let i=0;i<values.length - 1;i++){ //adds these values to innerHTML with break
        newBook.innerHTML += `${values[i]} <br>`;
    }
    newBook.style.textAlign = "center";
}


let toggleForm = () => {
    if(formContainer.style.display === "none"){
        formContainer.style.display = "inline-block";
        newBookContainer.style.display = "none";
    }
    else {
        formContainer.style.display = "none";
        newBookContainer.style.display = "inline-block";
    }
}

formContainer.addEventListener("submit", getBook)
newBookContainer.addEventListener("click", toggleForm)

