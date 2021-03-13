let searchInputEl = document.getElementById("searchInput");

let searchResultsEl = document.getElementById("searchResults");

let spinnerEl = document.getElementById("spinner");

function createAndAppendSearchResult(result) {
    let {
        link,
        title,
        description
    } = result;

    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("result-item");

    let titleEl = document.createElement("a");
    titleEl.href = link;
    titleEl.target = "_blank";
    titleEl.textContent = title;
    titleEl.classList.add("result-title");
    resultItemEl.appendChild(titleEl);


    let urlEl = document.createElement("a");
    urlEl.classList.add("result-url");
    urlEl.href = link;
    urlEl.target = "_blank";
    urlEl.textContent = link;
    resultItemEl.appendChild(urlEl);

    let descriptionEl = document.createElement("p");
    descriptionEl.classList.add("link-description");
    descriptionEl.textContent = description;
    resultItemEl.appendChild(descriptionEl);

    searchResultsEl.appendChild(resultItemEl);
}

function createAndAppendTableHeader(){


    let headerEl = document.createElement("div");
    headerEl.classList.add("result-item");

    let titleEl = document.createElement("p");
    titleEl.textContent = "Title";
    titleEl.classList.add("table-header-text");
    headerEl.appendChild(titleEl);

    let urlEl = document.createElement("p");
    urlEl.textContent = "Link";
    urlEl.classList.add("table-header-text");
    headerEl.appendChild(urlEl);

    let descriptionEl = document.createElement("p");
    descriptionEl.classList.add("table-header-description");
    descriptionEl.textContent = "Description";
    headerEl.appendChild(descriptionEl);

    searchResultsEl.appendChild(headerEl);
}

function displayResults(searchResults) {
    spinnerEl.classList.add("d-none");
    createAndAppendTableHeader()

    for (let result of searchResults) {
        createAndAppendSearchResult(result);
    }
}

function searchWikipedia(event) {
    if (event.key === "Enter") {

        spinnerEl.classList.remove("d-none");
        searchResultsEl.textContent = "";

        let searchInput = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        let options = {
            method: "GET"
        };

        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResults(search_results);
            });
    }
}

searchInputEl.addEventListener("keydown", searchWikipedia);