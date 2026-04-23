// State to track active weights on cards
window.cardActiveWeights = {};

function formatMoney(amount) {
    return '₹' + amount.toFixed(2);
}

function generateCardHTML(product, i) {
    // Default weight is 500g
    const startWeight = '500g';
    if (!window.cardActiveWeights[product.id]) {
        window.cardActiveWeights[product.id] = {
            label: startWeight,
            multiplier: 1
        };
    }

    const currentWeightInfo = window.cardActiveWeights[product.id];
    
    // Safety check: ensure currentWeightInfo exists in WEIGHT_VARIANTS
    if (typeof WEIGHT_VARIANTS !== 'undefined') {
        const variantExists = WEIGHT_VARIANTS.some(w => w.label === currentWeightInfo.label);
        if (!variantExists) {
            currentWeightInfo.label = WEIGHT_VARIANTS[0].label;
            currentWeightInfo.multiplier = WEIGHT_VARIANTS[0].multiplier;
        }
    }

    const currentPrice = product.priceNumeric * currentWeightInfo.multiplier;
    
    // Check if category uses weights
    const noWeightCategories = ['Combos', 'Wellness'];
    const usesWeights = !noWeightCategories.includes(product.category);

    return `    <div class="product-card reveal" id="product-card-${product.id}">
      <div class="product-badge-group">
        ${product.category === 'Laddus' || product.category === 'Pickles' ? '<span class="product-badge">Homemade</span>' : ''}
        ${product.id <= 5 ? '<span class="product-badge product-badge--premium">Premium</span>' : ''}
      </div>
      <div class="product-image-container" onclick="openProductModal(${product.id})">
        <img src="${product.img}" alt="${product.name}" class="product-img" loading="lazy" />
        <div class="image-overlay">
          <span>View Details <i class="fas fa-expand"></i></span>
        </div>
      </div>
      <div class="product-info">
        <h3>${product.name}</h3>
        <p class="product-category">${product.category}</p>

        <div class="product-action-wrapper">
          ${usesWeights ? `
          <div class="qty-selector-group">
             <label>Select Weight</label>
             <div class="weight-chips" id="weight-selector-${product.id}">
                ${WEIGHT_VARIANTS.map(w => `
                   <button class="weight-chip ${w.label === currentWeightInfo.label ? 'active' : ''}"
                           onclick="changeCardWeight(${product.id}, '${w.label}', ${w.multiplier})">
                       ${w.label}
                   </button>
                `).join('')}
             </div>
          </div>` : ''}
          
          <div class="price-action-row">
              <span class="price" id="card-price-${product.id}">${formatMoney(currentPrice)}</span>
              <div id="card-action-${product.id}">
                  <!-- Rendered by updateCardActions -->
              </div>
          </div>
        </div>
      </div>
    </div>`;
}

function changeCardWeight(productId, weightLabel, multiplier) {
    window.cardActiveWeights[productId] = { label: weightLabel, multiplier: multiplier };
    
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

    const product = PRODUCTS.find(p => p.id === productId);
    const priceEle = document.getElementById(`card-price-${productId}`);
    if (product && priceEle) {
        const newPrice = product.priceNumeric * multiplier;
        priceEle.innerText = formatMoney(newPrice);
        priceEle.classList.remove('shake');
        void priceEle.offsetWidth;
        priceEle.classList.add('shake');
    }

    updateCardActions(productId);
}

function updateAllCardActions() {
    if (typeof PRODUCTS !== 'undefined') {
        PRODUCTS.forEach(p => updateCardActions(p.id));
    }
}

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

    const noWeightCategories = ['Combos', 'Wellness'];
    if (noWeightCategories.includes(product.category)) {
        weightLabel = 'Standard';
        multiplier = 1;
    }

    const priceNum = product.priceNumeric * multiplier;
    const cartItem = getCartItem(productId, weightLabel);

    if (cartItem && cartItem.quantity > 0) {
        actionContainer.innerHTML = `
            <div class="qty-stepper">
              <button class="stepper-btn" onclick="cardStepperUpdate(${productId}, '${weightLabel}', -1)">-</button>
              <div class="stepper-qty">${cartItem.quantity}</div>
              <button class="stepper-btn" onclick="cardStepperUpdate(${productId}, '${weightLabel}', 1)">+</button>
            </div>
        `;
    } else {
        const safeName = product.name.replace(/'/g, "\\'");
        actionContainer.innerHTML = `
            <button class="btn-add-unique" onclick="handleCardAdd(${productId}, '${safeName}', ${priceNum}, '${product.img}', '${weightLabel}', this)">
                <i class="fas fa-plus"></i>
            </button>
        `;
    }
}

function handleCardAdd(id, name, price, img, weight, btn) {
    const variantItem = {
        id: id,
        variantId: id + '-' + weight,
        name: name + (weight && weight !== 'Standard' ? ` (${weight})` : ''),
        price: price,
        img: img,
        weightLabel: weight
    };
    
    if (typeof addVariantToCart === 'function') {
        addVariantToCart(variantItem, btn);
    }
}

function cardStepperUpdate(id, weight, delta) {
    const variantId = id + '-' + weight;
    if (typeof updateVariantQuantity === 'function') {
        updateVariantQuantity(variantId, delta);
    }
}

function openProductModal(productId) {
    window.location.href = `product.html?id=${productId}`;
}

// Init logic
document.addEventListener('DOMContentLoaded', () => {
    updateAllCardActions();
    document.addEventListener('cartUpdated', updateAllCardActions);
});
