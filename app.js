// Product data (this would typically come from a database)
let t=[]
const products = [
    {
        id: 1,
        name: 'Classic Leather Sandals',
        category: 'sandals',
        price: 49.99,
        image: 'Birkenstock_Arizona_sandal.gif',
        description: 'Comfortable leather sandals perfect for everyday wear.',
        colors: ['black', 'brown', 'white'],
        sizes: [6, 7, 8, 9, 10],
        rating: 4.5,
        reviews: 128
    },
    {
        id: 2,
        name: 'Beach Flip Flops',
        category: 'flipflops',
        price: 19.99,
        image: 'resized_flipflops_640x480.webp',
        description: 'Lightweight and durable flip flops for beach days.',
        colors: ['blue', 'red', 'black'],
        sizes: [6, 7, 8, 9, 10],
        rating: 4.2,
        reviews: 75
    },
    {
        id: 3,
        name: 'Running Shoes Pro',
        category: 'shoes',
        price: 89.99,
        image: 'Asics_Gel-Pulse_11.jpg',
        description: 'High-performance running shoes with excellent cushioning.',
        colors: ['black', 'blue', 'red'],
        sizes: [7, 8, 9, 10],
        rating: 4.8,
        reviews: 214
    },
    {
        id: 4,
        name: 'Casual Sneakers',
        category: 'shoes',
        price: 59.99,
        image: 'resized_image_640x480.webp',
        description: 'Stylish sneakers for casual everyday wear.',
        colors: ['white', 'black', 'brown'],
        sizes: [6, 7, 8, 9, 10],
        rating: 4.4,
        reviews: 156
    },
    {
        id: 5,
        name: 'Strappy Sandals',
        category: 'sandals',
        price: 39.99,
        image: 'resized_black_sandals_640x480.jpg',
        description: 'Elegant strappy sandals for a night out.',
        colors: ['black', 'white', 'red'],
        sizes: [6, 7, 8, 9],
        rating: 4.3,
        reviews: 92
    },
    {
        id: 6,
        name: 'Athletic Shoes',
        category: 'shoes',
        price: 79.99,
        image: 'resized_red_sneakers_640x480.jpg',
        description: 'Versatile athletic shoes for various sports activities.',
        colors: ['black', 'blue', 'red'],
        sizes: [7, 8, 9, 10],
        rating: 4.6,
        reviews: 187
    },
    {
        id: 7,
        name: 'Comfort Flip Flops',
        category: 'flipflops',
        price: 24.99,
        image: 'resized_custom_logo_slides_640x480.jpg',
        description: 'Extra comfortable flip flops with arch support.',
        colors: ['black', 'brown', 'blue'],
        sizes: [6, 7, 8, 9, 10],
        rating: 4.1,
        reviews: 63
    },
    {
        id: 8,
        name: 'Formal Dress Shoes',
        category: 'shoes',
        price: 99.99,
        image: 'brogue-shoes-6072988_640x480.jpg',
        description: 'Classic formal shoes for business and special occasions.',
        colors: ['black', 'brown'],
        sizes: [7, 8, 9, 10],
        rating: 4.7,
        reviews: 142
    },
    {
        id: 9,
        name: 'Platform Sandals',
        category: 'sandals',
        price: 54.99,
        image: 'images_640x480.jpg',
        description: 'Trendy platform sandals for added height.',
        colors: ['black', 'white', 'red'],
        sizes: [6, 7, 8, 9],
        rating: 4.0,
        reviews: 58
    }
];

// Store cart and wishlist items in local variables (in a real app, you might use localStorage or a backend API)
let cartItems = [];
let wishlistItems = [];
let currentCategory = 'all';
let appliedDiscount = 0;

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Display products on the page
    displayProducts();

    // Set up event listeners
    setupEventListeners();

    // Setup price range filter
    setupPriceRangeFilter();

    // Initialize modals
    initializeModals();
});

function setupPriceRangeFilter() {
    const priceRange = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');
    
    if (priceRange && priceValue) {
        priceRange.addEventListener('input', function() {
            priceValue.textContent = `$${this.value}`;
        });
    }
}

