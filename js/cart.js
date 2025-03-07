document.addEventListener('DOMContentLoaded', () => {
    console.log("Cart page loaded!");

    const cartContainer = document.getElementById('cart-container'); 
    const cartCountElement = document.getElementById('cart-count');
    const checkoutButton = document.getElementById('checkout-button'); 

    function getCart() {
        return JSON.parse(localStorage.getItem('cart')) || [];
    }

    function saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function updateCartCount() {
        let cart = getCart();
        let totalQuantity = cart.reduce((total, item) => total + (item.quantity || 1), 0);
        if (cartCountElement) {
            cartCountElement.textContent = totalQuantity;
        }
    }

    function displayCart() {
        let cart = getCart();
        
        if (cartContainer) {
            cartContainer.innerHTML = '';

            if (cart.length === 0) {
                cartContainer.innerHTML = '<p>Your cart is empty.</p>'; 
            } else {
                cart.forEach((item, index) => {
                    const itemElement = document.createElement('div');
                    itemElement.classList.add('cart-item');
                    itemElement.innerHTML = `
                        <h3>${item.name}</h3>
                        <p>Price: $${(item.price * (item.quantity || 1)).toFixed(2)}</p>
                        <p>Quantity: ${item.quantity || 1}</p>
                        <button class="increase-qty" data-index="${index}">+</button>
                        <button class="decrease-qty" data-index="${index}">-</button>
                        <button class="remove-item" data-index="${index}">Remove</button>
                    `;
                    cartContainer.appendChild(itemElement);
                });

                // Handle increasing quantity
                document.querySelectorAll('.increase-qty').forEach(button => {
                    button.addEventListener('click', function() {
                        let cart = getCart();
                        let index = parseInt(this.getAttribute('data-index'));
                        cart[index].quantity = (cart[index].quantity || 1) + 1;
                        saveCart(cart);
                        displayCart();
                    });
                });

                // Handle decreasing quantity
                document.querySelectorAll('.decrease-qty').forEach(button => {
                    button.addEventListener('click', function() {
                        let cart = getCart();
                        let index = parseInt(this.getAttribute('data-index'));
                        if (cart[index].quantity > 1) {
                            cart[index].quantity -= 1;
                        } else {
                            cart.splice(index, 1);
                        }
                        saveCart(cart);
                        displayCart();
                    });
                });

                // Handle removing items
                document.querySelectorAll('.remove-item').forEach(button => {
                    button.addEventListener('click', function() {
                        let cart = getCart();
                        let index = parseInt(this.getAttribute('data-index'));
                        cart.splice(index, 1);
                        saveCart(cart);
                        displayCart();
                    });
                });
            }
        }

        updateCartCount();
    }

    // Ensure checkout button exists before adding event listener
    if (checkoutButton) {
        checkoutButton.addEventListener("click", () => {
            let cart = getCart();
            if (cart.length === 0) {
                alert("Your cart is empty!");
                return;
            }

            alert("Proceeding to checkout...");
            
            // Redirect to checkout page
            window.location.href = "checkout.html";
        });
    } else {
        console.warn("Checkout button not found! Make sure the button ID is correct.");
    }

    displayCart();
});
