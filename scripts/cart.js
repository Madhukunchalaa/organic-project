// Cart Management logic
let cart = JSON.parse(localStorage.getItem("vedicCart")) || [];

function updateCartUI() {
  const cartCount = document.getElementById("cart-count");
  if (cartCount) {
    cartCount.innerText = cart.reduce(
      (total, item) => total + item.quantity,
      0,
    );
  }
}

function addToCart(product, sourceElement) {
  const existingItem = cart.find((item) => item.id === product.id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart();
  
  if (sourceElement) {
      triggerFlyAnimation(sourceElement);
  } else {
      updateCartUI();
      showToast(`${product.name} added to basket!`);
  }
}

function addVariantToCart(variantItem, sourceElement) {
  const existingItem = cart.find((item) => item.variantId === variantItem.variantId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...variantItem, quantity: 1 });
  }

  saveCart();
  
  if (sourceElement) {
      triggerFlyAnimation(sourceElement);
  } else {
      updateCartUI();
      showToast(`${variantItem.name} added to basket!`);
  }
  
  // Custom event for UI sync
  document.dispatchEvent(new CustomEvent('cartUpdated'));
}

function updateVariantQuantity(variantId, delta) {
  const item = cart.find((i) => i.variantId === variantId);
  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) {
      cart = cart.filter((i) => i.variantId !== variantId);
    }
    saveCart();
    updateCartUI();
    updateCartDisplay();
    document.dispatchEvent(new CustomEvent('cartUpdated'));
  }
}

function triggerFlyAnimation(button) {
    const card = button.closest('.product-card');
    const img = card.querySelector('.product-img');
    const cartIcon = document.querySelector('.cart-icon');
    
    if (!img || !cartIcon) return;

    const imgRect = img.getBoundingClientRect();
    const cartRect = cartIcon.getBoundingClientRect();

    // Create clone
    const clone = img.cloneNode();
    clone.className = 'flying-image';
    clone.style.top = `${imgRect.top}px`;
    clone.style.left = `${imgRect.left}px`;
    clone.style.width = `${imgRect.width}px`;
    clone.style.height = `${imgRect.height}px`;
    
    document.body.appendChild(clone);

    // Start animation
    setTimeout(() => {
        clone.style.top = `${cartRect.top}px`;
        clone.style.left = `${cartRect.left}px`;
        clone.style.width = '20px';
        clone.style.height = '20px';
        clone.style.opacity = '0';
    }, 10);

    clone.addEventListener('transitionend', () => {
        clone.remove();
        
        // Update UI and show feedback after landing
        updateCartUI();
        cartIcon.classList.add('bump');
        setTimeout(() => cartIcon.classList.remove('bump'), 500);
    });
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  saveCart();
  updateCartUI();
  updateCartDisplay();
}

function updateQuantity(productId, delta) {
  const item = cart.find((i) => i.id === productId);
  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) {
      removeFromCart(productId);
    } else {
      saveCart();
      updateCartUI();
      updateCartDisplay();
    }
  }
}

function saveCart() {
  localStorage.setItem("vedicCart", JSON.stringify(cart));
}

function updateCartDisplay() {
  const cartContainer = document.getElementById("cart-items");
  const subtotalEle = document.getElementById("cart-subtotal");
  const totalEle = document.getElementById("cart-total");

  if (!cartContainer) return;

  if (cart.length === 0) {
    cartContainer.innerHTML = `
      <div class="empty-cart-state">
        <i class="fas fa-shopping-basket"></i>
        <p>Your basket is currently empty.</p>
        <a href="shop.html" class="btn btn-primary">Explore The Collection</a>
      </div>
    `;
    if (subtotalEle) subtotalEle.innerText = "₹0.00";
    if (totalEle) totalEle.innerText = "₹0.00";
    return;
  }

  let html = "";
  let subtotal = 0;

  cart.forEach((item) => {
    subtotal += item.price * item.quantity;
    
    // Safety check for weight variant. If the item in cart doesn't have a weight recorded, default to 500g
    const itemWeight = item.weight || '500g';

    html += `
      <div class="premium-cart-item" id="cart-item-${item.id}">
        <img src="${item.img}" alt="${item.name}">
        
        <div class="premium-cart-item-details">
          <div class="premium-cart-item-title">${item.name}</div>
          <div class="premium-cart-item-meta">
            Harvest Quantity: <strong>${itemWeight}</strong>
          </div>
          <div class="premium-cart-item-price">₹${item.price.toFixed(2)}</div>
          
          <div class="premium-cart-item-actions">
            <div class="qty-stepper">
              <button class="stepper-btn" onclick="updateQuantity(${item.id}, -1, '${itemWeight}')">-</button>
              <div class="stepper-qty">${item.quantity}</div>
              <button class="stepper-btn" onclick="updateQuantity(${item.id}, 1, '${itemWeight}')">+</button>
            </div>
            
            <button class="remove-btn-premium" onclick="removeFromCart(${item.id}, '${itemWeight}')">
              <i class="fas fa-trash"></i> Remove
            </button>
          </div>
        </div>
        
        <div style="font-weight: 800; font-size: 1.2rem; color: var(--primary); align-self: center;">
          ₹${(item.price * item.quantity).toFixed(2)}
        </div>
      </div>
    `;
  });

  cartContainer.innerHTML = html;
  if (subtotalEle) subtotalEle.innerText = `₹${subtotal.toFixed(2)}`;
  if (totalEle) totalEle.innerText = `₹${subtotal.toFixed(2)}`;
}