function setupEventListeners() {
    // Event listener for "Add to Cart" buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = parseInt(e.target.getAttribute('data-id'));
            addToCart(productId);
        }
        
        if (e.target.classList.contains('add-to-wishlist')) {
            const productId = parseInt(e.target.getAttribute('data-id'));
            addToWishlist(productId);
        }
    });

    // Event listener for category cards
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            filterByCategory(category);
        });
    });

    // Event listener for shop now buttons
    const shopNowButtons = document.querySelectorAll('.shop-now-btn');
    shopNowButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent the category card click event
            const category = this.parentElement.getAttribute('data-category');
            filterByCategory(category);
            
            // Scroll to products section
            document.getElementById('productsSection').scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Event listener for cart button
    const cartBtn = document.getElementById('cartBtn');
    if (cartBtn) {
        cartBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openCartModal();
        });
    }

    // Event listener for wishlist button
    const wishlistBtn = document.getElementById('wishlistBtn');
    if (wishlistBtn) {
        wishlistBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openWishlistModal();
        });
    }

    // Event listener for closing modals
    const closeButtons = document.querySelectorAll('.close-modal');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modals = document.querySelectorAll('.modal');
            modals.forEach(modal => {
                modal.style.display = 'none';
            });
        });
    });

    // Event listener for apply filters button
    const applyFiltersBtn = document.getElementById('applyFilters');
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', applyFilters);
    }

    // Event listener for sort select
    const sortSelect = document.getElementById('sortBy');
    if (sortSelect) {
        sortSelect.addEventListener('change', sortProducts);
    }

    // Event listener for checkout button
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            if (cartItems.length > 0) {
                document.getElementById('cartModal').style.display = 'none';
                document.getElementById('checkoutModal').style.display = 'block';
                
                // Show shipping step
                showCheckoutStep('shippingForm');
            } else {
                alert('Your cart is empty. Add some products before checkout.');
            }
        });
    }
    
    // Event listener for continue to payment button
    const continueToPaymentBtn = document.getElementById('continueToPaymentBtn');
    if (continueToPaymentBtn) {
        continueToPaymentBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Validate shipping information
            if (validateShippingInfo()) {
                showCheckoutStep('paymentForm');
            }
        });
    }
    
    // Event listener for back to shipping button
    const backToShipping = document.getElementById('backToShipping');
    if (backToShipping) {
        backToShipping.addEventListener('click', function(e) {
            e.preventDefault();
            showCheckoutStep('shippingForm');
        });
    }

    // Event listener for place order button
    const placeOrderBtn = document.getElementById('placeOrder');
    if (placeOrderBtn) {
        placeOrderBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (validatePaymentInfo()) {
                processOrder();
            }
        });
    }

    // Event listener for continue shopping button
    const continueShoppingBtn = document.getElementById('continueShopping');
    if (continueShoppingBtn) {
        continueShoppingBtn.addEventListener('click', function() {
            document.getElementById('checkoutModal').style.display = 'none';
            cartItems = []; // Clear cart
            updateCartCount();
        });
    }

    // Event listener for payment method selection
    const paymentMethods = document.querySelectorAll('input[name="paymentMethod"]');
    paymentMethods.forEach(method => {
        method.addEventListener('change', togglePaymentDetails);
    });

    // Event listener for apply coupon button
    const applyCouponBtn = document.getElementById('applyCoupon');
    if (applyCouponBtn) {
        applyCouponBtn.addEventListener('click', function() {
            const couponCode = document.getElementById('couponCode').value;
            applyCoupon(couponCode);
        });
    }

    // Event listeners for login/signup modal switching
    const switchToSignup = document.getElementById('switchToSignup');
    if (switchToSignup) {
        switchToSignup.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('loginModal').style.display = 'none';
            document.getElementById('signupModal').style.display = 'block';
        });
    }

    const switchToLogin = document.getElementById('switchToLogin');
    if (switchToLogin) {
        switchToLogin.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('signupModal').style.display = 'none';
            document.getElementById('loginModal').style.display = 'block';
        });
    }

    // Set up checkout step navigation
    setupCheckoutStepNavigation();
}

