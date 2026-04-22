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

    productsGrid.innerHTML = items.map((product, i) => generateCardHTML(product, i)).join('');
    
    // Trigger card action updates
    if (typeof updateAllCardActions === 'function') {
        updateAllCardActions();
    }

    // Re-init scroll reveals
    if (typeof initScrollReveal === 'function') {
        initScrollReveal();
    }
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
