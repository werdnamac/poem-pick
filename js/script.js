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
const downloadPoem = document.querySelector(".download");
//variable to select the start over button
const startOver = document.querySelector(".start-over");
//variable to select the div that holds both (1) the final-screen buttons and (2) the div where we display the poem
const poemAndButtons = document.querySelector(".poem-and-buttons");
//variable to select the div where we display the poem
const thePoem = document.querySelector(".poem");


let authorNames = "";
let titles ="";
let selectedAuthor = "";
let thisTextFormatted = "";

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
    message.innerHTML = "Search for and Select an Author's Name. Or push the <strong>Wild Card</strong> button, and we'll select.";
    
}

// pick random author if user clicks on the wild card when on the author page
wildAuthor.addEventListener("click", () => {
    const randomIndex = Math.floor(Math.random() * authorNames.length);
    console.log(authorNames);
    console.log(randomIndex);
    const randomAuthor = authorNames[randomIndex].trim();
    selectedAuthor = randomAuthor;
    getTitleNames(selectedAuthor);
});

filter.addEventListener("input", function (e) {
    const searchText = e.target.value;
    // turn the captured text to lower case
    const lowerSearchText = searchText.toLowerCase();
    //select all repos in document
    const searchables = document.querySelectorAll(".author-item, .title-item");
  
    for (const searchable of searchables) {
      // looping through all the author or title items, capturing lower case versions of all inner text
      const lowerSearchable = searchable.innerText.toLowerCase();
      // only show repos that include some of the searched text
      if (lowerSearchable.includes(lowerSearchText)) {
       searchable.classList.remove("hide");
      }
        else {
          searchable.classList.add("hide");
        } // if else clause ends here
      } //for look ends here
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
      const titlesRequest = await fetch(`https://poetrydb.org/author/${selectedAuthor}:abs`);
      titles = await titlesRequest.json();
      //displayTitles(titles);
      console.log(selectedAuthor);
      console.log(titles)
;      displayTitles(titles)
      wildAuthor.classList.add("hide");
      wildTitle.classList.remove("hide");
      
  }

  
const displayTitles = function(titles) {
    backHome.classList.remove("hide");
    list.innerHTML ="";
    filter.value="";
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

backHome.addEventListener("click", () => {

    console.log("hi");

    //hide the button configuration for the page displaying the titles 
    wildTitle.classList.add("hide");

    //unhide the wild card button
    wildAuthor.classList.remove("hide");

    //set search back to default;
    filter.value="";

    //delete all the titles from the list
    const titles = document.querySelectorAll(".title-item");
    console.log(titles);
    for (const title of titles) {
        title.remove();
        console.log(titles);
    }

    //hide the backHome button
    backHome.classList.add("hide");

    //start the app again
    // this will unhide the authorsOrTitles buttons and search bar, list the author names, and reinstate the original message 
    getAuthorNames();

});

getPoem = async function(selectedTitle) {
    
    const poemRequest = await fetch(`https://poetrydb.org/title,author/${selectedTitle}:abs;${selectedAuthor}:abs/author,title,lines.text`);
    const poem = await poemRequest.text();

displayPoem(poem);
    
}


displayPoem = function(poem) {
    authorsOrtitles.classList.add("hide");
    poemAndButtons.classList.remove("hide");

    //delete all the titles from the list
    const titles = document.querySelectorAll(".title-item");
    console.log(titles);
    for (const title of titles) {
        title.remove();
        console.log(titles);
    }

    const splitPoem = poem.split("\n");
    console.log(splitPoem);

    wildTitle.classList.add("hide");

    const thisTitle = splitPoem[1];
    const thisAuthor = splitPoem[3];
    const thisText = splitPoem.splice(5, splitPoem.length);
    thisTextFormatted = thisText.join(" <br> ")
    
    message.innerHTML = ""   

    const poemDiv = document.createElement("div");

    poemDiv.classList.add("poem-div")

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
    /*}*/

   
}

function download(file, text) {
              
    //creating an invisible element
    const element = document.createElement('a');
    element.setAttribute('href', 
    'data:text/plain;charset=utf-8, '
    + encodeURIComponent(text));
    element.setAttribute('download', file);
  
    // Above code is equivalent to
    // <a href="path of file" download="file name">
  
    document.body.appendChild(element);
  
    //onClick property
    element.click();
  
    document.body.removeChild(element);
    
}
  
// Start file download.
downloadPoem.addEventListener("click", function() {
    // Generate download of Poem.txt 
    
    const html = thisTextFormatted;
    const text = thisTextFormatted.replace(/ <br> /g, "\n");
    const filename = "Poem.txt";
    console.log(text);
    console.log(filename);
    download(filename, text);
}, false);


startOver.addEventListener("click", () => {

    //hide the buttons and poem on the poem display page
    poemAndButtons.classList.add("hide");

    //set search back to default
    filter.value="";

    //start app over
    getAuthorNames();

    //delete all the titles from the list
    const titles = document.querySelectorAll(".title-item");
    console.log(titles);
    for (let title of titles) {
        title.remove();
    }

    

    //hide the backHome button
    backHome.classList.add("hide");

    //delete the existing poem
    const poemDivToRemove = document.querySelectorAll(".poem-div");
    console.log(poemDivToRemove);
    poemDivToRemove.innerHTML = "";
    console.log(poemDivToRemove.innerHTML);

    for (element of poemDivToRemove) {
        element.remove();
    }

    //unhide the author wild card button
    wildAuthor.classList.remove("hide");

});


