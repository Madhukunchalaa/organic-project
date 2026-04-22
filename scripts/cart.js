var cart = JSON.parse(localStorage.getItem("vedicCart")) || [];

function updateCartUI() {
  const cartCount = document.getElementById("cart-count");
  if (cartCount) {
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.innerText = total;
    cartCount.style.transform = 'scale(1.4)';
    setTimeout(() => cartCount.style.transform = 'scale(1)', 200);
  }
}

function addToCart(product) {
  addVariantToCart({
    id: product.id,
    variantId: product.id + '-Standard',
    name: product.name,
    price: product.price,
    img: product.img,
    weightLabel: 'Standard'
  });
}

function addVariantToCart(variantItem) {
  const existing = cart.find(item => item.variantId === variantItem.variantId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...variantItem, quantity: 1 });
  }

  saveCart();
  updateCartUI();
  updateCartDisplay();
  showToast(`${variantItem.name} added to basket!`, { img: variantItem.img });

  if (typeof updateAllCardActions === 'function') updateAllCardActions();
  if (typeof updateModalActions === 'function' && window.currentModalProductId) {
    updateModalActions(window.currentModalProductId);
  }
}

function removeFromCart(variantId, elementToRemove) {
  cart = cart.filter(item => item.variantId !== variantId);
  saveCart();
  updateCartUI();

  if (elementToRemove) {
    elementToRemove.style.transition = 'all 0.3s ease';
    elementToRemove.style.transform = 'translateX(-30px)';
    elementToRemove.style.opacity = '0';
    setTimeout(() => updateCartDisplay(), 300);
  } else {
    updateCartDisplay();
  }

  if (typeof updateAllCardActions === 'function') updateAllCardActions();
  if (typeof updateModalActions === 'function' && window.currentModalProductId) {
    updateModalActions(window.currentModalProductId);
  }
}

function updateQuantity(variantId, delta) {
  updateVariantQuantity(variantId, delta);
}

