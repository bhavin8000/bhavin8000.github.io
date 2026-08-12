let cart = [];

function addToCart(name, price) {

    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    updateCart();

    alert(name + " added to cart!");
}

function removeFromCart(index) {

    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        cart.splice(index, 1);
    }

    updateCart();
}

function updateCart() {

    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const cartTotal = document.getElementById("cartTotal");

    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;

    if (cart.length === 0) {

        cartItems.innerHTML = "<p>Your cart is empty.</p>";

    } else {

        cart.forEach((item, index) => {

            const itemTotal = item.price * item.quantity;

            total += itemTotal;
            count += item.quantity;

            cartItems.innerHTML += `
                <div class="cart-item">

                    <div>
                        <strong>${item.name}</strong>
                        <br>
                        ₹${item.price} × ${item.quantity}
                    </div>

                    <div>
                        ₹${itemTotal}
                        <br>
                        <button class="remove-btn"
                            onclick="removeFromCart(${index})">
                            Remove
                        </button>
                    </div>

                </div>
            `;
        });
    }

    cartCount.innerText = count;
    cartTotal.innerText = total;
}

function openCart() {

    document.getElementById("cartModal").style.display = "flex";

}

function closeCart() {

    document.getElementById("cartModal").style.display = "none";

}

function orderOnWhatsApp() {

    if (cart.length === 0) {
        alert("Please add some lemons to your cart first.");
        return;
    }

    let message = "🍋 Hello Bhavin! I want to order:%0A%0A";

    let total = 0;

    cart.forEach(item => {

        const itemTotal = item.price * item.quantity;

        message +=
            "• " + item.name +
            " × " + item.quantity +
            " = ₹" + itemTotal + "%0A";

        total += itemTotal;
    });

    message += "%0A💰 Total: ₹" + total;
    message += "%0A%0APlease confirm my order.";

    /*
       IMPORTANT:
       Replace 91XXXXXXXXXX with Bhavin's
       WhatsApp number including country code.
    */

    const phoneNumber = "91XXXXXXXXXX";

    const whatsappURL =
        "https://wa.me/" + phoneNumber + "?text=" + message;

    window.open(whatsappURL, "_blank");
}
