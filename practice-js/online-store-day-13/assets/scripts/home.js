// home.js

// ====== PRODUCTS ======
const PRODUCTS = [
  {
    id: "p1",
    title: "Leather Purse",
    price: 2500,
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
    rating: "3/5",
    description: "Classic handmade brown leather purse."
  },
  {
    id: "p2",
    title: "Shoulder Bag",
    price: 3200,
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
    rating: "4/5",
    description: "Stylish and durable shoulder bag for everyday use."
  },
  {
    id: "p3",
    title: "Handbag",
    price: 2800,
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
    rating: "5/5",
    description: "Elegant and spacious handbag for daily use."
  },
  {
    id: "p4",
    title: "Men’s Wallet",
    price: 1800,
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
    rating: "4/5",
    description: "Classic brown leather wallet with multiple slots."
  }
];

const productGrid = document.getElementById("productGrid");
const cartBtn = document.querySelector(".cart-btn");

// ====== localStorage helpers ======
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const count = getCart().reduce((acc, item) => acc + (item.qty || 1), 0);
  if (cartBtn) {
    cartBtn.textContent = `Cart (${count})`;
  }
}

// ====== Render product cards ======
function renderProducts() {
  productGrid.innerHTML = ""; // clear if needed
  PRODUCTS.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <div class="product-info">
        <h4>${product.title}</h4>
        <p>${product.description}</p>
      </div>
      <div class="product-footer">
        <span class="price">Rs. ${product.price}</span>
        <span class="rating">⭐ ${product.rating}</span>
      </div>
      <div class="product-actions">
        <button class="add-btn" data-id="${product.id}">Add to Cart</button>
        <button class="buy-btn" data-id="${product.id}">Buy Now</button>
      </div>
    `;

    productGrid.appendChild(card);
  });
}

// ====== Add to cart (with qty support) ======
function addToCartByProduct(product, qty = 1) {
  if (!product) return;
  const cart = getCart();
  const existing = cart.find(i => i.id === product.id);
  if (existing) {
    existing.qty = (existing.qty || 1) + qty;
  } else {
    // clone product and include qty
    cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      description: product.description,
      rating: product.rating,
      qty: qty
    });
  }
  saveCart(cart);
}

// ====== Confirmation Modal when Add clicked ======
function openAddConfirmModal(product) {
  // create modal container
  const modal = document.createElement("div");
  modal.className = "cart-modal";
  modal.innerHTML = `
    <div class="cart-popup">
      <h3>Confirm Add to Cart</h3>
      <div class="cart-modal-item">
        <img src="${product.image}" alt="${product.title}">
        <div class="cart-modal-info">
          <h4>${product.title}</h4>
          <p>${product.description}</p>
          <p><b>Price:</b> Rs. ${product.price}</p>
        </div>
      </div>

      <div class="cart-modal-actions">
        <label>
          Quantity:
          <input type="number" class="confirm-qty" min="1" value="1" />
        </label>
        <div class="btn-row">
          <button class="confirm-add">Confirm Add</button>
          <button class="go-to-cart">Confirm & Go to Cart</button>
          <button class="cancel-add">Cancel</button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  // event listeners
  modal.querySelector(".cancel-add").addEventListener("click", () => modal.remove());

  modal.querySelector(".confirm-add").addEventListener("click", () => {
    const qtyInput = modal.querySelector(".confirm-qty");
    const qty = Math.max(1, parseInt(qtyInput.value || "1", 10));
    addToCartByProduct(product, qty);
    modal.remove();
    // small feedback
    flashMessage(`${product.title} added to cart (${qty})`);
  });

  modal.querySelector(".go-to-cart").addEventListener("click", () => {
    const qtyInput = modal.querySelector(".confirm-qty");
    const qty = Math.max(1, parseInt(qtyInput.value || "1", 10));
    addToCartByProduct(product, qty);
    // navigate to cart page
    window.location.href = "cart.html";
  });
}

// small in-page flash message
function flashMessage(text, duration = 1400) {
  const el = document.createElement("div");
  el.className = "flash-msg";
  el.textContent = text;
  document.body.appendChild(el);
  setTimeout(() => el.classList.add("visible"), 10);
  setTimeout(() => {
    el.classList.remove("visible");
    setTimeout(() => el.remove(), 350);
  }, duration);
}

// ====== Misc event listeners ======
document.addEventListener("click", (e) => {
  // Add to cart pressed
  if (e.target.matches(".add-btn")) {
    const id = e.target.dataset.id;
    const product = PRODUCTS.find(p => p.id === id);
    if (!product) return;
    openAddConfirmModal(product);
  }

  // Buy Now (simple behavior — redirect or extend later)
  if (e.target.matches(".buy-btn")) {
    const id = e.target.dataset.id;
    const product = PRODUCTS.find(p => p.id === id);
    if (!product) return;
    // quick flow: confirm then go to cart/checkout — here we add and go to cart
    openAddConfirmModal(product); // user can choose "Confirm & Go to Cart"
  }
});

// disable any JS that intercepts the header cart anchor's navigation
// (do not call e.preventDefault on .cart-btn). We only update its text.
renderProducts();
updateCartCount();
