// variable for the message at the top of the screen
const message = document.querySelector(".message");
// variable for the search bar
const filter = document.querySelector(".filter");
// variable for the wild card button to choose the author name
const wildAuthor = document.querySelector(".wild-1");
// variable for the wild card button to choose the title name
const wildTitle = document.querySelector(".wild-2");
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


let authorNames = "";
let titles ="";
let selectedAuthor = "";

//fetch author names info from poetry db
async function getAuthorNames() {
    const authorRequest = await fetch(`https://poetrydb.org/author`);
    const authorArray = await authorRequest.json();
    authorNames = authorArray.authors;
    
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

// pick random author if user clicks on the wild card when on the author page
wildAuthor.addEventListener("click", () => {
    const randomIndex = Math.floor(Math.random() * authorNames.length);
    console.log(authorNames);
    console.log(randomIndex);
    const randomAuthor = authorNames[randomIndex].trim();
    console.log(randomAuthor);
    getTitleNames(randomAuthor);
});



//if an h4 list item is selected, that author name is sent to the getAuthorDetails function
//if an h5 list item is selected, that poem title is sent to the displayPoem function.
list.addEventListener("click", function(e) {
    if (e.target.matches("h4")) {
      selectedAuthor = e.target.innerText;
      getTitleNames(selectedAuthor);
      
    } else if (e.target.matches("h5")) {
        const selectedTitle = e.target.innerText;
        getPoem(selectedTitle);
    }
  });

    //get the names of the poems written by the selected author
  getTitleNames = async function(selectedAuthor) {
      const titlesRequest = await fetch(`https://poetrydb.org/author/${selectedAuthor}`);
      titles = await titlesRequest.json();
      //displayTitles(titles);
      console.log(selectedAuthor);
      displayTitles(titles)
      wildAuthor.classList.add("hide");
      wildTitle.classList.remove("hide");
      
  }

  
const displayTitles = function(titles) {
    backHome.classList.remove("hide");
    list.innerHTML ="";
    for (const title of titles) {
        const titleItem = document.createElement("li");
        titleItem.classList.add("title-item");
        //if I don't include the .title here, the title variable has a tilte, and author, and the poem; so it is an 
        //array of three objects, each containing strings of letters, instead of a single string of letters.
        titleItem.innerHTML = `<h5>${title.title}</h5>`
        list.append(titleItem);
    }
    message.innerHTML=`Select a title by ${selectedAuthor}`;
}   

  // pick random title if user clicks on the wild card when on the title page
  wildTitle.addEventListener("click", () => {
    const randomIndex = Math.floor(Math.random() * titles.length);
    console.log(randomIndex);
    console.log(titles);
    //if I don't include the .title here, the titles array has titles, authors, and lines; so indexing results in undefined
    const randomTitle = titles[randomIndex].title.trim();
    getPoem(randomTitle);
});

getPoem = async function(selectedTitle) {
    
    const poemRequest = await fetch(`https://poetrydb.org/title/${selectedTitle}/author,title,lines.text`);
    const poem = await poemRequest.text();
    displayPoem(poem)
    
}


displayPoem = function(poem) {
    authorsOrtitles.classList.add("hide");
    poemAndButtons.classList.remove("hide");

    const splitPoem = poem.split("\n");
    console.log(splitPoem);

    wildTitle.classList.add("hide");

    thisTitle = splitPoem[1];
    thisAuthor = splitPoem[3];
    thisText = splitPoem.splice(3, splitPoem.length);
    thisTextFormatted = thisText.join(" <br> ")
    
    message.innerHTML = "Your Poem:"

    if (thisAuthor.includes(`${selectedAuthor}`)) {

    const poemDiv = document.createElement("div");
    //userDiv.classList.add("user-info");

    poemDiv.innerHTML =

    `
    <div>
      <h2>${thisTitle}</h2>
      <h4>by ${thisAuthor}</h4>
      <p>${thisTextFormatted}</p>
    </div> 
    `
    thePoem.append(poemDiv);

    if (thisAuthor.includes(`${selectedAuthor}`)) {
        console.log("match");
    } else {
        console.log("no match");
    }
    }
}