function setupCheckoutStepNavigation() {
    const stepShipping = document.getElementById('stepShipping');
    const stepPayment = document.getElementById('stepPayment');
    
    if (stepShipping) {
        stepShipping.addEventListener('click', function() {
            showCheckoutStep('shippingForm');
        });
    }
    
    if (stepPayment) {
        stepPayment.addEventListener('click', function() {
            if (validateShippingInfo()) {
                showCheckoutStep('paymentForm');
            }
        });
    }
}

function displayProducts(filteredProducts = null) {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;

    productsGrid.innerHTML = '';

    
    const productsToDisplay = filteredProducts || products;
    
    if (productsToDisplay.length === 0) {
        productsGrid.innerHTML = '<p class="no-products">No products match your criteria.</p>';
        return;
    }

    productsToDisplay.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">$${product.price.toFixed(2)}</p>
            <div class="product-actions">
                <button class="add-to-wishlist" data-id="${product.id}">♥</button>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

function filterByCategory(category) {
    currentCategory = category;
    
    // Update category title
    const categoryTitle = document.getElementById('categoryTitle');
    if (categoryTitle) {
        categoryTitle.textContent = category === 'all' ? 'All Products' : category.charAt(0).toUpperCase() + category.slice(1);
    }
    
    // Filter products by category
    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(product => product.category === category);
    
    displayProducts(filteredProducts);
}

function applyFilters() {
    let filteredProducts = products;
    
    // Filter by category if not showing all
    if (currentCategory !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category === currentCategory);
    }
    
    // Filter by selected sizes
    const selectedSizes = Array.from(document.querySelectorAll('input[name="size"]:checked'))
        .map(input => parseInt(input.value));
    
    if (selectedSizes.length > 0) {
        filteredProducts = filteredProducts.filter(product => 
            product.sizes.some(size => selectedSizes.includes(size))
        );
    }
    
    // Filter by selected colors
    const selectedColors = Array.from(document.querySelectorAll('input[name="color"]:checked'))
        .map(input => input.value);
    
    if (selectedColors.length > 0) {
        filteredProducts = filteredProducts.filter(product => 
            product.colors.some(color => selectedColors.includes(color))
        );
    }
    
    // Filter by price range
    const maxPrice = parseInt(document.getElementById('priceRange').value);
    filteredProducts = filteredProducts.filter(product => product.price <= maxPrice);
    
    // Display filtered products
    displayProducts(filteredProducts);
}

function sortProducts() {
    const sortOption = document.getElementById('sortBy').value;
    let sortedProducts = [...products];
    
    // Filter by category if not showing all
    if (currentCategory !== 'all') {
        sortedProducts = sortedProducts.filter(product => product.category === currentCategory);
    }
    
    switch (sortOption) {
        case 'price-low':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        case 'newest':
            // For this example, we'll just reverse the array as if newer items are at the end
            sortedProducts.reverse();
            break;
        case 'popularity':
        default:
            sortedProducts.sort((a, b) => b.reviews - a.reviews);
            break;
    }
    
    displayProducts(sortedProducts);
}

function addToCart(productId) {
    console.log('addToCart called for productId:', productId); // 🪵 Add this for debugging

    // Find the product by ID
    const product = products.find(p => p.id === productId);
    console.log("pro",product)
    if (!product) {
        console.log('Product not found for productId:', productId); // Debugging line
        return;
    }

    // Find if the item is already in the cart
    const existingItem = cartItems.find(item => item.productId === productId);
    if (existingItem) {
        existingItem.quantity += 1;
        console.log('Quantity incremented. New quantity:', existingItem.quantity); // 🪵 Add this for debugging
    } else {
        cartItems.push({
            productId: productId,
            quantity: 1,
            price: product.price
        });
        console.log('New item added to cart', product.name); // 🪵 Add this for debugging
    }

    updateCartCount();
    showNotification(`${product.name} added to cart!`);
}




