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
    cartContainer.innerHTML =
      '<p style="padding: 40px; text-align: center; opacity: 0.5;">Your basket is currently empty.</p>';
    if (subtotalEle) subtotalEle.innerText = "₹0.00";
    if (totalEle) totalEle.innerText = "₹0.00";
    return;
  }

  let html = "";
  let subtotal = 0;

  cart.forEach((item) => {
    subtotal += item.price * item.quantity;
    html += `
      <div style="display: flex; align-items: center; gap: 20px; background: var(--bg-white); padding: 20px; border-radius: var(--radius); margin-bottom: 20px; box-shadow: var(--shadow-sm);">
        <img src="${item.img}" alt="${item.name}" style="width: 100px; height: 100px; object-fit: cover; border-radius: 8px;">
        <div style="flex: 1;">
          <h4 style="margin-bottom: 5px;">${item.name}</h4>
          <p style="color: var(--primary); font-weight: 600;">₹${item.price.toFixed(2)}</p>
        </div>
        <div style="display: flex; align-items: center; gap: 15px;">
          <button onclick="updateQuantity(${item.id}, -1)" style="border: 1px solid rgba(0,0,0,0.1); background: none; width: 30px; height: 30px; border-radius: 50%; cursor: pointer;">-</button>
          <span>${item.quantity}</span>
          <button onclick="updateQuantity(${item.id}, 1)" style="border: 1px solid rgba(0,0,0,0.1); background: none; width: 30px; height: 30px; border-radius: 50%; cursor: pointer;">+</button>
        </div>
        <div style="font-weight: 600; width: 100px; text-align: right;">
          ₹${(item.price * item.quantity).toFixed(2)}
        </div>
        <button onclick="removeFromCart(${item.id})" style="border: none; background: none; color: #ff4d4d; cursor: pointer; padding: 10px;">
          <i class="fas fa-trash"></i>
        </button>
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
        showToast("Add some treasures to your basket first!");
        return;
    }

    // Hide cart UI
    if (cartItems) cartItems.style.display = 'none';
    if (cartSummary) cartSummary.style.display = 'none';

    // Show Checkout Form
    const checkoutSec = document.getElementById('checkout-section');
    if (checkoutSec) checkoutSec.classList.add('active');
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
    const checkoutSec = document.getElementById('checkout-section');
    const deliveryAnim = document.getElementById('delivery-animation');
    
    if (checkoutSec) checkoutSec.classList.remove('active');
    if (deliveryAnim) deliveryAnim.classList.add('active');

    startTruckAnimation();
}

function startTruckAnimation() {
    const truck = document.getElementById('delivery-truck');
    const status = document.getElementById('status-label');
    const track = document.querySelector('.track-container');

    const steps = [
        { label: "Authenticating Premium Payment...", delay: 0 },
        { label: "Traditional Vedic Packaging...", delay: 1500 },
        { label: "Goods Collected and Dispatched!", delay: 3000 },
        { label: "Your order is on the way to you!", delay: 4500 }
    ];

    steps.forEach(step => {
        setTimeout(() => {
            if (status) status.innerText = step.label;
            
            // At the collection step, fly some goods into the truck
            if (step.label.includes("Collected")) {
                flyGoodsIntoTruck(track, truck);
            }

            // Start truck movement
            if (step.label.includes("way")) {
                if (truck) truck.classList.add('driving');
            }
        }, step.delay);
    });

    // Success Screen
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
                    <a href="index.html" class="btn">Return to Estate</a>
                </div>
            `;
        }
        // Clear cart
        cart = [];
        saveCart();
        updateCartUI();
    }, 8000);
}

function flyGoodsIntoTruck(track, truck) {
    if (!track || !truck) return;
    
    for (let i = 0; i < Math.min(cart.length, 5); i++) {
        setTimeout(() => {
            const icon = document.createElement('i');
            icon.className = `fas fa-leaf cargo-icon`;
            icon.style.left = '10%';
            icon.style.top = '20%';
            track.appendChild(icon);

            // Animate to truck
            setTimeout(() => {
                const truckPos = truck.getBoundingClientRect();
                const trackPos = track.getBoundingClientRect();
                
                icon.style.opacity = '1';
                icon.style.left = '50%';
                icon.style.top = '50%';
                icon.style.transform = 'scale(0.5)';
                
                setTimeout(() => icon.remove(), 800);
            }, 50);
        }, i * 300);
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
