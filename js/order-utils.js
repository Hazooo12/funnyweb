/**
 * SAFEALL Order Utilities
 * Common functions for order-related pages
 * 
 * Usage:
 * - order-success.html
 * - my-orders.html
 * - admin.html (future)
 */

window.SAFEALL_ORDER = window.SAFEALL_ORDER || {};

// ========== CONSTANTS ==========

// Payment method labels
window.SAFEALL_ORDER.PAYMENT_METHODS = {
    'cod': 'Thanh toán khi nhận hàng (COD)',
    'bank_transfer': 'Chuyển khoản ngân hàng',
    'vnpay': 'Ví VNPay',
    'momo': 'Ví MoMo',
    'zalopay': 'Ví ZaloPay'
};

// Fulfillment status to step mapping
window.SAFEALL_ORDER.STATUS_TO_STEP = {
    'pending': 0,      // Chờ xác nhận
    'unfulfilled': 0,  // Chờ xác nhận
    'processing': 1,   // Đang xử lý
    'shipped': 2,      // Đang giao
    'delivered': 3,    // Hoàn tất
    'cancelled': -1    // Đã hủy
};

// Status display config
window.SAFEALL_ORDER.STATUS_CONFIG = {
    'pending': { 
        label: 'Chờ thanh toán', 
        bg: 'bg-amber-100', 
        text: 'text-amber-700', 
        icon: 'credit-card' 
    },
    'paid': { 
        label: 'Đã thanh toán', 
        bg: 'bg-green-100', 
        text: 'text-green-700', 
        icon: 'check' 
    },
    'unfulfilled': { 
        label: 'Chờ xử lý', 
        bg: 'bg-slate-100', 
        text: 'text-slate-600', 
        icon: 'clock' 
    },
    'processing': { 
        label: 'Đang chuẩn bị', 
        bg: 'bg-blue-100', 
        text: 'text-blue-700', 
        icon: 'package' 
    },
    'shipped': { 
        label: 'Đang vận chuyển', 
        bg: 'bg-purple-100', 
        text: 'text-purple-700', 
        icon: 'rocket' 
    },
    'delivered': { 
        label: 'Đã giao hàng', 
        bg: 'bg-emerald-100', 
        text: 'text-emerald-700', 
        icon: 'pass-filled' 
    },
    'cancelled': { 
        label: 'Đã hủy', 
        bg: 'bg-red-100', 
        text: 'text-red-700', 
        icon: 'error' 
    }
};

// Timeline steps
window.SAFEALL_ORDER.STEPS = [
    { label: 'Chờ xác nhận', icon: 'clock' },
    { label: 'Đang xử lý', icon: 'package' },
    { label: 'Đang giao', icon: 'rocket' },
    { label: 'Hoàn tất', icon: 'check' }
];

// ========== FORMAT FUNCTIONS ==========

/**
 * Format number to Vietnamese currency
 * @param {number|string} amount - Amount to format
 * @returns {string} Formatted currency string
 */
window.SAFEALL_ORDER.formatCurrency = function(amount) {
    const num = parseFloat(amount || 0);
    if (isNaN(num)) return '0đ';
    return num.toLocaleString('vi-VN') + 'đ';
};

/**
 * Format date to Vietnamese format
 * @param {string|Date} dateString - Date to format
 * @param {object} options - Format options
 * @returns {string} Formatted date string
 */
window.SAFEALL_ORDER.formatDate = function(dateString, options = {}) {
    if (!dateString) return '---';
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '---';
    
    const defaultOptions = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    };
    
    const mergedOptions = { ...defaultOptions, ...options };
    return date.toLocaleDateString('vi-VN', mergedOptions);
};

/**
 * Format time to Vietnamese format
 * @param {string|Date} dateString - Date to format
 * @returns {string} Formatted time string
 */
