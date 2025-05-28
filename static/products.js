// Fetch products from the server
fetch('/api/products')
.then(r => r.json())
.then(products => {
  const grid = document.getElementById('product-grid');
  products.forEach(p => {
    const card = document.createElement('article');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <div class="product-info">
        <h2>${p.name}</h2>
        <p class="description">${p.description}</p>
        <p class="price">€${p.price.toFixed(2)}</p>
        <p class="likes"><i class="fa fa-heart"></i> <span>${p.likes}</span></p>
        <button class="btn like-btn" data-id="${p.id}">Like</button>
      </div>
    `;
    grid.appendChild(card);
  });

  // Delegate like‐button clicks
  grid.addEventListener('click', e => {
    if (!e.target.matches('.like-btn')) return;
    const btn = e.target;
    const id = btn.dataset.id;
    fetch(`/like/${id}`, { method: 'POST' })
      .then(r => r.json())
      .then(ok => {
        if (ok) {
          const likesEl = btn.previousElementSibling.querySelector('span');
          likesEl.textContent = parseInt(likesEl.textContent) + 1;
        }
      });
  });
})
.catch(console.error);