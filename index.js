// Initial products data
const products = [
    { id: 1, name: 'Lipstick', price: 1000.00, image: 'images/lipstick.jpg', description: 'A high-quality lipstick for bold, beautiful lips.' },
    { id: 2, name: 'Eyeshadow', price: 1500.00, image: 'images/eyeshadow.jpg', description: 'A vibrant eyeshadow palette with multiple colors.' },
    { id: 3, name: 'Foundation', price: 2000.00, image: 'images/foundation.jpg', description: 'A smooth foundation for a flawless complexion.' }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Handle DOMContentLoaded event
document.addEventListener('DOMContentLoaded', () => {
    const productElements = document.querySelectorAll('.product');
    const cartItemsElement = document.querySelector('.cart-items');
    const totalElement = document.querySelector('.total');
    const searchInput = document.getElementById('search');
    
    // Add event listeners for 'Add to Cart' buttons
    productElements.forEach(productElement => {
        const addButton = productElement.querySelector('.add-to-cart');
        addButton.addEventListener('click', () => {
            const productId = parseInt(productElement.getAttribute('data-id'));
            const product = products.find(p => p.id === productId);
            addToCart(product);
        });
    });

    // Search functionality
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

    // Update cart UI
    function updateCartUI() {
        const cartItems = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');

        cartItems.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            total += item.price * item.quantity;
            const cartItem = document.createElement('li');
            cartItem.innerHTML = `
                <span>${item.name} - ₹${item.price.toFixed(2)} x ${item.quantity}</span>
                <button onclick="removeFromCart(${item.id})">Remove</button>
            `;
            cartItems.appendChild(cartItem);
        });

        cartTotal.textContent = `₹${total.toFixed(2)}`;
    }

    // Add product to cart
    window.addToCart = function (product) {
        const existingProduct = cart.find(item => item.id === product.id);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartUI();
    };

    // Remove product from cart
    window.removeFromCart = function (productId) {
        cart = cart.filter(item => item.id !== productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartUI();
    };

    // Checkout button event listener
    document.getElementById('checkout').addEventListener('click', () => {
        alert('Proceeding to checkout...');
        // Redirect to checkout page or perform another action
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
                window.location.href = 'index.html'; // Redirect to home page after adding to cart
            });
        }
    }

    // Initialize cart UI
    updateCartUI();
});
document.getElementById('shop-now').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default link behavior
    window.location.href = 'products.html'; // Redirect to the products page
});
function trackButtonClick() {
    gtag('event', 'click', {
        'event_category': 'button',
        'event_label': 'Shop Now'
    });
}
