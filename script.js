// The purpose of script.js is to implement a chapter viewing carousel that will allow the user
// to view the chapter title, number, summary, and cover image of all 900+ (and growing) One Piece issues

// This JS file will allow the user to cycle to the previous, and the next chapter at the click of a button
// whilst staying on the same page, resulting in more efficient viewing and less server load

// Defining our name-spacing for our website
const pieceApp = {};

// Fetching our API from One Piece Cover, and running it through a proxy courtesy of Juno College
pieceApp.getChapters = function(){
    
    const proxiedUrl = `https://onepiececover.com/api/chapters/${pieceApp.currentChapter}`

    const url = new URL('https://proxy.hackeryou.com');

    url.search = new URLSearchParams({
        reqUrl: proxiedUrl
    })  


fetch(url)
        .then (data => {
            return data.json();
        })
        .then(jsonData => {
            pieceApp.displayChapter(jsonData)
        })
    }


// This display chapter function will implement the visuals of the chapters page
// It will display the chapter title, number, summary, and cover images

pieceApp.displayChapter = function (arrayOfChapters) {
        
        const title = document.querySelector('.chapter-title');
        title.innerText = arrayOfChapters.chapter

        const chapterName = document.querySelector('.chapter-name');
        chapterName.innerText = arrayOfChapters.title
        

        const summary = document.querySelector('.chapter-description');
        summary.innerText = arrayOfChapters.summary;

        const chapterImage = document.querySelector('.api-img');
        chapterImage.alt = arrayOfChapters.explanation;
        chapterImage.src = arrayOfChapters.cover_images.split('|')[0] 
}

// This change chapter function will allow the user to cycle through different chapters
// Utilizing the prev and next buttons, the chapters will change dynamically whilst staying on the same page

pieceApp.changeChapter = function() {
    const next = document.querySelector('.next');
    next.addEventListener('click', function () {
        
    pieceApp.currentChapter = pieceApp.currentChapter + 1;
    pieceApp.getChapters(pieceApp.currentChapter);
})
    const previous = document.querySelector('.previous');
    previous.addEventListener('click', function() { 
        
        if (pieceApp.currentChapter !== 1){
        pieceApp.currentChapter = pieceApp.currentChapter - 1;
        pieceApp.getChapters(pieceApp.currentChapter);
        }
    })
}


// chSelectors will allow the user to utilize the menu on the left hand side to manually select which of
// the 900+ chapters they want to visit, loading almost instantly

pieceApp.menu = function() {
    const chSelectors = document.querySelector('#chapter-selection')

    chSelectors.addEventListener("change", function (event) {
        event.preventDefault
        const selection = this.value

        pieceApp.currentChapter = 1 * selection
        pieceApp.getChapters(pieceApp.currentChapter)
    })
}

// The init function that will allow us to run our JS, defaulting the chapter value to 1 whilst grabbing
// all the 900+ chapters info from the API and displaying it on the page

pieceApp.init = function() {
    pieceApp.currentChapter = 1
    pieceApp.getChapters(pieceApp.currentChapter)
    pieceApp.changeChapter();
    pieceApp.menu()
}

pieceApp.init();