window.SAFEALL_ORDER.formatTime = function(dateString) {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    
    return date.toLocaleTimeString('vi-VN', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
};

/**
 * Format full datetime
 * @param {string|Date} dateString - Date to format
 * @returns {string} Formatted datetime string
 */
window.SAFEALL_ORDER.formatDateTime = function(dateString) {
    if (!dateString) return '---';
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '---';
    
    const dateStr = this.formatDate(dateString);
    const timeStr = this.formatTime(dateString);
    return timeStr ? `${dateStr} lúc ${timeStr}` : dateStr;
};

// ========== STATUS FUNCTIONS ==========

/**
 * Get payment method display label
 * @param {string} method - Payment method code
 * @returns {string} Display label
 */
window.SAFEALL_ORDER.getPaymentMethodLabel = function(method) {
    if (!method) return 'Thanh toán khi nhận hàng (COD)';
    const m = method.toLowerCase();
    return this.PAYMENT_METHODS[m] || m.replace(/_/g, ' ').toUpperCase();
};

/**
 * Get order status display config
 * @param {string} status - Order status
 * @returns {object} Status config object
 */
window.SAFEALL_ORDER.getStatusConfig = function(status) {
    const s = (status || 'unfulfilled').toLowerCase();
    return this.STATUS_CONFIG[s] || this.STATUS_CONFIG['unfulfilled'];
};

/**
 * Get status text for display
 * @param {string} status - Order status
 * @returns {string} Status label
 */
window.SAFEALL_ORDER.getStatusText = function(status) {
    return this.getStatusConfig(status).label;
};

/**
 * Get step index from fulfillment status
 * @param {string} status - Fulfillment status
 * @returns {number} Step index (0-3)
 */
window.SAFEALL_ORDER.getStatusStep = function(status) {
    const s = (status || 'unfulfilled').toLowerCase();
    return this.STATUS_TO_STEP[s] ?? 0;
};

// ========== QUERY PARAM FUNCTIONS ==========

/**
 * Get query parameter value
 * @param {string} param - Parameter name
 * @returns {string|null} Parameter value or null
 */
window.SAFEALL_ORDER.getQueryParam = function(param) {
    if (!param) return null;
    const params = new URLSearchParams(window.location.search);
    return params.get(param);
};

/**
 * Get phone from query params
 * @returns {string|null} Phone number or null
 */
window.SAFEALL_ORDER.getPhoneFromQuery = function() {
    return this.getQueryParam('phone');
};

/**
 * Get order ID from query params
 * @returns {string|null} Order ID or null
 */
window.SAFEALL_ORDER.getOrderIdFromQuery = function() {
    return this.getQueryParam('order_id') || this.getQueryParam('id');
};

// ========== RENDER FUNCTIONS ==========

/**
 * Render order items list
 * @param {array} items - Array of order items
 * @returns {string} HTML string
 */
window.SAFEALL_ORDER.renderItems = function(items) {
    if (!items || !items.length) {
        return '<p class="text-slate-400 text-sm">Không có sản phẩm</p>';
    }
    
    return items.map(item => `
        <div class="flex justify-between items-center group">
            <div class="flex items-center gap-4">
                <div class="size-12 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center font-black text-primary">${item.quantity || item.qty || 1}x</div>
                <span class="font-bold text-slate-700 dark:text-slate-300 group-hover:text-primary transition-colors">${item.title || 'Sản phẩm'}</span>
            </div>
            <span class="font-black text-slate-900 dark:text-white">${this.formatCurrency(item.total_price || (item.price * (item.quantity || item.qty || 1)))}</span>
        </div>
    `).join('');
};

/**
 * Render price breakdown
 * @param {object} order - Order object with subtotal, shipping_fee, total
 * @returns {string} HTML string
 */
window.SAFEALL_ORDER.renderPriceBreakdown = function(order) {
    const subtotal = order.subtotal || order.total || 0;
    const shippingFee = order.shipping_fee || 0;
    const total = order.total || 0;
    const paymentMethod = order.payment_method || order.paymentMethod;
    
    return `
        <div class="pt-6 mt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
            <div class="flex justify-between items-center">
                <span class="text-sm font-bold text-slate-500">Tạm tính</span>
                <span class="font-black text-slate-700 dark:text-slate-300">${this.formatCurrency(subtotal)}</span>
            </div>
            <div class="flex justify-between items-center">
                <span class="text-sm font-bold text-slate-500">Phí vận chuyển</span>
                <span class="font-black ${shippingFee === 0 ? 'text-green-600' : 'text-slate-700 dark:text-slate-300'}">
                    ${shippingFee === 0 ? 'Miễn phí' : this.formatCurrency(shippingFee)}
                </span>
            </div>
            <div class="flex justify-between items-center pt-4 border-t border-slate-200 dark:border-slate-700">
                <div class="flex flex-col">
                    <span class="text-[10px] font-black uppercase tracking-widest text-slate-400">Tổng cộng</span>
                    <span class="text-xs font-bold text-slate-500">${this.getPaymentMethodLabel(paymentMethod)}</span>
                </div>
                <span class="text-4xl font-black text-primary tracking-tighter">${this.formatCurrency(total)}</span>
            </div>
        </div>
    `;
};

/**
 * Render timeline with active step
 * @param {string} status - Current fulfillment status
 * @param {string} containerSelector - CSS selector for container
 */
window.SAFEALL_ORDER.renderTimeline = function(status, containerSelector = '.timeline-container') {
    const container = document.querySelector(containerSelector);
    if (!container) return;
    
    const stepIndex = this.getStatusStep(status);
    const steps = container.querySelectorAll('.timeline-step');
    
    steps.forEach((el, idx) => {
        const circle = el.querySelector('.step-circle');
        const label = el.querySelector('.step-label');
        
        // Reset classes
        circle.className = 'step-circle size-6 rounded-full flex items-center justify-center transition-all';
        label.className = 'step-label text-[10px] font-black uppercase transition-colors';
        
        if (idx < stepIndex) {
            // Completed steps
            circle.classList.add('bg-green-500', 'text-white');
            circle.innerHTML = '<i class="codicon codicon-check text-xs"></i>';
            label.classList.add('text-green-600');
        } else if (idx === stepIndex) {
            // Current step (active)
            if (status === 'cancelled') {
                circle.classList.add('bg-red-500', 'text-white');
                label.classList.add('text-red-600');
            } else {
                circle.classList.add('bg-primary', 'text-white', 'animate-pulse');
                circle.innerHTML = '<div class="size-2 bg-white rounded-full"></div>';
                label.classList.add('text-primary');
            }
        } else {
            // Future steps (inactive)
            circle.classList.add('bg-slate-200', 'dark:bg-slate-800');
            label.classList.add('text-slate-400');
        }
    });
};

/**
 * Update timeline from status
 * @param {string} status - Fulfillment status
 */
window.SAFEALL_ORDER.updateTimelineFromStatus = function(status) {
    this.renderTimeline(status, '.timeline-steps');
};

// ========== VALIDATION FUNCTIONS ==========

/**
 * Check if order data is valid
 * @param {object} order - Order object
 * @returns {object} { valid: boolean, errors: string[] }
 */
window.SAFEALL_ORDER.validateOrder = function(order) {
    const errors = [];
    
    if (!order) {
        errors.push('Không có dữ liệu đơn hàng');
        return { valid: false, errors };
    }
    
    if (!order.orderId && !order.short_id) {
        errors.push('Thiếu mã đơn hàng');
    }
    
    if (!order.customer) {
        errors.push('Thiếu thông tin khách hàng');
    } else {
        if (!order.customer.name) errors.push('Thiếu tên người nhận');
        if (!order.customer.phone) errors.push('Thiếu số điện thoại');
        if (!order.customer.address) errors.push('Thiếu địa chỉ');
    }
    
    if (!order.items || !order.items.length) {
        errors.push('Đơn hàng không có sản phẩm');
    }
    
    if (order.total === undefined || order.total === null) {
        errors.push('Thiếu tổng tiền');
    }
    
    return { 
        valid: errors.length === 0, 
        errors 
    };
};

/**
 * Get last order from sessionStorage
 * @returns {object|null} Order data or null
 */
window.SAFEALL_ORDER.getLastOrder = function() {
    try {
        const data = sessionStorage.getItem('safeall_last_order');
        if (!data) return null;
        return JSON.parse(data);
    } catch (e) {
        console.error('[OrderUtils] Error reading last order:', e);
        return null;
    }
};

/**
 * Clear last order from sessionStorage
 */
window.SAFEALL_ORDER.clearLastOrder = function() {
    try {
        sessionStorage.removeItem('safeall_last_order');
    } catch (e) {
        console.error('[OrderUtils] Error clearing last order:', e);
    }
};

// ========== FALLBACK UI ==========

/**
 * Show error/fallback UI
 * @param {string} message - Error message
 * @param {string} suggestion - Suggestion message
 */
window.SAFEALL_ORDER.showFallback = function(message, suggestion) {
    return `
        <div class="flex flex-col items-center justify-center py-20 text-center">
            <div class="size-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
                <i class="codicon codicon-warning text-4xl text-slate-300 dark:text-slate-600"></i>
            </div>
            <h3 class="text-xl font-black text-slate-700 dark:text-slate-300 mb-2">${message}</h3>
            <p class="text-slate-500 text-sm max-w-md">${suggestion}</p>
            <div class="flex gap-4 mt-8">
                <a href="index.html" class="px-6 py-3 bg-primary text-white font-black rounded-full text-sm">
                    Về trang chủ
                </a>
                <a href="my-orders.html" class="px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-black rounded-full text-sm">
                    Tra cứu đơn
                </a>
            </div>
        </div>
    `;
};

console.log('[OrderUtils] Loaded successfully');