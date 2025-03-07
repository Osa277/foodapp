document.addEventListener("DOMContentLoaded", function () {
    console.log("Website loaded!");

    const cartCountElement = document.getElementById("cart-count");

    function updateCartCount() {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
        if (cartCountElement) {
            cartCountElement.textContent = totalQuantity;
        }
    }

    function addToCart(itemName, itemPrice) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let existingItem = cart.find(item => item.name === itemName);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name: itemName, price: parseFloat(itemPrice), quantity: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
        alert(`${itemName} added to cart!`);
    }

    document.body.addEventListener("click", (event) => {
        if (event.target.classList.contains("add-to-cart")) {
            const name = event.target.getAttribute("data-name");
            const price = event.target.getAttribute("data-price");
            
            if (name && price) {
                addToCart(name, price);
            } else {
                console.error("Missing data-name or data-price attributes!");
            }
        }
    });

    updateCartCount();
});
