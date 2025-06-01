import { renderProducts } from './utils.js';


// Add event listeners
function setupPage() {
    document.addEventListener("DOMContentLoaded", () => {
        const searchButton = document.getElementById("searchButton");
        const searchForm = document.getElementById("searchForm");
        
        searchButton.addEventListener("click", () => {
            handleSearch();
        })

        searchForm.addEventListener("submit", (event) => {
            console.log("ELA RE");
            event.preventDefault();
            handleSearch();
        })
    })
}

setupPage();


// Fetch products from the server
fetch('/api/products')
.then(r => r.json())
.then(products => {renderProducts(products)})
.catch(console.error);



/**
 * Finds those products whose names match the text inserted in the search bar
 */
function handleSearch() {
    const searchBar = document.getElementById('searchBar');
    const query = searchBar['value'];

    fetch(`/api/search/${query}`)
    .then((response) => response.json())
    .then((results) => renderProducts(results))
}