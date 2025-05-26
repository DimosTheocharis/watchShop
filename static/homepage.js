
setUpCarousel();

function setUpCarousel() {
    fetch('http://127.0.0.1:5000/popular-products', {
        method: 'GET'
    })
    .then((response) => response.json())
    .then(data => {
        console.log(data);
        // Εδώ θέλουμε να φτιάχνεται δυναμικά το ui για τα αντικείμενα του carousel.
    })
    .catch(error => console.error('Error fetching popular products:', error.message));
}