function addToWishlist(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    // Check if product is already in wishlist
    const existingItem = wishlistItems.find(item => item.productId === productId);

    if (!existingItem) {
        wishlistItems.push({
            productId: productId
           
        });
        
        // Update wishlist count
        updateWishlistCount();
        // Show notification
        showNotification(`${product.name} added to wishlist!`);
    } else {
        // If already in wishlist, remove it
        wishlistItems = wishlistItems.filter(item => item.productId !== productId);
        updateWishlistCount();
        showNotification(`${product.name} removed from wishlist!`);
    }
}

function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        t.push(cartItems[0])
        console.log("aaa",cartItems.length)
        console.log("bbb",cartItems.length+=1)
        const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
        console.log("123",t)
    }
    console.log(t)
}

function updateWishlistCount() {
    const wishlistCount = document.getElementById('wishlistCount');
    if (wishlistCount) {
        wishlistCount.textContent = wishlistItems.length;
    }
}

function openCartModal() {
    renderCartItems();
    calculateCartTotals();
    document.getElementById('cartModal').style.display = 'block';
}

function openWishlistModal() {
    renderWishlistItems();
    document.getElementById('wishlistModal').style.display = 'block';
}

function renderCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    if (!cartItemsContainer) return;

    cartItemsContainer.innerHTML = '';

    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        return;
    }

    cartItems.forEach(item => {
        const product = products.find(p => p.id === item.productId);
        if (!product) return;
        
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
            <div class="cart-item-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="cart-item-details">
                <h4>${product.name}</h4>
                <p class="cart-item-price">$${product.price.toFixed(2)}</p>
            </div>
            <div class="cart-item-quantity">
                <button class="decrease-quantity" data-id="${product.id}">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="increase-quantity" data-id="${product.id}">+</button>
            </div>
            <div class="cart-item-total">
                $${(item.price * item.quantity).toFixed(2)}
            </div>
            <button class="remove-from-cart" data-id="${product.id}">×</button>
        `;
        cartItemsContainer.appendChild(cartItemElement);
    });

    // Add event listeners for quantity changes and remove items
    setupCartItemsEventListeners();
}

function renderWishlistItems() {
    const wishlistItemsContainer = document.getElementById('wishlistItems');
    if (!wishlistItemsContainer) return;

    wishlistItemsContainer.innerHTML = '';

    if (wishlistItems.length === 0) {
        wishlistItemsContainer.innerHTML = '<p class="empty-wishlist">Your wishlist is empty</p>';
        return;
    }

    wishlistItems.forEach(item => {
        const product = products.find(p => p.id === item.productId);
        if (!product) return;
        
        const wishlistItemElement = document.createElement('div');
        wishlistItemElement.className = 'wishlist-item';
        wishlistItemElement.innerHTML = `
            <div class="wishlist-item-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="wishlist-item-details">
                <h4>${product.name}</h4>
                <p class="wishlist-item-price">$${product.price.toFixed(2)}</p>
            </div>
            <div class="wishlist-item-actions">
                <button class="move-to-cart" data-id="${product.id}">Add to Cart</button>
                <button class="remove-from-wishlist" data-id="${product.id}">Remove</button>
            </div>
        `;
        wishlistItemsContainer.appendChild(wishlistItemElement);
    });

    // Add event listeners for wishlist item actions
    setupWishlistItemsEventListeners();
}

function setupCartItemsEventListeners() {
// Increase quantity
document.querySelectorAll('.increase-quantity').forEach(button => {
    button.addEventListener('click', function() {
        const productId = parseInt(this.getAttribute('data-id'));
        const item = cartItems.find(item => item.productId === productId);
        
        console.log(`Increase button clicked for productId: ${productId}`); // Debug log

        if (item) {
            // Logging the current quantity before incrementing
            console.log(`Current quantity before increment: ${item.quantity}`);
            item.quantity += 1;

            // Logging the new quantity after increment
            console.log(`New quantity after increment: ${item.quantity}`);

            renderCartItems();
            calculateCartTotals();
            updateCartCount();
        }
    });
});



    // Decrease quantity
    document.querySelectorAll('.decrease-quantity').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            const item = cartItems.find(item => item.productId === productId);
            if (item) {
                console.log(`Before decrement: Product ID ${productId}, Quantity: ${item.quantity}`);
                item.quantity -= 1;
                if (item.quantity <= 0) {
                    cartItems = cartItems.filter(i => i.productId !== productId);
                }
                console.log(`After decrement: Product ID ${productId}, Quantity: ${item.quantity}`);
                renderCartItems();
                calculateCartTotals();
                updateCartCount();
            }
        });
    });

    // Remove from cart
    document.querySelectorAll('.remove-from-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            cartItems = cartItems.filter(item => item.productId !== productId);
            renderCartItems();
            calculateCartTotals();
            updateCartCount();
        });
    });
}

function setupWishlistItemsEventListeners() {
    // Move to cart
    document.querySelectorAll('.move-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            addToCart(productId);
            
            // Optionally remove from wishlist after adding to cart
            wishlistItems = wishlistItems.filter(item => item.productId !== productId);
            renderWishlistItems();
            updateWishlistCount();
        });
    });

    // Remove from wishlist
    document.querySelectorAll('.remove-from-wishlist').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            wishlistItems = wishlistItems.filter(item => item.productId !== productId);
            renderWishlistItems();
            updateWishlistCount();
        });
    });
}

function calculateCartTotals() {
    const subtotal = cartItems.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0);

    // Calculate discount (from applied coupon or other discounts)
    const discount = subtotal * (appliedDiscount / 100);
    const total = subtotal - discount;

    // Update the display
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('discount').textContent = `$${discount.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;

    // Also update payment summary if it exists
    if (document.getElementById('paymentSubtotal')) {
        document.getElementById('paymentSubtotal').textContent = `$${subtotal.toFixed(2)}`;
        document.getElementById('paymentDiscount').textContent = `$${discount.toFixed(2)}`;
        
        // Add shipping cost for payment total
        const shippingCost = subtotal > 0 ? 5.00 : 0;
        document.getElementById('shippingCost').textContent = `$${shippingCost.toFixed(2)}`;
        document.getElementById('paymentTotal').textContent = `$${(total + shippingCost).toFixed(2)}`;
    }
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;

    // Add to body
    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.body?.removeChild(notification);
        }, 300);
    }, 3000);
}

