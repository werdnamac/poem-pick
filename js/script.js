// variable for the message at the top of the screen
const message = document.querySelector(".message");
// variable for the search bar
const filter = document.querySelector(".filter");
// variable for the wild card button
const wild = document.querySelector(".wild");
// variable for the Start Over button
const backHome = document.querySelector(".back-home");
// variable to select the section with the search bar, the buttons, and the unordered list
const authorsOrtitles = document.querySelector(".authors-or-titles");
// variable to select all the items in the unordered list
const list = document.querySelector(".list");
// variable to select the download button
const download = document.querySelector(".download");
//variable to select the div that holds both (1) the final-screen buttons and (2) the div where we display the poem
const poemAndButtons = document.querySelector(".poem-and-buttons");
//variable to select the div where we display the poem
const thePoem = document.querySelector(".poem");

let selectedAuthor = "";

//fetch author names info from poetry db
async function getAuthorNames() {
    const authorRequest = await fetch(`https://poetrydb.org/author`);
    const authorArray = await authorRequest.json();
    const authorNames = authorArray.authors;
    displayAuthorNames(authorNames);

}

//start the app
getAuthorNames();



//display search bar and wild card button, and all the author names
const displayAuthorNames = function(authorNames) {
    // first unhide search bar and wild card button
    authorsOrtitles.classList.remove("hide");
    // loop through all the author names and append each to the unordered list
    for (const author of authorNames) {
       
       const nameItem = document.createElement("li");
        nameItem.classList.add("author-item");
        nameItem.innerHTML = `<h4>${author}</h4>`;
        list.append(nameItem);
        
    }
    // Set the initial message
    message.innerHTML = "To get started, search for and Select an Author's Name. Or push the <strong>Wild Card</strong> button, and we'll randomly select the author.";
}

//if an h4 list item is selected, that author name is sent to the getAuthorDetails function
//if an h5 list item is selected, that poem title is sent to the displayPoem function.
list.addEventListener("click", function(e) {
    if (e.target.matches("h4")) {
      let selectedAuthor = e.target.innerText;
      getTitleNames(selectedAuthor);
      
    } else if (e.target.matches("h5")) {
        const selectedTitle = e.target.innerText;
        getPoem(selectedTitle);
    }
  });

    //get the names of the poems written by the selected author
  getTitleNames = async function(selectedAuthor) {
      const titlesRequest = await fetch(`https://poetrydb.org/author/${selectedAuthor}/title`);
      const titles = await titlesRequest.json();
      //displayTitles(titles);
      
      displayTitles(titles)
      
  }

  
const displayTitles = function(titles) {
    backHome.classList.remove("hide");
    list.innerHTML ="";
    for (const title of titles) {
        const titleItem = document.createElement("li");
        titleItem.classList.add("title-item");
        titleItem.innerHTML = `<h5>${title.title}</h5>`
        list.append(titleItem);
    }

}   

getPoem = async function(selectedTitle) {

    const poemRequest = await fetch(`https://poetrydb.org/author/${selectedAuthor}/title/${selectedTitle}`);
    const poem = await poemRequest.json();
    console.log(poem.title);
    console.log(selectedAuthor, selectedTitle);
}

/*
displayPoem = function(selectedTitle) {
    authorsOrtitles.classList.add("hide");
    poemAndButtons.classList.remove("hide");


}
*/
