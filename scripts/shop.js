document.addEventListener('DOMContentLoaded', () => {
    const productsGrid = document.getElementById('shop-products');
    const searchInput = document.getElementById('product-search');
    const categoryFilter = document.getElementById('category-filter');
    const sortFilter = document.getElementById('sort-filter');
    const resultsCount = document.getElementById('results-count');
    const noResults = document.getElementById('no-results');

    if (!productsGrid || typeof PRODUCTS === 'undefined') return;

    // Populate Categories Dynamically
    const categories = [...new Set(PRODUCTS.map(p => p.category))].sort();
    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        categoryFilter.appendChild(option);
    });

    // Check URL for category filter
    const urlParams = new URLSearchParams(window.location.search);
    const catParam = urlParams.get('cat');
    if (catParam && categories.includes(catParam)) {
        categoryFilter.value = catParam;
    }

    // Render Products
    function renderProducts(productList) {
        if (productList.length === 0) {
            productsGrid.style.display = 'none';
            noResults.style.display = 'block';
            resultsCount.textContent = `0 items`;
            return;
        }

        productsGrid.style.display = 'grid';
        noResults.style.display = 'none';
        resultsCount.textContent = `${productList.length} item${productList.length > 1 ? 's' : ''}`;

        productsGrid.innerHTML = productList.map((product, i) => generateCardHTML(product, i)).join('');
        
        setTimeout(() => updateAllCardActions(), 50);

        // Trigger reveal observer for new items
        if (typeof revealObserver !== 'undefined') {
            document.querySelectorAll('#shop-products .reveal').forEach(el => revealObserver.observe(el));
        }
    }

    // Filter Logic
    function filterProducts() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCat = categoryFilter.value;
        const selectedSort = sortFilter.value;

        let filtered = PRODUCTS.filter(p => {
            const matchesSearch = p.name.toLowerCase().includes(searchTerm) || p.category.toLowerCase().includes(searchTerm);
            const matchesCat = selectedCat === 'All Categories' || p.category === selectedCat;
            return matchesSearch && matchesCat;
        });

        // Sort Logic
        if (selectedSort === 'price-asc') {
            filtered.sort((a,b) => a.priceNumeric - b.priceNumeric);
        } else if (selectedSort === 'price-desc') {
            filtered.sort((a,b) => b.priceNumeric - a.priceNumeric);
        } else if (selectedSort === 'name-asc') {
            filtered.sort((a,b) => a.name.localeCompare(b.name));
        }
        // Default is to show according to original array (featured)

        renderProducts(filtered);
    }

    // Event Listeners
    searchInput.addEventListener('input', filterProducts);
    categoryFilter.addEventListener('change', filterProducts);
    sortFilter.addEventListener('change', filterProducts);

    // Initial Render
    filterProducts();
});

function toggleWishlist(btn) {
    btn.classList.toggle('active');
    const icon = btn.querySelector('i');
    icon.className = btn.classList.contains('active') ? 'fas fa-heart' : 'far fa-heart';
    showToast(btn.classList.contains('active') ? 'Added to wishlist ❤️' : 'Removed from wishlist');
}