function applyCoupon(couponCode) {
    // Example coupon codes
    const validCoupons = {
        'WELCOME10': 10, // 10% off
        'SHOES20': 20,   // 20% off
        'FREESHIP': 5    // $5 off (shipping)
    };

    if (validCoupons[couponCode]) {
        appliedDiscount = validCoupons[couponCode];
        calculateCartTotals();
        showNotification(`Coupon applied! ${appliedDiscount}% off your order.`);
    } else {
        showNotification('Invalid coupon code');
    }
}

function showCheckoutStep(step) {
    // Hide all steps first
    const steps = ['shippingForm', 'paymentForm', 'confirmationPage'];
    steps.forEach(s => {
        const element = document.getElementById(s);
        if (element) {
            element.style.display = 'none';
        }
    });
    
    // Show the requested step
    const currentStep = document.getElementById(step);
    if (currentStep) {
        currentStep.style.display = 'block';
    }
    
    // Update the active step indicator
    const stepIndicators = document.querySelectorAll('.step');
    if (stepIndicators.length > 0) {
        stepIndicators.forEach(indicator => {
            indicator.classList.remove('active');
        });
        
        // Map steps to their indicators
        const stepMap = {
            'shippingForm': 'stepShipping',
            'paymentForm': 'stepPayment',
            'confirmationPage': 'stepConfirmation'
        };
        
        const activeIndicator = document.getElementById(stepMap[step]);
        if (activeIndicator) {
            activeIndicator.classList.add('active');
        }
    }
}

function validateShippingInfo() {
    const firstName = document.getElementById('firstName')?.value;
    const lastName = document.getElementById('lastName')?.value;
    const address = document.getElementById('address')?.value;
    const city = document.getElementById('city')?.value;
    const zipCode = document.getElementById('zipCode')?.value;
    const country = document.getElementById('country')?.value;
    const phone = document.getElementById('phone')?.value;
    
    if (!firstName || !lastName || !address || !city || !zipCode || !country || !phone) {
        showNotification('Please fill in all shipping details');
        return false;
    }
    
    return true;
}

