/**
 * Shop Logic for Nature's Gold
 * Handles dynamic rendering, searching, and filtering
 */

function renderProducts(items) {
    const productsGrid = document.getElementById('shop-products');
    if (!productsGrid) return;

    if (items.length === 0) {
        productsGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 60px; opacity: 0.6;">
                <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 20px;"></i>
                <p>No products found matching your criteria.</p>
            </div>
        `;
        return;
    }

    productsGrid.innerHTML = items.map(product => `
        <div class="product-card">
            ${product.category === 'Laddus' || product.category === 'Pickles' ? '<span class="product-badge">Homemade</span>' : ''}
            ${product.id <= 5 ? '<span class="product-badge">Top Quality</span>' : ''}
            <div class="product-image-container">
                <img src="${product.img}" alt="${product.name}" class="product-img" loading="lazy" />
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p style="opacity: 0.6; font-size: 0.85rem; margin-bottom: 10px;">${product.category}</p>
                <div class="product-meta">
                    <span class="price">${product.priceRange}</span>
                    <button class="add-btn" onclick="addToCart({id: ${product.id}, name: '${product.name.replace(/'/g, "\\'")}', price: ${product.priceNumeric}, img: '${product.img}'}, this)">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function initShop() {
    const searchInput = document.getElementById('product-search');
    const categoryFilter = document.getElementById('category-filter');

    // Extract unique categories for filter
    const categories = ['All Categories', ...new Set(PRODUCTS.map(p => p.category))];
    if (categoryFilter) {
        categoryFilter.innerHTML = categories.map(cat => `<option value="${cat}">${cat}</option>`).join('');
    }

    function filterAndSearch() {
        const query = searchInput ? searchInput.value.toLowerCase() : '';
        const category = categoryFilter ? categoryFilter.value : 'All Categories';

        const filtered = PRODUCTS.filter(p => {
            const matchesSearch = p.name.toLowerCase().includes(query);
            const matchesCategory = category === 'All Categories' || p.category === category;
            return matchesSearch && matchesCategory;
        });

        renderProducts(filtered);
    }

    if (searchInput) searchInput.addEventListener('input', filterAndSearch);
    if (categoryFilter) categoryFilter.addEventListener('change', filterAndSearch);

    // Initial render
    renderProducts(PRODUCTS);
}

document.addEventListener('DOMContentLoaded', initShop);
