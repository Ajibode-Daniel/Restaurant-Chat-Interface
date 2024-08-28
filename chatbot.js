document.addEventListener('DOMContentLoaded', () => {
    const chat = document.getElementById('chat');
    const input = document.getElementById('input');
    let currentOrder = JSON.parse(localStorage.getItem('currentOrder')) || [];
    let orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];
    const menu = [
        { id: 1, name: 'Pounded Yam & Egusi', price: 5 },
        { id: 2, name: 'Jollof RIce & Chicken', price: 8 },
        { id: 3, name: 'Yam Porridge & Goat Meat', price: 4 },
        { id: 4, name: 'Stir fried Pasta & Turkey', price: 2 },
    ];

    function saveSession() {
        localStorage.setItem('currentOrder', JSON.stringify(currentOrder));
        localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
    }

    function appendMessage(text, sender = 'bot') {
        const message = document.createElement('div');
        message.className = `message ${sender}`;
        message.textContent = text;
        chat.appendChild(message);
        chat.scrollTop = chat.scrollHeight;
    }

    function handleInput(value) {
        switch (value) {
            case '1':
                displayMenu();
                break;
            case '99':
                placeOrder();
                break;
            case '98':
                displayOrderHistory();
                break;
            case '97':
                displayCurrentOrder();
                break;
            case '0':
                cancelOrder();
                break;
            default:
                handleOrderSelection(value);
                break;
        }
        saveSession();
    }

    function displayMenu() {
        appendMessage('Please select an item:');
        menu.forEach(item => appendMessage(`${item.id}. ${item.name} - $${item.price}`, 'bot'));
    }

    function handleOrderSelection(value) {
        const item = menu.find(m => m.id === parseInt(value));
        if (item) {
            currentOrder.push(item);
            appendMessage(`Added ${item.name} to your order.`, 'bot');
        } else {
            appendMessage('Invalid selection. Please try again.', 'bot');
        }
    }

    function placeOrder() {
        if (currentOrder.length > 0) {
            orderHistory.push([...currentOrder]);
            currentOrder = [];
            appendMessage('Order placed successfully!', 'bot');
        } else {
            appendMessage('No order to place.', 'bot');
        }
        appendMessage('Select 1 to place a new order.', 'bot');
    }

    function displayOrderHistory() {
        if (orderHistory.length > 0) {
            appendMessage('Your order history:', 'bot');
            orderHistory.forEach((order, index) => {
                appendMessage(`Order ${index + 1}: ${order.map(item => item.name).join(', ')}`, 'bot');
            });
        } else {
            appendMessage('No orders in history.', 'bot');
        }
    }

    function displayCurrentOrder() {
        if (currentOrder.length > 0) {
            appendMessage(`Your current order: ${currentOrder.map(item => item.name).join(', ')}`, 'bot');
        } else {
            appendMessage('No current order.', 'bot');
        }
    }

    function cancelOrder() {
        if (currentOrder.length > 0) {
            currentOrder = [];
            appendMessage('Order cancelled.', 'bot');
        } else {
            appendMessage('No order to cancel.', 'bot');
        }
    }

    appendMessage('Select 1 to Place an order\nSelect 99 to checkout order\nSelect 98 to see order history\nSelect 97 to see current order\nSelect 0 to cancel order', 'bot');

    input.addEventListener('keydown', event => {
        if (event.key === 'Enter') {
            const value = input.value.trim();
            if (value) {
                appendMessage(value, 'user');
                handleInput(value);
                input.value = '';
            }
        }
    });
});