function validatePaymentInfo() {
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked')?.value;
    
    if (!paymentMethod) {
        showNotification('Please select a payment method');
        return false;
    }
    
    if (paymentMethod === 'online') {
        const cardNumber = document.getElementById('cardNumber')?.value;
        const expiryDate = document.getElementById('expiryDate')?.value;
        const cvv = document.getElementById('cvv')?.value;
        const cardName = document.getElementById('cardName')?.value;
        
        if (!cardNumber || !expiryDate || !cvv || !cardName) {
            showNotification('Please fill in all card details');
            return false;
        }
    }
    
    return true;
}

function togglePaymentDetails() {
    const onlineDetails = document.getElementById('onlinePaymentDetails');
    const emiDetails = document.getElementById('emiPaymentDetails');
    
    if (document.getElementById('onlinePayment').checked) {
        onlineDetails.style.display = 'block';
        emiDetails.style.display = 'none';
    } else if (document.getElementById('emiOption').checked) {
        onlineDetails.style.display = 'none';
        emiDetails.style.display = 'block';
    } else {
        onlineDetails.style.display = 'none';
        emiDetails.style.display = 'none';
    }
}

function processOrder() {
    // In a real app, this would send order data to a server
    // For now, we'll just show the confirmation page
    
    // Generate a random order number
    const orderNumber = Math.floor(Math.random() * 1000000000);
    document.getElementById('orderNumber').textContent = orderNumber;
    
    // Copy order details to confirmation page
    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const discount = subtotal * (appliedDiscount / 100);
    const shippingCost = subtotal > 0 ? 5.00 : 0;
    const total = subtotal - discount + shippingCost;
    
    document.getElementById('confirmationSubtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('confirmationDiscount').textContent = `$${discount.toFixed(2)}`;
    document.getElementById('confirmationShipping').textContent = `$${shippingCost.toFixed(2)}`;
    document.getElementById('confirmationTotal').textContent = `$${total.toFixed(2)}`;
    
    // Display order items
    const orderItemsContainer = document.getElementById('orderItems');
    if (orderItemsContainer) {
        orderItemsContainer.innerHTML = '';
        
        cartItems.forEach(item => {
            const product = products.find(p => p.id === item.productId);
            if (!product) return;
            
            const orderItemElement = document.createElement('div');
            orderItemElement.className = 'order-item';
            orderItemElement.innerHTML = `
                <div class="order-item-details">
                    <span>${product.name} x ${item.quantity}</span>
                    <span>$${(product.price * item.quantity).toFixed(2)}</span>
                </div>
            `;
            orderItemsContainer.appendChild(orderItemElement);
        });
    }
    
    // Show confirmation page
    showCheckoutStep('confirmationPage');
}

function initializeModals() {
    // This function would create any additional modals dynamically if needed
    // For now, all modals are already defined in the HTML
    
    // Initialize payment methods display
    togglePaymentDetails();
}

// Initialize page
// Complete the JavaScript file by adding these missing functions:

// Handle form submissions for login and signup
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // In a real app, this would send data to a server for authentication
    // For demo purposes, we'll just simulate a successful login
    showNotification('Login successful!');
    document.getElementById('loginModal').style.display = 'none';
    
    // Update UI to show logged-in state
    updateUserLoginState(true, email);
});

document.getElementById('signupForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Validate passwords match
    if (password !== confirmPassword) {
        showNotification('Passwords do not match');
        return;
    }
    
    // In a real app, this would send data to a server for registration
    // For demo purposes, we'll just simulate a successful signup
    showNotification('Account created successfully!');
    document.getElementById('signupModal').style.display = 'none';
    
    // Update UI to show logged-in state
    updateUserLoginState(true, email);
});

