// State to track active weights on cards
window.cardActiveWeights = {};

function formatMoney(amount) {
    return '₹' + amount.toFixed(2);
}

function generateCardHTML(product, i) {
    // Default weight is 250g or generic base
    const startWeight = '250g';
    if (!window.cardActiveWeights[product.id]) {
        window.cardActiveWeights[product.id] = {
            label: startWeight,
            multiplier: 1
        };
    }

    const currentWeightInfo = window.cardActiveWeights[product.id];
    const currentPrice = product.priceNumeric * currentWeightInfo.multiplier;
    
    // Check if category uses weights
    const noWeightCategories = ['Combos', 'Wellness'];
    const usesWeights = !noWeightCategories.includes(product.category);

    return `
    <div class="product-card reveal stagger-${(i % 4) + 1}" id="product-card-${product.id}" onclick="openProductModal(${product.id})" style="cursor:pointer">
      <button class="product-wishlist" onclick="event.stopPropagation(); toggleWishlist(this)" aria-label="Add to wishlist">
        <i class="far fa-heart"></i>
      </button>
      <div class="product-image-container">
        <img src="${product.img}" alt="${product.name}" class="product-img" loading="lazy" />
      </div>
      <div class="product-info">
        <h3>${product.name}</h3>

        <div onclick="event.stopPropagation()" style="margin-top: auto;">
          ${usesWeights ? `
          <div class="weight-selector" id="weight-selector-${product.id}" style="gap:4px; margin-bottom:4px;">
             ${WEIGHT_VARIANTS.map(w => `
                <button class="weight-chip ${w.label === currentWeightInfo.label ? 'active' : ''}"
                        onclick="event.stopPropagation(); changeCardWeight(${product.id}, '${w.label}', ${w.multiplier})"
                        style="padding:2px 7px; font-size:0.65rem;">
                    ${w.label}
                </button>
             `).join('')}
          </div>` : ''}
          <div class="product-meta">
              <span class="price" id="card-price-${product.id}">${formatMoney(currentPrice)}</span>
              <div id="card-action-${product.id}" class="card-action-area">
                  <!-- Rendered by updateCardActions -->
              </div>
          </div>
        </div>
      </div>
    </div>
    `;
}

function changeCardWeight(productId, weightLabel, multiplier) {
    window.cardActiveWeights[productId] = { label: weightLabel, multiplier: multiplier };
    
    // Update active chip
    const selector = document.getElementById(`weight-selector-${productId}`);
    if (selector) {
        const chips = selector.querySelectorAll('.weight-chip');
        chips.forEach(chip => {
            if (chip.innerText.trim() === weightLabel) {
                chip.classList.add('active');
            } else {
                chip.classList.remove('active');
            }
        });
    }

    // Update Price
    const product = PRODUCTS.find(p => p.id === productId);
    const priceEle = document.getElementById(`card-price-${productId}`);
    if (product && priceEle) {
        const newPrice = product.priceNumeric * multiplier;
        priceEle.innerText = formatMoney(newPrice);
        
        // Add a subtle bump animation
        priceEle.classList.remove('shake');
        void priceEle.offsetWidth;
        priceEle.classList.add('shake');
    }

    // Update Card Actions (Add button vs Stepper)
    updateCardActions(productId);
}

// Ensure this is called when DOM loads or Cart updates
function updateAllCardActions() {
    PRODUCTS.forEach(p => updateCardActions(p.id));
}

// Hook into cart.js if you want this globally triggered
function getCartItem(productId, weightLabel) {
    if (!window.cart) return null;
    const variantId = productId + '-' + weightLabel;
    return window.cart.find(item => item.variantId === variantId);
}

