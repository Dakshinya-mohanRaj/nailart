let cart = []; // Cart array to store items

// Show toast message
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add("show"), 100);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 2000);
}

// Add product to cart
function addToCart(name, price) {
  // Check if product already exists in cart
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.qty += 1; // Increase quantity
  } else {
    cart.push({ name, price, qty: 1 }); // Add new product
  }

  updateCart(); // Update cart count & total
  showToast("✅ Added Successfully"); // Show message
}

// Update cart display
function updateCart() {
  let totalItems = 0;
  let totalPrice = 0;

  cart.forEach(item => {
    totalItems += item.qty;
    totalPrice += item.price * item.qty;
  });

  document.getElementById("cartCount").textContent = totalItems;
  document.getElementById("cartTotal").textContent = "₹" + totalPrice;
}