// Function to update UI based on login state
function updateUserLoginState(isLoggedIn, userEmail = '') {
    const loginSignupButton = document.querySelector('a[href="1.html"]:nth-of-type(1)');
    const logoutButton = document.querySelector('a[href="1.html"]:nth-of-type(2)');
    
    if (isLoggedIn) {
        if (loginSignupButton) loginSignupButton.style.display = 'none';
        if (logoutButton) logoutButton.style.display = 'block';
        
        // Store login state (in a real app, this would use more secure methods)
        localStorage.setItem('userLoggedIn', 'true');
        localStorage.setItem('userEmail', userEmail);
    } else {
        if (loginSignupButton) loginSignupButton.style.display = 'block';
        if (logoutButton) logoutButton.style.display = 'none';
        
        // Clear login state
        localStorage.removeItem('userLoggedIn');
        localStorage.removeItem('userEmail');
    }
}

// Handle logout
document.querySelectorAll('a[href="1.html"]')[1]?.addEventListener('click', function(e) {
    e.preventDefault();
    updateUserLoginState(false);
    showNotification('Logged out successfully');
});

// Handle PDF invoice download
document.getElementById('downloadInvoice')?.addEventListener('click', function(e) {
    e.preventDefault();
    showNotification('Invoice download started');
    // In a real app, this would generate and download a PDF
});

// Check login state on page load
function checkLoginState() {
    const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
    const userEmail = localStorage.getItem('userEmail');
    if (isLoggedIn && userEmail) {
        updateUserLoginState(true, userEmail);
    }
}

// Initialize page with all required functions
document.addEventListener('DOMContentLoaded', function() {
    // Display products on the page
    displayProducts();

    // Set up event listeners
    setupEventListeners();

    // Setup price range filter
    setupPriceRangeFilter();

    // Initialize modals
    initializeModals();
    
    // Check user login state
    checkLoginState();
    
    // Initialize UI state
    // Hide logout button by default if not already handled by CSS
    const logoutButton = document.querySelectorAll('a[href="1.html"]')[1];
    if (logoutButton) logoutButton.style.display = 'none';
});

// Add this to the end of your app.js file or replace your existing login/logout code

document.addEventListener('DOMContentLoaded', function() {
    // First, let's fix the HTML structure to ensure proper targeting
    const loginLogoutDiv = document.querySelector('header div:nth-child(4)');
    if (loginLogoutDiv) {
        // Make sure the buttons are styled properly and visible
        const loginButton = loginLogoutDiv.querySelector('ul li:first-child a');
        const logoutButton = loginLogoutDiv.querySelector('ul li:last-child a');
        
        if (loginButton && logoutButton) {
            // Set initial visibility based on login status
            const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
            
            // Initial setup
            if (isLoggedIn) {
                loginButton.style.display = 'none';
                logoutButton.style.display = 'inline-block';
            } else {
                loginButton.style.display = 'inline-block';
                logoutButton.style.display = 'none';
            }
            
            // Handle login form submission
            const loginForm = document.getElementById('loginForm');
            if (loginForm) {
                loginForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    console.log("Login form submitted");
                    
                    // Set logged in status
                    localStorage.setItem('isLoggedIn', 'true');
                    
                    // Update UI
                    loginButton.style.display = 'none';
                    logoutButton.style.display = 'inline-block';
                    
                    // Close modal
                    document.getElementById('loginModal').style.display = 'none';
                    
                    // Debug in console
                    console.log("User is now logged in");
                });
            }
            
            // Handle logout button click
            logoutButton.addEventListener('click', function(e) {
                e.preventDefault();
                console.log("Logout clicked");
                
                // Set logged out status
                localStorage.setItem('isLoggedIn', 'false');
                
                // Update UI
                loginButton.style.display = 'inline-block';
                logoutButton.style.display = 'none';
                
                // Debug in console
                console.log("User is now logged out");
            });
            
            // Debug
            console.log("Login/logout functionality initialized");
            console.log("Login button found:", loginButton);
            console.log("Logout button found:", logoutButton);
        } else {
            console.error("Login/logout buttons not found");
        }
    } else {
        console.error("Login/logout container not found");
    }
    
    // Handle login button click to open modal
    const loginLinks = document.querySelectorAll('a[href="1.html"]');
    loginLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('loginModal').style.display = 'block';
        });
    });
});
// Add this to your app.js file - this will generate a PDF invoice on demand

