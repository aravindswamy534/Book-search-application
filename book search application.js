let searchInputEl = document.getElementById('searchInput');
let selectDisplayCountEl = document.getElementById('selectDisplayCount');
let searchResultsEl = document.getElementById('searchResults');
let spinnerEl = document.getElementById("spinner");
spinnerEl.classList.add('d-none');
let searchHeaderEl = document.getElementById("searchHeader");
let searchCount = 10;
let path = null;
let url = null;

function DisplaySearchResults(url) {
    let options = {
        method: "GET"
    };
    fetch(url, options).then(function(response) {
        return response.json();
    }).then(function(jsonData) {
        let bookslist = jsonData.search_results;
        let noOfBooks = bookslist.length;
        if (noOfBooks === 0) {
            searchHeaderEl.textContent = "No results Found";
        } else {
            searchHeaderEl.textContent = "Popular Books";
            for (let book of bookslist) {
                let {
                    imageLink,
                    author
                } = book;
                let container = document.createElement("div");
                container.classList.add("col-6", "col-md-4");

                let img = document.createElement("img");
                img.src = imageLink;
                img.classList.add("image-styling");

                let para = document.createElement('p');
                para.textContent = author;

                container.appendChild(img);
                container.appendChild(para);
                searchResultsEl.appendChild(container);
            }
        }
    });
}

selectDisplayCountEl.addEventListener("change", function(event) {
    searchCount = parseInt(event.target.value);
    searchResultsEl.textContent = "";
    url = "https://apis.ccbp.in/book-store?title=" + path + "&maxResults=" + searchCount;
    DisplaySearchResults(url);
});

searchInputEl.addEventListener('keydown', function(event) {
    if (event.key === "Enter" && event.target.value !== "") {
        searchResultsEl.textContent = "";
        path = event.target.value;
        url = "https://apis.ccbp.in/book-store?title=" + path + "&maxResults=" + searchCount;
        DisplaySearchResults(url);
    }
});