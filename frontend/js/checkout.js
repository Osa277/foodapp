document.addEventListener("DOMContentLoaded", () => {
    const orderSummaryContainer = document.getElementById("order-summary");
    const totalPriceElement = document.getElementById("total-price");
    const checkoutForm = document.getElementById("checkout-form");

    function getCart() {
        return JSON.parse(localStorage.getItem("cart")) || [];
    }

    function displayOrderSummary() {
        let cart = getCart();
        
        if (!orderSummaryContainer) {
            console.error("Error: #order-summary element is missing in checkout.html!");
            return;
        }

        if (!totalPriceElement) {
            console.error("Error: #total-price element is missing in checkout.html!");
            return;
        }

        orderSummaryContainer.innerHTML = "";

        if (cart.length === 0) {
            orderSummaryContainer.innerHTML = "<p>Your cart is empty.</p>";
            totalPriceElement.textContent = "$0.00";
            return;
        }

        let total = 0;

        cart.forEach((item) => {
            let price = item.price || 0; // Ensure price exists
            let quantity = item.quantity || 1; // Default quantity to 1 if missing
            let itemTotal = price * quantity;

            const itemElement = document.createElement("div");
            itemElement.classList.add("order-item");
            itemElement.innerHTML = `<p>${item.name} (x${quantity}) - $${itemTotal.toFixed(2)}</p>`;
            orderSummaryContainer.appendChild(itemElement);

            total += itemTotal;
        });

        totalPriceElement.textContent = `$${total.toFixed(2)}`;
    }

    if (checkoutForm) {
        checkoutForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const address = document.getElementById("address").value;
            const cart = getCart();

            if (cart.length === 0) {
                alert("Your cart is empty!");
                return;
            }

            // Create order object
            const order = {
                id: Date.now(), // Unique ID
                name,
                email,
                address,
                items: cart,
                status: "Pending",
            };

            // Save order to localStorage (or send to backend)
            let orders = JSON.parse(localStorage.getItem("orders")) || [];
            orders.push(order);
            localStorage.setItem("orders", JSON.stringify(orders));

            // Clear cart after checkout
            localStorage.removeItem("cart");

            alert("Order placed successfully!");
            window.location.href = "order-confirmation.html"; // Redirect to confirmation page
        });
    } else {
        console.error("Error: #checkout-form is missing in checkout.html!");
    }

    displayOrderSummary();
});
