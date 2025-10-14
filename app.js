// Wait for the page to fully load
document.addEventListener("DOMContentLoaded", () => {
    // Select all Add to Cart buttons
    const addToCartButtons = document.querySelectorAll(".add-cart");
  
    // Loop through all buttons and add click event
    addToCartButtons.forEach((button) => {
      button.addEventListener("click", () => {
        button.textContent = "✅ Added to Cart";
        button.disabled = true; // Disable after adding to cart
  
        // Restore button after 2 seconds
        setTimeout(() => {
          button.textContent = "Add to Cart";
          button.disabled = false;
        }, 2000);
      });
    });
  
    // Profile dropdown functionality (extra)
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        alert("You have been logged out!");
        // Add your Firebase logout logic here if needed
      });
    }
  });
  // ===== CART FUNCTIONALITY =====
let cart = [];
const cartItemsContainer = document.getElementById("cart-items");
const totalAmountElement = document.getElementById("totalAmount");

// Add to cart buttons
document.querySelectorAll(".add-cart").forEach(button => {
  button.addEventListener("click", e => {
    const productElement = e.target.parentElement;
    const name = productElement.querySelector("h3").textContent;
    const priceText = productElement.querySelector("p").textContent.replace("₹", "");
    const price = parseFloat(priceText);

    const img = productElement.querySelector("img").src;

    const existing = cart.find(item => item.name === name);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ name, price, img, quantity: 1 });
    }

    updateCart();
  });
});

// Update cart display
function updateCart() {
  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <p>${item.name} (x${item.quantity})</p>
      <button class="remove-btn" onclick="removeFromCart(${index})">❌</button>
    `;
    cartItemsContainer.appendChild(cartItem);
  });

  totalAmountElement.textContent = total.toFixed(2);
}

// Remove item
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

// Checkout button (demo)
document.getElementById("checkoutBtn").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty!");
  } else {
    alert("Thank you for shopping! 💅");
    cart = [];
    updateCart();
  }
});

  
