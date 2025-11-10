// cart.js

// ====== localStorage helpers ======
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  // header cart button (if present)
  const cartBtn = document.querySelector(".cart-btn");
  if (cartBtn) {
    const count = getCart().reduce((acc, item) => acc + (item.qty || 1), 0);
    cartBtn.textContent = `Cart (${count})`;
  }
}

// ====== Render cart page items ======
const cartContainer = document.querySelector(".cart-item-list");

function renderCart() {
  const cart = getCart();
  if (!cartContainer) return;

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    renderCartTotal();
    return;
  }

  cartContainer.innerHTML = cart.map(item => `
    <div class="cart-item" data-id="${item.id}">
      <img src="${item.image}" alt="${item.title}">
      <div class="item-details">
        <h4><b>${item.title}</b></h4>
        <p>${item.description}</p>
        <div class="qty-controls">
          <button class="qty-decrease" data-id="${item.id}">-</button>
          <input class="qty-input" data-id="${item.id}" type="number" min="1" value="${item.qty || 1}" />
          <button class="qty-increase" data-id="${item.id}">+</button>
        </div>
      </div>
      <div class="item-price">
        <h4>Rs. ${item.price}</h4>
        <p>Rating: ${item.rating || "-"}</p>
        <button class="remove-btn" data-id="${item.id}">Remove</button>
      </div>
    </div>
  `).join("");

  renderCartTotal();
}

// ====== Cart total & checkout stub ======
function renderCartTotal() {
  const cart = getCart();
  const container = document.querySelector(".cart-total-area");
  const total = cart.reduce((sum, item) => sum + (item.price * (item.qty || 1)), 0);

  if (!container) {
    // if no pre-defined area, create one below the list
    const wrapper = document.querySelector(".cart-container");
    const existing = document.querySelector(".cart-total-area");
    if (!existing && wrapper) {
      const el = document.createElement("div");
      el.className = "cart-total-area";
      wrapper.appendChild(el);
    }
  }

  const finalContainer = document.querySelector(".cart-total-area");
  if (finalContainer) {
    if (cart.length === 0) {
      finalContainer.innerHTML = "";
    } else {
      finalContainer.innerHTML = `
        <hr style="margin:15px 0" />
        <h4>Total: Rs. ${total}</h4>
        <div style="display:flex;gap:10px;margin-top:10px">
          <button class="checkout-btn">Proceed to Checkout</button>
          <button class="clear-cart">Clear Cart</button>
        </div>
      `;
    }
  }
}

// ====== Update qty / remove / clear ======
function setItemQty(id, qty) {
  const cart = getCart();
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty = Math.max(1, qty);
  saveCart(cart);
  renderCart();
}

function removeItem(id) {
  const cart = getCart().filter(i => i.id !== id);
  saveCart(cart);
  renderCart();
}

function clearCart() {
  saveCart([]);
  renderCart();
}

// ====== Events ======
document.addEventListener("click", (e) => {
  if (e.target.matches(".qty-increase")) {
    const id = e.target.dataset.id;
    const cart = getCart();
    const item = cart.find(i => i.id === id);
    if (item) setItemQty(id, (item.qty || 1) + 1);
  }

  if (e.target.matches(".qty-decrease")) {
    const id = e.target.dataset.id;
    const cart = getCart();
    const item = cart.find(i => i.id === id);
    if (item) setItemQty(id, Math.max(1, (item.qty || 1) - 1));
  }

  if (e.target.matches(".remove-btn")) {
    const id = e.target.dataset.id;
    removeItem(id);
  }

  if (e.target.matches(".checkout-btn")) {
    // simple placeholder for checkout flow
    const cart = getCart();
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }
    const total = cart.reduce((s, i) => s + i.price * (i.qty || 1), 0);
    alert(`Proceeding to checkout. Total: Rs. ${total}\n(Implement real checkout later)`);
  }

  if (e.target.matches(".clear-cart")) {
    if (confirm("Clear all items from cart?")) clearCart();
  }
});

// update when user edits input directly
document.addEventListener("input", (e) => {
  if (e.target.matches(".qty-input")) {
    const id = e.target.dataset.id;
    const val = parseInt(e.target.value || "1", 10);
    if (!isNaN(val)) setItemQty(id, Math.max(1, val));
  }
});

// initial render
updateCartCount();
renderCart();
