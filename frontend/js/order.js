document.getElementById("orderForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const orderData = {
        name: document.getElementById("name").value.trim(),
        contact: document.getElementById("contact").value.trim(),
        foodItem: document.getElementById("foodItem").value.trim(),
        quantity: document.getElementById("quantity").value.trim(),
        address: document.getElementById("address").value.trim(),
    };

    // Check for empty fields
    if (!orderData.name || !orderData.contact || !orderData.foodItem || !orderData.quantity || !orderData.address) {
        alert("Please fill in all fields!");
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/api/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderData),
        });

        const result = await response.json();
        alert(result.message);

        // Show order confirmation message
        document.getElementById("orderMessage").innerText = 
            `Thank you, ${orderData.name}! Your order for ${orderData.quantity} ${orderData.foodItem}(s) has been placed. We will deliver to ${orderData.address}.`;

        // Optionally, reset the form
        document.getElementById("orderForm").reset();
    } catch (error) {
        console.error("Error placing order:", error);
        alert("Failed to place order. Please try again.");
    }
});

document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    document.getElementById("cart-count").textContent = cart.length;
});

document.addEventListener('DOMContentLoaded', () => {
    const ordersContainer = document.getElementById('orders-container');

    fetch('http://localhost:5000/api/orders')
        .then(response => response.json())
        .then(orders => {
            if (orders.length === 0) {
                ordersContainer.innerHTML = '<p>No orders found.</p>';
            } else {
                orders.forEach(order => {
                    const orderElement = document.createElement('div');
                    orderElement.classList.add('order-item');
                    orderElement.innerHTML = `
                        <h3>Order ID: ${order._id}</h3>
                        <p>Created At: ${new Date(order.createdAt).toLocaleString()}</p>
                        <ul>
                            ${order.items.map(item => `<li>${item.name} - $${item.price}</li>`).join('')}
                        </ul>
                    `;
                    ordersContainer.appendChild(orderElement);
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
            ordersContainer.innerHTML = '<p>Failed to load orders.</p>';
        });
});