function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<i class="fas fa-check-circle" style="margin-right: 10px; color: var(--accent);"></i> ${message}`;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("show");
  }, 100);

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

// Styles for toast
const toastStyles = `
.toast {
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: var(--primary);
    color: white;
    padding: 16px 32px;
    border-radius: 50px;
    box-shadow: var(--shadow-lg);
    transform: translateY(120px);
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 2000;
    font-weight: 600;
    display: flex;
    align-items: center;
}
.toast.show {
    transform: translateY(0);
}
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = toastStyles;
document.head.appendChild(styleSheet);

// Theme Management
function initTheme() {
  const savedTheme = localStorage.getItem("theme") || "light";
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    updateThemeIcon("dark");
  }
}

function toggleTheme() {
  const isDark = document.body.classList.toggle("dark");
  const theme = isDark ? "dark" : "light";
  localStorage.setItem("theme", theme);
  updateThemeIcon(theme);
}

function updateThemeIcon(theme) {
  const icon = document.getElementById("theme-icon");
  if (icon) {
    icon.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon";
  }
}

// Checkout Logic
function initCheckout() {
    const cartSummary = document.querySelector('.cart-summary');
    const cartItems = document.getElementById('cart-items');
    
    if (cart.length === 0) {
        showToast("Your basket is empty.");
        return;
    }
    const summary = document.getElementById('cart-summary');
    const checkoutSec = document.getElementById('checkout-section');
    
    if (summary) summary.style.display = 'none';
    if (checkoutSec) {
        checkoutSec.style.display = 'block';
        // Scroll to the checkout form smoothly
        checkoutSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function placeOrder(e) {
    if (e) e.preventDefault();

    // Validation
    const name = document.getElementById('fullname').value;
    const address = document.getElementById('address').value;
    if (!name || !address) {
        showToast("Please provide delivery details.");
        return;
    }

    // Transition to Animation
    const cartLayout = document.querySelector('.cart-layout');
    const deliveryAnim = document.getElementById('delivery-animation');
    
    if (cartLayout) cartLayout.style.display = 'none';
    if (deliveryAnim) deliveryAnim.classList.add('active');

    startTruckAnimation();
}

function startTruckAnimation() {
    const truck = document.getElementById('delivery-truck');
    const status = document.getElementById('status-label');

    // Reset classes
    if (truck) {
        truck.classList.remove('entering', 'exiting');
        // Force reflow
        void truck.offsetWidth; 
    }

    // 1. Truck enters slowly (0s)
    if (status) status.innerText = "Dispatching Delivery Vehicle...";
    if (truck) truck.classList.add('entering');

    // 2. Load goods from navbar cart icon (3s)
    setTimeout(() => {
        if (status) status.innerText = "Loading Your Organic Treasures...";
        flyGoodsIntoTruck(truck);
    }, 3000);

    // 3. Truck speeds away (5.5s)
    setTimeout(() => {
        if (status) status.innerText = "Your order is on the way to you!";
        if (truck) {
            truck.classList.remove('entering');
            truck.classList.add('exiting');
        }
    }, 5500);

    // 4. Success Screen (7.5s)
    setTimeout(() => {
        const deliveryAnim = document.getElementById('delivery-animation');
        if (deliveryAnim) {
            deliveryAnim.innerHTML = `
                <div style="animation: fadeIn 1s ease-out;">
                    <i class="fas fa-check-circle" style="font-size: 5rem; color: var(--accent); margin-bottom: 25px;"></i>
                    <h2 style="font-size: 3rem; margin-bottom: 20px;">Order Confirmed!</h2>
                    <p style="font-size: 1.2rem; opacity: 0.7; max-width: 500px; margin: 0 auto 40px;">
                        Your treasures have been dispatched from our estate. 
                        Estimated arrival: <strong>2-3 traditional harvest days</strong>.
                    </p>
                    <a href="index.html" class="btn btn-primary">Return to Estate</a>
                </div>
            `;
        }
        // Clear cart
        cart = [];
        saveCart();
        updateCartUI();
    }, 7500);
}

function flyGoodsIntoTruck(truck) {
    const cartIcon = document.querySelector('.cart-icon');
    if (!cartIcon || !truck) return;

    // Get starting position (Navbar Cart Icon)
    const cartPos = cartIcon.getBoundingClientRect();
    const startX = cartPos.left + (cartPos.width / 2);
    const startY = cartPos.top + (cartPos.height / 2);

    const itemsToFly = Math.min(cart.length, 5) || 3; // Fallback to 3 if cart is empty for some reason

    for (let i = 0; i < itemsToFly; i++) {
        setTimeout(() => {
            const icon = document.createElement('i');
            icon.className = `fas fa-leaf cargo-icon`;
            // Start at navbar icon
            icon.style.left = `${startX}px`;
            icon.style.top = `${startY}px`;
            document.body.appendChild(icon);

            // Animate to truck's current position
            setTimeout(() => {
                const truckPos = truck.getBoundingClientRect();
                const targetX = truckPos.left + (truckPos.width / 2);
                const targetY = truckPos.top + (truckPos.height / 2);
                
                icon.style.opacity = '1';
                icon.style.left = `${targetX}px`;
                icon.style.top = `${targetY}px`;
                icon.style.transform = 'scale(0.5) rotate(360deg)';
                
                setTimeout(() => icon.remove(), 1000);
            }, 50);
        }, i * 400); // 400ms between each item
    }
}

// Initialize UI
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  updateCartUI();
  if (document.getElementById("cart-items")) {
    updateCartDisplay();
  }
});
