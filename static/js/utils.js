

/**
 * It creates a DOM element for every node of the given {products} list
 * @param {*} products A list of products 
 */
export function renderProducts(products) {
    const cards = [];
    products.forEach(product => {
        cards.push(renderProduct(product));
    });

    const grid = document.getElementById('product-grid');

    // Clean previous children
    grid.innerHTML = '';

    // Add new children
    cards.forEach(card => {
        grid.appendChild(card);
    });
}

/**
 * It creates an article DOM element that will contain information about the product's image, title,
 * description, price, like amount and more
 * @param {*} product 
 * @returns the article DOM element
 */
function renderProduct(product) {
    const card = document.createElement('article');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="static/images/${product.image}" alt="${product.name}">
      <div class="product-info">
        <h2>${product.name}</h2>
        <p class="description">${product.description}</p>
        <p class="price">€${product.price.toFixed(2)}</p>
        <p class="likes"><i class="fa fa-heart"></i> <span>${product.likes}</span></p>
        <button class="btn like-btn" data-id="${product.id}">Like</button>
      </div>
    `;

    const likeButton = card.querySelector("button.like-btn");
    const likesSpan = card.querySelector("p.likes span");
    likeButton.addEventListener("click", () => {
        fetch(`/api/like/${product.id}`, { method: 'POST' })
        .then(response => response.json())
        .then(ok => {
            if (ok) {
                likesSpan.textContent = parseInt(likesSpan.textContent) + 1;
            }
        });
    })

    return card;
}