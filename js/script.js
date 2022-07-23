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
//variable to select the area where we display the poem
const showPoem = document.querySelector(".poem");

//fetch author names info from poetry db
const getAuthorNames = async function() {
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
    
}

//if an h4 list item is selected, that author name is sent to the getAuthorDetails function
//if an h5 list item is selected, that poem title is sent to the displayPoem function.
list.addEventListener("click", function(e) {
    if (e.target.matches("h4")) {
      const selectedAuthor = e.target.innerText;
      getTitleNames(selectedAuthor);
      
    } else if (e.target.matches("h5")) {
        const selectedTitle = e.target.innerText;
        displayPoem(selectedTitle);
    }
  });

    //get the names of the poems written by the selected author
  getTitleNames = async function(selectedAuthor) {
      const titlesRequest = await fetch(`https://poetrydb.org/author/${selectedAuthor}/title`);
      const titles = await titlesRequest.json();
      //displayTitles(titles);
      console.log(titles);
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


