document.addEventListener("DOMContentLoaded", () => {
    const paymentForm = document.getElementById("payment-form");

    paymentForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent form submission

        const cardName = document.getElementById("card-name").value.trim();
        const cardNumber = document.getElementById("card-number").value.trim();
        const expiryDate = document.getElementById("expiry-date").value.trim();
        const cvv = document.getElementById("cvv").value.trim();


        document.addEventListener("DOMContentLoaded", () => {
            const paymentForm = document.getElementById("payment-form");
        
            paymentForm.addEventListener("submit", (event) => {
                event.preventDefault();
        
                alert("Payment Successful! Redirecting...");
        
                setTimeout(() => {
                    localStorage.removeItem("cart"); // Clear cart
                    localStorage.removeItem("orderDetails"); // Clear checkout details
                    window.location.href = "order-confirmation.html";
                }, 2000);
            });
        });

        document.getElementById("payment-form").addEventListener("submit", async (event) => {
            event.preventDefault();
        
            const orderDetails = JSON.parse(localStorage.getItem("orderDetails"));
            const cart = JSON.parse(localStorage.getItem("cart")) || [];
        
            if (!orderDetails || cart.length === 0) {
                alert("Order details missing!");
                return;
            }
        
            const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        
            const orderData = {
                name: orderDetails.name,
                address: orderDetails.address,
                phone: orderDetails.phone,
                items: cart,
                totalPrice
            };
        
            try {
                const response = await fetch("http://localhost:5000/api/orders", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(orderData)
                });
        
                if (response.ok) {
                    alert("Payment successful! Order placed.");
                    localStorage.removeItem("cart");
                    localStorage.removeItem("orderDetails");
                    window.location.href = "order-confirmation.html";
                } else {
                    throw new Error("Failed to place order.");
                }
            } catch (error) {
                alert("Error processing payment: " + error.message);
            }
        });
        
        

        // Simple validation check
        if (!cardName || !cardNumber || !expiryDate || !cvv) {
            alert("Please fill in all payment details.");
            return;
        }

        alert("Payment Successful! Redirecting...");

        // Simulating payment processing (real-world: integrate Stripe/PayPal)
        setTimeout(() => {
            localStorage.removeItem("cart"); // Clear cart after payment
            window.location.href = "order-confirmation.html";
        }, 2000);
    });
});
