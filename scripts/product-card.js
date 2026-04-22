/**
 * Product Card Renderer — shared across index.html & shop.html
 * Features: Weight variants · ADD→Stepper · Validation · Dynamic pricing · Modal
 */

// ── Card state store (keyed by product id + context: 'featured' | 'shop')
const cardState = {};

function getCardState(id, ctx) {
    const key = `${ctx}-${id}`;
    if (!cardState[key]) {
        cardState[key] = { selectedWeight: null, quantity: 0, added: false };
    }
    return cardState[key];
}

// ── Dynamic price calculation
function calcPrice(basePrice, weightLabel) {
    if (!weightLabel) return null;
    const variant = WEIGHT_VARIANTS.find(v => v.label === weightLabel);
    if (!variant) return basePrice;
    return Math.round(basePrice * variant.multiplier);
}

// ── Build a card's HTML (fully self-contained)
function buildProductCard(product, index, ctx) {
    const staggerClass = `stagger-${(index % 4) + 1}`;
    const safeNameJs = product.name.replace(/'/g, "\\'");
    const productJson = JSON.stringify({
        id: product.id, name: product.name, img: product.img, priceNumeric: product.priceNumeric
    }).replace(/'/g, "\\'");

    return `
    <div class="product-card reveal ${staggerClass}" id="card-${ctx}-${product.id}" onclick="openProductModal(${product.id})" style="cursor:pointer">
      <button class="product-wishlist" onclick="event.stopPropagation(); toggleWishlist(this)" aria-label="Add to wishlist">
        <i class="far fa-heart"></i>
      </button>

      <div class="product-image-container">
        <img src="${product.img}" alt="${product.name}" class="product-img" loading="lazy" />
      </div>

      <div class="product-info">
        <span class="product-category-badge">${product.category}</span>
        <h3>${product.name}</h3>

        <div class="product-rating">
          <span class="stars">★★★★★</span>
          <span class="rating-count">(${Math.floor(Math.random() * 80) + 20})</span>
        </div>

        <!-- Weight Selection -->
        <div class="weight-selector" id="weights-${ctx}-${product.id}" onclick="event.stopPropagation()">
          ${WEIGHT_VARIANTS.map(v => `
            <button
              class="weight-chip"
              data-ctx="${ctx}"
              data-id="${product.id}"
              data-weight="${v.label}"
              data-price="${calcPrice(product.priceNumeric, v.label)}"
              onclick="event.stopPropagation(); selectWeight(this, ${product.id}, '${ctx}', '${safeNameJs}', '${product.img}')"
            >${v.label}</button>
          `).join('')}
        </div>

        <!-- Validation message -->
        <div class="weight-error" id="werr-${ctx}-${product.id}" style="display:none">
          <i class="fas fa-exclamation-circle"></i> Please select a weight
        </div>

        <div class="product-meta" onclick="event.stopPropagation()">
          <span class="price" id="price-${ctx}-${product.id}">From ₹${product.priceNumeric}</span>

          <!-- ADD button / Stepper toggle -->
          <div class="card-action-area" id="action-${ctx}-${product.id}">
            <button
              class="add-btn"
              id="addbtn-${ctx}-${product.id}"
              onclick="event.stopPropagation(); handleAddClick(${product.id}, '${ctx}', '${safeNameJs}', '${product.img}')"
              aria-label="Add ${product.name} to cart"
            >ADD</button>
            <div class="qty-stepper" id="stepper-${ctx}-${product.id}" style="display:none">
              <button class="stepper-btn" onclick="event.stopPropagation(); stepperChange(${product.id}, '${ctx}', -1, '${safeNameJs}', '${product.img}')">−</button>
              <span class="stepper-qty" id="sqty-${ctx}-${product.id}">1</span>
              <button class="stepper-btn" onclick="event.stopPropagation(); stepperChange(${product.id}, '${ctx}', 1, '${safeNameJs}', '${product.img}')">+</button>
            </div>
          </div>
        </div>
      </div>
    </div>`;
}

// ── Weight chip click handler
function selectWeight(btn, id, ctx, name, img) {
    const container = document.getElementById(`weights-${ctx}-${id}`);
    container.querySelectorAll('.weight-chip').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');

    const weight = btn.dataset.weight;
    const price  = parseInt(btn.dataset.price);

    const state = getCardState(id, ctx);
    state.selectedWeight = weight;

    // Hide error
    const err = document.getElementById(`werr-${ctx}-${id}`);
    if (err) err.style.display = 'none';

    // Update price display
    document.getElementById(`price-${ctx}-${id}`).textContent = `₹${price.toLocaleString('en-IN')}.00`;

    // If stepper already visible, keep cart in sync (price changed)
    if (state.added) {
        syncCartItem(id, ctx, name, img, price, state.quantity);
    }
}

// ── ADD button click
function handleAddClick(id, ctx, name, img) {
    const state = getCardState(id, ctx);

    // Validation: weight must be selected
    if (!state.selectedWeight) {
        const err = document.getElementById(`werr-${ctx}-${id}`);
        if (err) {
            err.style.display = 'flex';
            // Shake animation
            const card = document.getElementById(`card-${ctx}-${id}`);
            card.classList.add('shake');
            setTimeout(() => card.classList.remove('shake'), 500);
        }
        return;
    }

    state.quantity = 1;
    state.added = true;

    // Switch UI: hide ADD, show stepper
    const addBtn     = document.getElementById(`addbtn-${ctx}-${id}`);
    const stepper    = document.getElementById(`stepper-${ctx}-${id}`);
    const sqty       = document.getElementById(`sqty-${ctx}-${id}`);

    addBtn.style.transform   = 'scale(0.8)';
    addBtn.style.opacity     = '0';
    setTimeout(() => {
        addBtn.style.display  = 'none';
        stepper.style.display = 'flex';
        sqty.textContent      = '1';
        stepper.style.opacity = '0';
        stepper.style.transform = 'scale(0.8)';
        requestAnimationFrame(() => {
            stepper.style.transition = 'all 0.2s var(--ease)';
            stepper.style.opacity    = '1';
            stepper.style.transform  = 'scale(1)';
        });
    }, 180);

    // Add to cart
    const chip  = document.querySelector(`#weights-${ctx}-${id} .weight-chip.active`);
    const price = chip ? parseInt(chip.dataset.price) : null;

    addVariantToCart({
        id:        id,
        variantId: `${id}-${state.selectedWeight}`,
        name:      `${name} (${state.selectedWeight})`,
        price:     price,
        img:       img,
        weightLabel: state.selectedWeight
    });
}

// ── Stepper: + / –
function stepperChange(id, ctx, delta, name, img) {
    const state = getCardState(id, ctx);
    const newQty = (state.quantity || 1) + delta;

    if (newQty <= 0) {
        // Reset back to ADD button
        state.quantity     = 0;
        state.added        = false;

        const addBtn  = document.getElementById(`addbtn-${ctx}-${id}`);
        const stepper = document.getElementById(`stepper-${ctx}-${id}`);

        stepper.style.opacity   = '0';
        stepper.style.transform = 'scale(0.8)';
        setTimeout(() => {
            stepper.style.display  = 'none';
            addBtn.style.display   = 'flex';
            addBtn.style.transition = 'all 0.2s var(--ease)';
            requestAnimationFrame(() => {
                addBtn.style.transform = 'scale(1)';
                addBtn.style.opacity   = '1';
            });
        }, 180);

        // Remove from cart
        const cartItemId = `${id}-${state.selectedWeight}`;
        cart = cart.filter(i => i.id !== cartItemId);
        saveCart();
        updateCartUI();
        updateCartDisplay();
        return;
    }

    state.quantity = newQty;
    document.getElementById(`sqty-${ctx}-${id}`).textContent = newQty;

    // Update cart quantity
    const chip  = document.querySelector(`#weights-${ctx}-${id} .weight-chip.active`);
    const price = chip ? parseInt(chip.dataset.price) : null;
    syncCartItem(`${id}-${state.selectedWeight}`, ctx, `${name} (${state.selectedWeight})`, img, price, newQty);
}

// ── Keep cart item perfectly in sync
function syncCartItem(cartId, ctx, name, img, price, quantity) {
    const existing = cart.find(i => i.id === cartId);
    if (existing) {
        existing.quantity = quantity;
        existing.price    = price;
        existing.name     = name;
    }
    saveCart();
    updateCartUI();
    updateCartDisplay();
}

// ────────────────────────────────────────────
// PRODUCT DETAILS MODAL
// ────────────────────────────────────────────
function openProductModal(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const ingredients = (product.ingredients || []).join(', ') || 'N/A';
    const nutrition   = product.nutrition || {};
    const nutRows = Object.entries(nutrition).map(([k, v]) => `
        <tr><td>${k}</td><td><strong>${v}</strong></td></tr>
    `).join('') || '<tr><td colspan="2">Not specified</td></tr>';

    const weightOptions = WEIGHT_VARIANTS.map(v => `
        <button class="weight-chip modal-weight-chip"
            data-weight="${v.label}"
            data-price="${calcPrice(product.priceNumeric, v.label)}"
            onclick="modalSelectWeight(this, ${product.id})">
            ${v.label}
        </button>
    `).join('');

    document.getElementById('product-modal-content').innerHTML = `
        <div class="modal-img-wrap">
            <img src="${product.img}" alt="${product.name}" />
        </div>
        <div class="modal-body">
            <span class="product-category-badge" style="margin-bottom:12px; display:inline-block;">${product.category}</span>
            <h2>${product.name}</h2>
            <div class="product-rating" style="margin-bottom:16px;">
                <span class="stars">★★★★★</span>
                <span class="rating-count">(${Math.floor(Math.random() * 80) + 20} reviews)</span>
            </div>

            <div class="modal-ingredients">
                <h4><i class="fas fa-leaf"></i> Ingredients</h4>
                <p>${ingredients}</p>
            </div>

            ${Object.keys(nutrition).length > 0 ? `
            <div class="modal-nutrition">
                <h4><i class="fas fa-chart-bar"></i> Nutritional Info <small>(per 100g)</small></h4>
                <table class="nutrition-table"><tbody>${nutRows}</tbody></table>
            </div>` : ''}

            <div class="modal-weight-select">
                <h4><i class="fas fa-weight-hanging"></i> Select Weight</h4>
                <div class="weight-selector" id="modal-weights-${product.id}">${weightOptions}</div>
                <div class="weight-error" id="modal-werr-${product.id}" style="display:none">
                    <i class="fas fa-exclamation-circle"></i> Please select a weight
                </div>
            </div>

            <div class="modal-price-row">
                <span class="modal-price" id="modal-price-${product.id}">From ₹${product.priceNumeric}</span>
                <button class="btn btn-primary modal-add-btn" onclick="modalAddToCart(${product.id}, '${product.name.replace(/'/g,"\\'")}', '${product.img}')">
                    <i class="fas fa-shopping-basket"></i> Add to Basket
                </button>
            </div>
        </div>
    `;

    const overlay = document.getElementById('product-modal-overlay');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function modalSelectWeight(btn, productId) {
    const container = document.getElementById(`modal-weights-${productId}`);
    container.querySelectorAll('.modal-weight-chip').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    const price = btn.dataset.price;
    document.getElementById(`modal-price-${productId}`).textContent = `₹${parseInt(price).toLocaleString('en-IN')}.00`;
    const err = document.getElementById(`modal-werr-${productId}`);
    if (err) err.style.display = 'none';
}

function modalAddToCart(productId, name, img) {
    const container = document.getElementById(`modal-weights-${productId}`);
    const activeChip = container ? container.querySelector('.modal-weight-chip.active') : null;
    const err = document.getElementById(`modal-werr-${productId}`);

    if (!activeChip) {
        if (err) err.style.display = 'flex';
        return;
    }

    const weight = activeChip.dataset.weight;
    const price  = parseInt(activeChip.dataset.price);

    addVariantToCart({
        id:          productId,
        variantId:   `${productId}-${weight}`,
        name:        `${name} (${weight})`,
        price:       price,
        img:         img,
        weightLabel: weight
    });

    closeProductModal();
    setTimeout(() => openCartDrawer(), 300);
}

function closeProductModal() {
    const overlay = document.getElementById('product-modal-overlay');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Close on backdrop click
document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('product-modal-overlay');
    if (overlay) {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeProductModal();
        });
    }

    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeProductModal();
    });
});