function updateCardActions(productId) {
    const actionContainer = document.getElementById(`card-action-${productId}`);
    if (!actionContainer) return;

    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    let weightLabel = 'Base';
    let multiplier = 1;
    
    if (window.cardActiveWeights[productId]) {
        weightLabel = window.cardActiveWeights[productId].label;
        multiplier = window.cardActiveWeights[productId].multiplier;
    }

    // Category overrides
    const noWeightCategories = ['Combos', 'Wellness'];
    if (noWeightCategories.includes(product.category)) {
        weightLabel = 'Standard';
        multiplier = 1;
    }

    const priceNum = product.priceNumeric * multiplier;
    const cartItem = getCartItem(productId, weightLabel);

    if (cartItem && cartItem.quantity > 0) {
        // Show Stepper
        actionContainer.innerHTML = `
            <div class="qty-stepper">
              <button class="stepper-btn" onclick="event.stopPropagation(); cardStepperUpdate(${productId}, '${weightLabel}', -1)" aria-label="Decrease quantity">-</button>
              <div class="stepper-qty">${cartItem.quantity}</div>
              <button class="stepper-btn" onclick="event.stopPropagation(); cardStepperUpdate(${productId}, '${weightLabel}', 1)" aria-label="Increase quantity">+</button>
            </div>
        `;
    } else {
        const safeName = product.name.replace(/'/g, "\\'");

        actionContainer.innerHTML = `
            <button class="add-btn" onclick="event.stopPropagation(); handleCardAdd(${productId}, '${safeName}', ${priceNum}, '${product.img}', '${weightLabel}', this)" aria-label="Add ${product.name} to cart">
                <i class="fas fa-plus"></i> <span style="margin-left: 6px;">Add</span>
            </button>
        `;
    }
}

function handleCardAdd(id, name, price, img, weight, btn) {
    // Call cart.js addToCart variant style
    const variantItem = {
        id: id,
        variantId: id + '-' + weight,
        name: name + (weight && weight !== 'Standard' ? ` (${weight})` : ''),
        price: price,
        img: img,
        weightLabel: weight
    };
    
    // We modify existing cart.js addToCart to accept variant items
    if (typeof addVariantToCart === 'function') {
        addVariantToCart(variantItem);
    }
}

function cardStepperUpdate(id, weight, delta) {
    const variantId = id + '-' + weight;
    if (typeof updateVariantQuantity === 'function') {
        updateVariantQuantity(variantId, delta);
    }
}

// Navigate to product detail page instead of modal
function openProductModal(productId) {
    window.location.href = `product.html?id=${productId}`;
}

function _legacyOpenProductModal(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const modalOverlay = document.getElementById('product-modal-overlay');
    const content = document.getElementById('product-modal-content');
    if (!modalOverlay || !content) return;
    
    let weightLabel = 'Base';
    let multiplier = 1;
    if (window.cardActiveWeights[productId]) {
        weightLabel = window.cardActiveWeights[productId].label;
        multiplier = window.cardActiveWeights[productId].multiplier;
    }
    const noWeightCategories = ['Combos', 'Wellness'];
    const usesWeights = !noWeightCategories.includes(product.category);
    if (!usesWeights) weightLabel = 'Standard';
    
    const price = product.priceNumeric * multiplier;

    let ingredientsHtml = '';
    if (product.ingredients && product.ingredients.length > 0) {
        ingredientsHtml = `
            <div class="modal-ingredients">
                <h4><i class="fas fa-leaf"></i> Pure Ingredients</h4>
                <p>${product.ingredients.join(', ')}</p>
            </div>
        `;
    }

    let nutritionHtml = '';
    if (product.nutrition && Object.keys(product.nutrition).length > 0) {
        let rows = '';
        for (const [key, val] of Object.entries(product.nutrition)) {
            rows += `<tr><td>${key}</td><td>${val}</td></tr>`;
        }
        nutritionHtml = `
            <div class="modal-nutrition">
                <h4><i class="fas fa-heartbeat"></i> Nutritional Highlights</h4>
                <table class="nutrition-table">
                    <tbody>${rows}</tbody>
                </table>
            </div>
        `;
    }

    const safeName = product.name.replace(/'/g, "\\'");

    content.innerHTML = `
        <div class="modal-img-wrap">
            <img src="${product.img}" alt="${product.name}" />
        </div>
        <div class="modal-body">
            <span class="product-category-badge" style="margin-bottom: 12px;">${product.category}</span>
            <h2>${product.name}</h2>
            <div class="product-rating" style="margin-bottom: 24px; font-size: 0.9rem;">
              <span class="stars">★★★★★</span>
              <span class="rating-count">(${Math.floor(Math.random() * 80) + 20} verified reviews)</span>
            </div>
            
            <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.7;">
                Experience the authentic taste of tradition. Hand-selected and naturally processed to preserve essential nutrients and purity.
            </p>
            
            ${ingredientsHtml}
            ${nutritionHtml}
            
            ${usesWeights ? `
            <div class="modal-weight-select">
                <h4><i class="fas fa-balance-scale"></i> Select Quantity</h4>
                <div class="weight-selector" style="margin-top: 10px;">
                    ${WEIGHT_VARIANTS.map(w => `
                        <button class="modal-weight-chip ${w.label === weightLabel ? 'active' : ''}" 
                                onclick="changeModalWeight(${product.id}, '${w.label}', ${w.multiplier})">
                            ${w.label}
                        </button>
                    `).join('')}
                </div>
            </div>` : ''}

            <div class="modal-price-row">
                <div class="modal-price" id="modal-price-display">${formatMoney(price)}</div>
                <div id="modal-action-area">
                    <button class="btn btn-primary modal-add-btn" onclick="addModalToCart(${product.id}, '${safeName}', '${product.img}', this)">
                        <i class="fas fa-shopping-basket"></i> Add to Basket
                    </button>
                </div>
            </div>
        </div>
    `;

    // Ensure we trigger the modal action updater
    updateModalActions(productId);

    modalOverlay.style.display = 'flex';
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Store current modal ID for updates
    window.currentModalProductId = productId;
}

function closeProductModal() {
    const modalOverlay = document.getElementById('product-modal-overlay');
    if (modalOverlay) {
        modalOverlay.classList.remove('active');
        modalOverlay.style.display = 'none';
        document.body.style.overflow = '';
        window.currentModalProductId = null;
    }
}

function changeModalWeight(productId, weightLabel, multiplier) {
    // 1. Update card logic so they stay in sync
    changeCardWeight(productId, weightLabel, multiplier);
    
    // 2. Update modal UI specifically
    const content = document.getElementById('product-modal-content');
    if (!content) return;
    
    const chips = content.querySelectorAll('.modal-weight-chip');
    chips.forEach(chip => {
        if (chip.innerText.trim() === weightLabel) {
            chip.classList.add('active');
        } else {
            chip.classList.remove('active');
        }
    });

    const product = PRODUCTS.find(p => p.id === productId);
    const priceEle = document.getElementById('modal-price-display');
    if (product && priceEle) {
        priceEle.innerText = formatMoney(product.priceNumeric * multiplier);
        priceEle.classList.remove('shake');
        void priceEle.offsetWidth;
        priceEle.classList.add('shake');
    }
    
    // 3. Update Modal Actions
    updateModalActions(productId);
}

function updateModalActions(productId) {
    // Sync stepper / add button inside the modal based on cart state
    const actionArea = document.getElementById('modal-action-area');
    if (!actionArea) return;
    
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    let weightLabel = 'Base';
    let multiplier = 1;
    if (window.cardActiveWeights[productId]) {
        weightLabel = window.cardActiveWeights[productId].label;
        multiplier = window.cardActiveWeights[productId].multiplier;
    }
    const noWeightCategories = ['Combos', 'Wellness'];
    if (noWeightCategories.includes(product.category)) {
        weightLabel = 'Standard';
    }

    const cartItem = getCartItem(productId, weightLabel);
    
    if (cartItem && cartItem.quantity > 0) {
        // Show Stepper
        actionArea.innerHTML = `
            <div class="qty-stepper" style="height: 48px; border-width: 2px;">
              <button class="stepper-btn" style="width: 44px; font-size: 1.4rem;" onclick="cardStepperUpdate(${productId}, '${weightLabel}', -1)">-</button>
              <div class="stepper-qty" style="width: 48px; font-size: 1.1rem;">${cartItem.quantity}</div>
              <button class="stepper-btn" style="width: 44px; font-size: 1.4rem;" onclick="cardStepperUpdate(${productId}, '${weightLabel}', 1)">+</button>
            </div>
        `;
    } else {
        const safeName = product.name.replace(/'/g, "\\'");
        actionArea.innerHTML = `
            <button class="btn btn-primary modal-add-btn" style="font-size: 1.05rem;" onclick="addModalToCart(${product.id}, '${safeName}', '${product.img}', this)">
                <i class="fas fa-shopping-basket"></i> Add to Basket
            </button>
        `;
    }
}

function addModalToCart(productId, name, img, btn) {
    let weightLabel = 'Base';
    let multiplier = 1;
    if (window.cardActiveWeights[productId]) {
        weightLabel = window.cardActiveWeights[productId].label;
        multiplier = window.cardActiveWeights[productId].multiplier;
    }
    
    const product = PRODUCTS.find(p => p.id === productId);
    const noWeightCategories = ['Combos', 'Wellness'];
    if (noWeightCategories.includes(product.category)) {
        weightLabel = 'Standard';
        multiplier = 1;
    }
    
    const priceNum = product.priceNumeric * multiplier;
    handleCardAdd(productId, name, priceNum, img, weightLabel, btn);
}
