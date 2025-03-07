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