// Add event listener for the download invoice button
document.addEventListener('DOMContentLoaded', function() {
    const downloadInvoiceBtn = document.getElementById('downloadInvoice');
    
    if (downloadInvoiceBtn) {
        downloadInvoiceBtn.addEventListener('click', function(e) {
            e.preventDefault();
            generateInvoicePDF();
        });
    }
});

// Function to generate a PDF invoice dynamically
function generateInvoicePDF() {
    // Here we'll use a library called jsPDF which needs to be included in your HTML
    // First, check if jsPDF is available (add this script to your HTML)
    if (typeof jspdf === 'undefined') {
        // If jsPDF is not available, we'll redirect to a fallback solution
        alert('PDF generation requires additional libraries. We\'ll email your invoice instead.');
        sendInvoiceEmail();
        return;
    }
    
    try {
        // Create a new PDF document
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Add header
        doc.setFontSize(22);
        doc.text('REVANTH SHOES', 105, 20, { align: 'center' });
        
        doc.setFontSize(16);
        doc.text('INVOICE', 105, 30, { align: 'center' });
        
        // Add invoice details
        doc.setFontSize(12);
        const orderNumber = document.getElementById('orderNumber').textContent;
        const today = new Date().toLocaleDateString();
        
        doc.text(`Order #: ${orderNumber}`, 20, 50);
        doc.text(`Date: ${today}`, 20, 60);
        
        // Add customer info
        const firstName = document.getElementById('firstName').value || 'Customer';
        const lastName = document.getElementById('lastName').value || '';
        doc.text(`Customer: ${firstName} ${lastName}`, 20, 70);
        
        // Add item details
        doc.text('Items:', 20, 90);
        doc.line(20, 92, 190, 92);
        doc.text('Item', 20, 100);
        doc.text('Qty', 140, 100);
        doc.text('Price', 170, 100);
        doc.line(20, 102, 190, 102);
        
        // Add items from cart
        let yPos = 110;
        let totalAmount = 0;
        
        cartItems.forEach((item, index) => {
            const product = products.find(p => p.id === item.productId);
            if (product) {
                const itemTotal = product.price * item.quantity;
                totalAmount += itemTotal;
                
                doc.text(product.name, 20, yPos);
                doc.text(item.quantity.toString(), 140, yPos);
                doc.text(`$${product.price.toFixed(2)}`, 170, yPos);
                
                yPos += 10;
            }
        });
        
        // Add totals
        doc.line(20, yPos, 190, yPos);
        yPos += 10;
        
        const subtotal = totalAmount;
        const shippingCost = 5.00;
        const discount = (appliedDiscount / 100) * subtotal;
        const total = subtotal + shippingCost - discount;
        
        doc.text(`Subtotal: $${subtotal.toFixed(2)}`, 150, yPos);
        yPos += 10;
        doc.text(`Shipping: $${shippingCost.toFixed(2)}`, 150, yPos);
        yPos += 10;
        doc.text(`Discount: $${discount.toFixed(2)}`, 150, yPos);
        yPos += 10;
        doc.setFontSize(14);
        doc.text(`Total: $${total.toFixed(2)}`, 150, yPos);
        
        // Add footer
        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(10);
            doc.text('Thank you for shopping with REVANTH Shoes!', 105, 280, { align: 'center' });
        }
        
        // Save the PDF with a filename
        doc.save(`REVANTH_Invoice_${orderNumber}.pdf`);
        
    } catch (error) {
        console.error('Error generating PDF:', error);
        alert('There was an error generating your invoice. We\'ll email it to you instead.');
        sendInvoiceEmail();
    }
}

// Fallback function to handle email sending
function sendInvoiceEmail() {
    // In a real application, this would send a request to your server
    // to email the invoice to the customer
    
    // For now, we'll just simulate this with a success message
    alert('Your invoice has been sent to your email address.');
}