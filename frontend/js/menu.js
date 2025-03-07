document.addEventListener('DOMContentLoaded', () => {
    const addToOrderButton = document.getElementById('add-to-order');

    function toggleMenu(categoryId) {
        const category = document.getElementById(categoryId);
        if (category) {
            category.classList.toggle('active');
        }
    }

    addToOrderButton.addEventListener('click', () => {
        const selectedItems = document.querySelectorAll('input[type="radio"]:checked');
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        selectedItems.forEach(item => {
            const name = item.value;
            const price = parseFloat(item.dataset.price); // Get price from dataset
            let existingItem = cart.find(cartItem => cartItem.name === name);

            if (existingItem) {
                existingItem.quantity += 1; // Increase quantity if already in cart
            } else {
                cart.push({ name, price, quantity: 1 });
            }
        });

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        alert('Items added to order!');
    });

    function updateCartCount() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
        document.getElementById("cart-count").textContent = totalQuantity;
    }

    updateCartCount();
    window.toggleMenu = toggleMenu;
});
