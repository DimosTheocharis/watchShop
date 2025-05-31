setUpCarousel();

 function setUpCarousel() {
   fetch('/api/popular-products')
     .then(res => res.json())
     .then(renderCarousel)
     .catch(err => console.error('Error fetching popular products:', err));
 }

 function renderCarousel(products) {
   const carousel = document.getElementById('popularCarousel');
   if (!carousel) return;

   // Build one <div class="slide"> per product
   products.slice(0, 5).forEach((p, i) => {
     const slide = document.createElement('div');
     slide.className = 'slide';
     slide.style.opacity = i === 0 ? '1' : '0';
     slide.innerHTML = `
       <img src="${p.image}" alt="${p.name}">
       <div class="slide-caption">
         <h3>${p.name}</h3>
         <p class="price">€${Number(p.price).toLocaleString('el-GR')}</p>
       </div>
     `;
     carousel.appendChild(slide);
   });

   // Simple 1-second auto-advance
   let index = 0;
   const slides = carousel.querySelectorAll('.slide');
   setInterval(() => {
     slides[index].style.opacity = '0';
     index = (index + 1) % slides.length;
     slides[index].style.opacity = '1';
   }, 1000);
 }