function updateVariantQuantity(variantId, delta) {
  const item = cart.find(i => i.variantId === variantId);
  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) {
      removeFromCart(variantId);
    } else {
      saveCart();
      updateCartUI();
      updateCartDisplay();
      if (typeof updateAllCardActions === 'function') updateAllCardActions();
      if (typeof updateModalActions === 'function' && window.currentModalProductId) {
        updateModalActions(window.currentModalProductId);
      }
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
  const checkBtn = document.querySelector(".cart-summary-footer .btn-primary");
  const drawerContainer = document.getElementById("cart-drawer-items");
  const drawerSubtotalEle = document.getElementById("cart-drawer-subtotal");

  const fmt = (n) => `₹${n.toFixed(2)}`;
  let subtotal = 0;
  cart.forEach(item => subtotal += item.price * item.quantity);

  // Main cart page
  if (cartContainer) {
    if (cart.length === 0) {
      cartContainer.innerHTML = `
        <div class="cart-empty">
          <div class="cart-empty-icon"><i class="fas fa-shopping-basket"></i></div>
          <h3>Your basket is empty</h3>
          <p>Looks like you haven't added any organic treasures yet.</p>
          <a href="shop.html" class="btn btn-solid">Continue Shopping</a>
        </div>`;
      if (checkBtn) checkBtn.disabled = true;
    } else {
      if (checkBtn) checkBtn.disabled = false;
      cartContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
          <img src="${item.img}" alt="${item.name}" class="cart-item-img">
          <div class="cart-item-info">
            <h4>${item.name}</h4>
            <div class="cat">${item.weightLabel || ''}</div>
            <div class="unit-price">${fmt(item.price)} each</div>
          </div>
          <div class="qty-controls">
            <button class="qty-btn" onclick="updateVariantQuantity('${item.variantId}', -1)" aria-label="Decrease">−</button>
            <div class="qty-display">${item.quantity}</div>
            <button class="qty-btn" onclick="updateVariantQuantity('${item.variantId}', 1)" aria-label="Increase">+</button>
          </div>
          <div class="cart-item-total">${fmt(item.price * item.quantity)}</div>
          <button class="cart-remove-btn" onclick="removeFromCart('${item.variantId}', this.closest('.cart-item'))" aria-label="Remove">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>`).join('');
    }
    if (subtotalEle) subtotalEle.innerText = fmt(subtotal);
    if (totalEle) totalEle.innerText = fmt(subtotal);
  }

  // Slide-out drawer
  if (drawerContainer) {
    if (cart.length === 0) {
      drawerContainer.innerHTML = `
        <div class="cart-drawer-empty">
          <i class="fas fa-shopping-basket"></i>
          <h4>Your basket is empty</h4>
          <p>Discover our purely organic collection.</p>
          <a href="shop.html" class="btn btn-solid" style="padding:10px 24px;">Start Shopping</a>
        </div>`;
      const drawerFooter = document.querySelector('.cart-drawer-footer');
      if (drawerFooter) drawerFooter.style.display = 'none';
    } else {
      const drawerFooter = document.querySelector('.cart-drawer-footer');
      if (drawerFooter) drawerFooter.style.display = 'block';
      drawerContainer.innerHTML = cart.map(item => `
        <div class="cart-drawer-item">
          <img src="${item.img}" alt="${item.name}" class="cart-drawer-item-img">
          <div class="cart-drawer-item-info">
            <h4>${item.name}</h4>
            <div class="cart-drawer-item-price">${fmt(item.price)}</div>
            <div class="cart-drawer-qty-actions">
              <div class="cart-drawer-qty">
                <button onclick="updateVariantQuantity('${item.variantId}', -1)">−</button>
                <span>${item.quantity}</span>
                <button onclick="updateVariantQuantity('${item.variantId}', 1)">+</button>
              </div>
              <button class="cart-drawer-remove" onclick="removeFromCart('${item.variantId}')">Remove</button>
            </div>
          </div>
        </div>`).join('');
    }
    if (drawerSubtotalEle) drawerSubtotalEle.innerText = fmt(subtotal);
  }
}

// ── Cart Drawer ──
function openCartDrawer() {
  const backdrop = document.getElementById('cart-drawer-backdrop');
  const panel = document.getElementById('cart-drawer');
  if (backdrop) backdrop.classList.add('active');
  if (panel) panel.classList.add('open');
  document.body.style.overflow = 'hidden';
  updateCartDisplay();
}

function closeCartDrawer() {
  const backdrop = document.getElementById('cart-drawer-backdrop');
  const panel = document.getElementById('cart-drawer');
  if (backdrop) backdrop.classList.remove('active');
  if (panel) panel.classList.remove('open');
  document.body.style.overflow = '';
}

// ── Toast ──
function showToast(message, options = {}) {
  const { img, type = 'success' } = options;
  const accent = type === 'error' ? '#c0714f' : '#ACC555';
  const bg     = type === 'error' ? '#6b3a22' : '#2e3b1f';

  const label = img
    ? `<div style="font-weight:600;font-size:0.75rem;opacity:0.7;letter-spacing:0.5px;margin-bottom:3px;">ADDED TO BASKET</div>
       <div style="font-size:0.9rem;">${message.replace(' added to basket!', '')}</div>`
    : `<div style="font-size:0.9rem;">${message}</div>`;

  const imgHtml = img
    ? `<img src="${img}" style="width:44px;height:44px;border-radius:8px;object-fit:cover;flex-shrink:0;margin-right:12px;">`
    : `<i class="fas fa-check-circle" style="font-size:1.1rem;color:${accent};margin-right:10px;flex-shrink:0;"></i>`;

  Toastify({
    text: `<div style="display:flex;align-items:center;">${imgHtml}<div>${label}</div></div>`,
    escapeMarkup: false,
    duration: 3000,
    gravity: 'bottom',
    position: 'right',
    stopOnFocus: true,
    style: {
      background: bg,
      borderRadius: '12px',
      padding: '12px 18px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
      borderLeft: `4px solid ${accent}`,
      fontFamily: 'Inter, sans-serif',
      color: '#fff',
      maxWidth: '340px',
    },
  }).showToast();
}

// ── Theme ──
function toggleTheme() {
  const isDark = document.body.classList.toggle('dark');
  localStorage.setItem('theme-ShaliniDevi', isDark ? 'dark' : 'light');
  const icon = document.getElementById('theme-icon');
  if (icon) icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
}

// ── Checkout Flow ──
function initCheckout() {
  if (cart.length === 0) {
    showToast('Add some treasures to your basket first!');
    return;
  }
  const mainWrapper = document.getElementById('cart-main-wrapper');
  const checkoutSec = document.getElementById('checkout-section');
  if (mainWrapper) {
    mainWrapper.style.opacity = '0';
    mainWrapper.style.transition = 'opacity 0.3s ease';
    setTimeout(() => {
      mainWrapper.style.display = 'none';
      if (checkoutSec) {
        checkoutSec.style.display = 'grid';
        void checkoutSec.offsetWidth;
        checkoutSec.style.opacity = '1';
      }
    }, 300);
  }
}

function cancelCheckout() {
  const mainWrapper = document.getElementById('cart-main-wrapper');
  const checkoutSec = document.getElementById('checkout-section');
  if (checkoutSec) {
    checkoutSec.style.opacity = '0';
    setTimeout(() => {
      checkoutSec.style.display = 'none';
      if (mainWrapper) {
        mainWrapper.style.display = 'grid';
        void mainWrapper.offsetWidth;
        mainWrapper.style.opacity = '1';
      }
    }, 300);
  }
}

function placeOrder(e) {
  if (e) e.preventDefault();
  // Validate form
  const name = document.getElementById('fullname')?.value.trim();
  const email = document.getElementById('email')?.value.trim();
  if (!name || !email) { showToast('Please fill in all required fields.'); return; }

  const checkoutSec = document.getElementById('checkout-section');
  const paymentOverlay = document.getElementById('payment-overlay');

  if (checkoutSec) {
    checkoutSec.style.opacity = '0';
    setTimeout(() => {
      checkoutSec.style.display = 'none';
      if (paymentOverlay) {
        paymentOverlay.style.display = 'flex';
        void paymentOverlay.offsetWidth;
        paymentOverlay.classList.add('active');
        startPaymentAnimation();
      }
    }, 300);
  }
}

function startPaymentAnimation() {
  const steps = [
    { id: 'pay-step-1', delay: 0 },
    { id: 'pay-step-2', delay: 1400 },
    { id: 'pay-step-3', delay: 2800 },
  ];

  steps.forEach(({ id, delay }) => {
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.classList.add('active');
    }, delay);
  });

  // Show success
  setTimeout(() => {
    const paymentOverlay = document.getElementById('payment-overlay');
    const successScreen = document.getElementById('order-success');
    if (paymentOverlay) {
      paymentOverlay.style.opacity = '0';
      setTimeout(() => {
        paymentOverlay.style.display = 'none';
        if (successScreen) {
          successScreen.style.display = 'flex';
          void successScreen.offsetWidth;
          successScreen.classList.add('active');
        }
      }, 400);
    }
    // Clear cart
    cart = [];
    saveCart();
    updateCartUI();
  }, 4800);
}

// ── Nav Drawer ──
function openDrawer() {
  const drawer = document.getElementById('nav-drawer');
  if (drawer) drawer.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeDrawer() {
  const drawer = document.getElementById('nav-drawer');
  if (drawer) drawer.classList.remove('open');
  document.body.style.overflow = '';
}

// ── Init ──
document.addEventListener('DOMContentLoaded', () => {
  updateCartUI();
  updateCartDisplay();
  const savedTheme = localStorage.getItem('theme-ShaliniDevi');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    const icon = document.getElementById('theme-icon');
    if (icon) icon.className = 'fas fa-sun';
  }
});
