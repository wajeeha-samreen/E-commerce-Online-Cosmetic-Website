const products = [
    { id: 1, name: 'Lipstick', price: 1000.00, image: 'images/lipstick.jpg', description: 'A high-quality lipstick for bold, beautiful lips.' },
    { id: 2, name: 'Eyeshadow', price: 1500.00, image: 'images/eyeshadow.jpg', description: 'A vibrant eyeshadow palette with multiple colors.' },
    { id: 3, name: 'Foundation', price: 2000.00, image: 'images/foundation.jpg', description: 'A smooth foundation for a flawless complexion.' },
    { id: 4, name: 'Mascara', price: 1200.00, image: 'images/mascara.jpg', description: 'Lengthens and volumizes your lashes.' },
    { id: 5, name: 'Blush', price: 800.00, image: 'images/blush.jpg', description: 'Adds a rosy glow to your cheeks.' },
    { id: 6, name: 'Concealer', price: 1400.00, image: 'images/concealer.jpg', description: 'Covers blemishes and dark circles.' },
    { id: 7, name: 'Primer', price: 1800.00, image: 'images/primer.jpg', description: 'Creates a smooth base for makeup application.' },
    { id: 8, name: 'Setting Spray', price: 1600.00, image: 'images/setting_spray.jpg', description: 'Keeps your makeup in place all day.' },
    { id: 9, name: 'Highlighter', price: 1200.00, image: 'images/highlighter.jpg', description: 'Adds a luminous glow to your face.' },
    { id: 10, name: 'Bronzer', price: 1300.00, image: 'images/bronzer.jpg', description: 'Gives you a sun-kissed look.' }
];

const cart = [];
const productElements = document.querySelectorAll('.product');
const cartItemsElement = document.querySelector('.cart-items');
const totalElement = document.querySelector('.total');
const searchInput = document.getElementById('search');

productElements.forEach(productElement => {
    const addButton = productElement.querySelector('.add-to-cart');
    addButton.addEventListener('click', () => {
        const productId = parseInt(productElement.getAttribute('data-id'));
        const product = products.find(p => p.id === productId);
        addToCart(product);
    });
});

function addToCart(product) {
    const existingProduct = cart.find(p => p.id === product.id);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        product.quantity = 1;
        cart.push(product);
    }
    updateCart();
}

function updateCart() {
    cartItemsElement.innerHTML = '';
    let total = 0;
    cart.forEach(product => {
        total += product.price * product.quantity;
        const listItem = document.createElement('li');
        listItem.textContent = `${product.name} - ₹${product.price.toFixed(2)} x ${product.quantity} `;
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => removeFromCart(product.id));
        listItem.appendChild(removeButton);
        cartItemsElement.appendChild(listItem);
    });
    totalElement.textContent = `₹${total.toFixed(2)}`;
}

function removeFromCart(productId) {
    const productIndex = cart.findIndex(p => p.id === productId);
    if (productIndex !== -1) {
        cart.splice(productIndex, 1);
        updateCart();
    }
}

searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    productElements.forEach(productElement => {
        const productName = productElement.querySelector('h3').textContent.toLowerCase();
        if (productName.includes(searchTerm)) {
            productElement.style.display = 'block';
        } else {
            productElement.style.display = 'none';
        }
    });
});

// Product details page
if (document.body.contains(document.querySelector('.product-details'))) {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    const product = products.find(p => p.id === productId);

    if (product) {
        document.getElementById('product-image').src = product.image;
        document.getElementById('product-name').textContent = product.name;
        document.getElementById('product-price').textContent = `₹${product.price.toFixed(2)}`;
        document.getElementById('product-description').textContent = product.description;

        const addButton = document.querySelector('.product-details .add-to-cart');
        addButton.addEventListener('click', () => {
            addToCart(product);
            window.location.href = 'index.html';
        });
    }
}

function openLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const productImage = document.getElementById('product-image');

    lightbox.style.display = 'block';
    lightboxImage.src = productImage.src;
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
}

document.querySelector('.lightbox .close').addEventListener('click', closeLightbox);

document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search');
    const productElements = document.querySelectorAll('.product');

    searchButton.addEventListener('click', () => {
        const query = searchInput.value.toLowerCase();
        productElements.forEach(productElement => {
            const productName = productElement.querySelector('h3').textContent.toLowerCase();
            if (productName.includes(query)) {
                productElement.style.display = 'block';
            } else {
                productElement.style.display = 'none';
            }
        });
    });
});

document.querySelector('.nav-toggle').addEventListener('click', function() {
    const navList = document.querySelector('.nav-list');
    navList.classList.toggle('active');
});

function showDetails(productId) {
    // Hide all product info divs
    var allDetails = document.querySelectorAll('.product-info');
    allDetails.forEach(function(detail) {
        detail.style.display = 'none';
    });

    // Show the selected product info
    var selectedDetail = document.getElementById(productId);
    selectedDetail.style.display = 'block';
}
// Example code for adding an item to the cart
document.addEventListener('DOMContentLoaded', () => {
    const cartCount = document.querySelector('.cart-count');
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    function updateCartCount() {
        cartCount.textContent = cartItems.length;
    }

    function addToCart(item) {
        cartItems.push(item);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        updateCartCount();
    }

    updateCartCount();
});
