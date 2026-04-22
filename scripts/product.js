/**
 * Product Detail Logic
 * Handles loading and rendering specific product information
 */

function initProductDetail() {
    const params = new URLSearchParams(window.location.search);
    const productId = parseInt(params.get('id'));

    if (!productId || isNaN(productId)) {
        window.location.href = 'shop.html';
        return;
    }

    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) {
        window.location.href = 'shop.html';
        return;
    }

    renderProductInfo(product);
    renderRelatedProducts(product);
}

function renderProductInfo(product) {
    const container = document.getElementById('product-detail-content');
    if (!container) return;

    // Use default weight logic from cardFeatures.js
    const startWeight = '500g';
    if (!window.cardActiveWeights[product.id]) {
        window.cardActiveWeights[product.id] = {
            label: startWeight,
            multiplier: 1
        };
    }

    const currentWeight = window.cardActiveWeights[product.id];
    const currentPrice = product.priceNumeric * currentWeight.multiplier;

    // Mock additional details
    const description = "Sourced from the pristine estates of Bharat, this organic treasure is processed using traditional methods to preserve its natural essence and nutrient profile. Perfect for those who seek purity and authentic taste.";
    const ingredients = product.ingredients || ["100% Pure Organic " + product.name, "No Additives", "Sun-dried", "Traditional Hand-pounding"];
    const benefits = [
        "Rich in essential antioxidants",
        "Sustainably sourced from heritage farms",
        "Supports traditional farming communities",
        "100% Chemical-free processing"
    ];

    container.innerHTML = `
        <div class="product-detail-image">
            <div class="image-wrapper">
                <img src="${product.img}" alt="${product.name}" id="main-product-image">
            </div>
        </div>
        <div class="product-detail-info">
            <div class="breadcrumb">
                <a href="shop.html">Collection</a> / <span>${product.category}</span>
            </div>
            <h1 class="product-title">${product.name}</h1>
            <div class="product-rating">
                <div class="stars">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                </div>
                <span>(4.9/5 based on 120+ reviews)</span>
            </div>
            
            <div class="product-price-large" id="detail-price">
                ${formatMoney(currentPrice)}
            </div>

            <div class="product-description">
                <p>${description}</p>
            </div>

            <div class="product-features-detail">
                <div class="weight-selection-group">
                    <label>Select Your Harvest Quantity</label>
                    <div class="weight-chips" id="detail-weight-selector">
                        ${WEIGHT_VARIANTS.map(w => `
                            <button class="weight-chip ${w.label === currentWeight.label ? 'active' : ''}" 
                                    onclick="updateDetailWeight(${product.id}, '${w.label}', ${w.multiplier})">
                                ${w.label}
                            </button>
                        `).join('')}
                    </div>
                </div>

                <div class="product-action-row-large">
                    <div id="detail-action-area">
                        <!-- Handled by updateDetailActions -->
                    </div>
                    <button class="btn-wishlist-large">
                        <i class="far fa-heart"></i>
                    </button>
                </div>
            </div>

            <div class="product-tabs">
                <div class="tabs-nav">
                    <button class="tab-btn active" onclick="switchTab(event, 'benefits')">Benefits</button>
                    <button class="tab-btn" onclick="switchTab(event, 'ingredients')">Ingredients</button>
                </div>
                <div class="tabs-content">
                    <div id="benefits" class="tab-pane active">
                        <ul>
                            ${benefits.map(b => `<li><i class="fas fa-check"></i> ${b}</li>`).join('')}
                        </ul>
                    </div>
                    <div id="ingredients" class="tab-pane">
                        <p>${ingredients.join(', ')}</p>
                    </div>
                </div>
            </div>
        </div>
    `;

    updateDetailActions(product.id);
}

function updateDetailWeight(productId, label, multiplier) {
    // Reuse cardFeatures logic to keep sync
    changeCardWeight(productId, label, multiplier);
    
    // Update local UI
    const priceEle = document.getElementById('detail-price');
    const product = PRODUCTS.find(p => p.id === productId);
    if (priceEle && product) {
        priceEle.innerText = formatMoney(product.priceNumeric * multiplier);
    }

    // Update active chips in detail view
    const chips = document.querySelectorAll('#detail-weight-selector .weight-chip');
    chips.forEach(chip => {
        if (chip.innerText.trim() === label) chip.classList.add('active');
        else chip.classList.remove('active');
    });

    updateDetailActions(productId);
}

function updateDetailActions(productId) {
    const actionArea = document.getElementById('detail-action-area');
    if (!actionArea) return;

    const currentWeight = window.cardActiveWeights[productId];
    const cartItem = getCartItem(productId, currentWeight.label);

    if (cartItem && cartItem.quantity > 0) {
        actionArea.innerHTML = `
            <div class="qty-stepper large">
              <button class="stepper-btn" onclick="cardStepperUpdate(${productId}, '${currentWeight.label}', -1)">-</button>
              <div class="stepper-qty">${cartItem.quantity}</div>
              <button class="stepper-btn" onclick="cardStepperUpdate(${productId}, '${currentWeight.label}', 1)">+</button>
            </div>
        `;
    } else {
        const product = PRODUCTS.find(p => p.id === productId);
        const price = product.priceNumeric * currentWeight.multiplier;
        const safeName = product.name.replace(/'/g, "\\'");
        
        actionArea.innerHTML = `
            <button class="btn btn-primary btn-add-detail" onclick="handleCardAdd(${productId}, '${safeName}', ${price}, '${product.img}', '${currentWeight.label}', this)">
                <i class="fas fa-shopping-bag"></i> Add to Basket
            </button>
        `;
    }
}

function renderRelatedProducts(currentProduct) {
    const grid = document.getElementById('related-products');
    if (!grid) return;

    const related = PRODUCTS
        .filter(p => p.category === currentProduct.category && p.id !== currentProduct.id)
        .slice(0, 4);

    if (related.length === 0) {
        // Fallback to random products if no same-category products
        grid.innerHTML = PRODUCTS
            .filter(p => p.id !== currentProduct.id)
            .sort(() => 0.5 - Math.random())
            .slice(0, 4)
            .map((p, i) => generateCardHTML(p, i))
            .join('');
    } else {
        grid.innerHTML = related.map((p, i) => generateCardHTML(p, i)).join('');
    }

    // Init actions for related cards
    if (typeof updateAllCardActions === 'function') {
        updateAllCardActions();
    }

    // Re-init scroll reveals
    if (typeof initScrollReveal === 'function') {
        initScrollReveal();
    }
}

function switchTab(event, tabId) {
    const btns = document.querySelectorAll('.tab-btn');
    const panes = document.querySelectorAll('.tab-pane');
    
    btns.forEach(btn => btn.classList.remove('active'));
    panes.forEach(pane => pane.classList.remove('active'));
    
    event.currentTarget.classList.add('active');
    document.getElementById(tabId).classList.add('active');
}

// Global hook for cart updates to refresh detail page actions
document.addEventListener('cartUpdated', () => {
    const params = new URLSearchParams(window.location.search);
    const productId = parseInt(params.get('id'));
    if (productId) updateDetailActions(productId);
});

document.addEventListener('DOMContentLoaded', initProductDetail);
