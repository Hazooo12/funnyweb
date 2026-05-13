/**
 * SAFEALL Notification System
 * Toast, Banner, and Popup notifications
 * 
 * Usage:
 * - order-success.html
 * - checkout.html
 * - my-orders.html
 */

window.SAFEALL_NOTIFY = window.SAFEALL_NOTIFY || {};

// ========== TOAST NOTIFICATIONS ==========

/**
 * Show toast notification
 * @param {string} message - Toast message
 * @param {string} type - Type: 'success', 'error', 'warning', 'info'
 * @param {number} duration - Duration in ms (default: 4000)
 */
window.SAFEALL_NOTIFY.toast = function(message, type = 'info', duration = 4000) {
    const container = this.getToastContainer();
    
    const toast = document.createElement('div');
    toast.className = `
        toast-notification 
        flex items-center gap-3 
        px-5 py-4 rounded-2xl 
        shadow-xl shadow-slate-200/50 dark:shadow-none
        border transform transition-all duration-300
        animate-slide-in-right
    `;
    
    // Type-based styles
    const styles = {
        success: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-400',
        error: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-700 dark:text-red-400',
        warning: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400',
        info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-400'
    };
    
    const icons = {
        success: 'codicon-checkmark-circle',
        error: 'codicon-error',
        warning: 'codicon-warning',
        info: 'codicon-info'
    };
    
    toast.classList.add(styles[type] || styles.info);
    toast.innerHTML = `
        <i class="codicon ${icons[type] || icons.info} text-xl"></i>
        <span class="font-bold text-sm">${message}</span>
        <button onclick="this.parentElement.remove()" class="ml-auto opacity-50 hover:opacity-100 transition-opacity">
            <i class="codicon codicon-x"></i>
        </button>
    `;
    
    container.appendChild(toast);
    
    // Auto remove
    setTimeout(() => {
        toast.classList.add('animate-slide-out-right');
        setTimeout(() => toast.remove(), 300);
    }, duration);
    
    return toast;
};

// Convenience methods
window.SAFEALL_NOTIFY.success = function(msg, dur) { return this.toast(msg, 'success', dur); };
window.SAFEALL_NOTIFY.error = function(msg, dur) { return this.toast(msg, 'error', dur); };
window.SAFEALL_NOTIFY.warning = function(msg, dur) { return this.toast(msg, 'warning', dur); };
window.SAFEALL_NOTIFY.info = function(msg, dur) { return this.toast(msg, 'info', dur); };

/**
 * Get or create toast container
 */
window.SAFEALL_NOTIFY.getToastContainer = function() {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'fixed top-20 right-4 z-[100] flex flex-col gap-3 max-w-sm w-full pointer-events-none';
        document.body.appendChild(container);
    }
    return container;
};

// ========== CONFIRMATION BANNER ==========

/**
 * Show confirmation banner
 * @param {object} options - Banner options
 */
window.SAFEALL_NOTIFY.confirmationBanner = function(options = {}) {
    const {
        orderId = '',
        customerName = '',
        customerPhone = '',
        customerEmail = '',
        total = 0,
        itemCount = 0,
        onClose = () => {}
    } = options;
    
    // Remove existing banner
    const existing = document.getElementById('confirmation-banner');
    if (existing) existing.remove();
    
    const banner = document.createElement('div');
    banner.id = 'confirmation-banner';
    banner.className = `
        fixed top-0 left-0 right-0 z-50
        bg-gradient-to-r from-green-600 to-emerald-600
        text-white py-4 px-6
        shadow-lg shadow-green-600/20
        transform transition-transform duration-500
        animate-slide-down
    `;
    
    banner.innerHTML = `
        <div class="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <i class="codicon codicon-check-circle text-2xl"></i>
                </div>
                <div>
                    <p class="font-black text-lg uppercase tracking-wide">Đơn hàng đã được ghi nhận!</p>
                    <p class="text-sm text-white/80">Mã đơn: <span class="font-black">#${orderId}</span> • ${itemCount} sản phẩm • <span class="font-black">${total.toLocaleString('vi-VN')}đ</span></p>
                </div>
            </div>
            <div class="flex items-center gap-3">
                <div class="text-right text-sm text-white/80">
                    ${customerEmail ? `<p>📧 ${customerEmail}</p>` : ''}
                    ${customerPhone ? `<p>📱 ${customerPhone}</p>` : ''}
                </div>
                <button onclick="SAFEALL_NOTIFY.closeConfirmationBanner()" 
                    class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                    <i class="codicon codicon-x"></i>
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(banner);
    
    // Auto close after 10 seconds
    setTimeout(() => this.closeConfirmationBanner(), 10000);
    
    return banner;
};

/**
 * Close confirmation banner
 */
window.SAFEALL_NOTIFY.closeConfirmationBanner = function() {
    const banner = document.getElementById('confirmation-banner');
    if (banner) {
        banner.classList.add('animate-slide-out-up');
        setTimeout(() => banner.remove(), 300);
    }
};

// ========== POPUP MODAL ==========

/**
 * Show popup modal
 * @param {object} options - Modal options
 */
window.SAFEALL_NOTIFY.popup = function(options = {}) {
    const {
        title = 'Thông báo',
        message = '',
        type = 'info', // success, error, warning, info
        confirmText = 'Đóng',
        cancelText = 'Hủy',
        onConfirm = () => {},
        onCancel = () => {},
        showCancel = false,
        persistent = false
    } = options;
    
    // Remove existing modal
    const existing = document.getElementById('notification-modal');
    if (existing) existing.remove();
    
    const overlay = document.createElement('div');
    overlay.id = 'notification-modal';
    overlay.className = `
        fixed inset-0 z-[200] 
        bg-black/50 backdrop-blur-sm
        flex items-center justify-center p-4
        animate-fade-in
    `;
    
    const icons = {
        success: { icon: 'codicon-checkmark-circle', color: 'text-green-500' },
        error: { icon: 'codicon-error-circle', color: 'text-red-500' },
        warning: { icon: 'codicon-warning', color: 'text-amber-500' },
        info: { icon: 'codicon-info', color: 'text-blue-500' }
    };
    
    const { icon, color } = icons[type] || icons.info;
    
    overlay.innerHTML = `
        <div class="bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl max-w-sm w-full p-8 text-center animate-scale-in">
            <div class="w-16 h-16 ${color} bg-current/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <i class="codicon ${icon} text-3xl"></i>
            </div>
            <h3 class="text-xl font-black text-slate-900 dark:text-white mb-2">${title}</h3>
            <p class="text-slate-500 mb-8">${message}</p>
            <div class="flex flex-col gap-3">
                <button id="modal-confirm-btn" class="w-full py-4 bg-primary text-white font-black rounded-2xl hover:opacity-90 transition-opacity">
                    ${confirmText}
                </button>
                ${showCancel ? `
                <button id="modal-cancel-btn" class="w-full py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-black rounded-2xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                    ${cancelText}
                </button>
                ` : ''}
            </div>
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    // Event handlers
    const confirmBtn = document.getElementById('modal-confirm-btn');
    if (confirmBtn) {
        confirmBtn.addEventListener('click', () => {
            onConfirm();
            this.closePopup();
        });
    }
    
    const cancelBtn = document.getElementById('modal-cancel-btn');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            onCancel();
            this.closePopup();
        });
    }
    
    // Close on overlay click (if not persistent)
    if (!persistent) {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                this.closePopup();
            }
        });
    }
    
    return overlay;
};

/**
 * Close popup modal
 */
window.SAFEALL_NOTIFY.closePopup = function() {
    const modal = document.getElementById('notification-modal');
    if (modal) {
        modal.classList.add('animate-fade-out');
        setTimeout(() => modal.remove(), 200);
    }
};

// ========== ORDER SUCCESS POPUP ==========

/**
 * Show order success popup
 * @param {object} orderData - Order data
 */
window.SAFEALL_NOTIFY.orderSuccess = function(orderData) {
    const {
        orderId = '',
        customerName = '',
        total = 0,
        items = [],
        paymentMethod = 'cod'
    } = orderData;
    
    const paymentLabels = {
        'cod': 'Thanh toán khi nhận hàng',
        'bank_transfer': 'Chuyển khoản ngân hàng',
        'vnpay': 'Ví VNPay',
        'momo': 'Ví MoMo',
        'zalopay': 'Ví ZaloPay'
    };
    
    const methodLabel = paymentLabels[paymentMethod] || paymentMethod;
    
    // Remove existing
    const existing = document.getElementById('order-success-popup');
    if (existing) existing.remove();
    
    const overlay = document.createElement('div');
    overlay.id = 'order-success-popup';
    overlay.className = `
        fixed inset-0 z-[200] 
        bg-gradient-to-br from-green-500/20 to-emerald-500/20
        backdrop-blur-md
        flex items-center justify-center p-4
        animate-fade-in
    `;
    
    overlay.innerHTML = `
        <div class="bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl max-w-lg w-full overflow-hidden animate-scale-in">
            <!-- Success Header -->
            <div class="bg-gradient-to-r from-green-500 to-emerald-500 p-8 text-center text-white">
                <div class="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                    <i class="codicon codicon-check-circle text-5xl"></i>
                </div>
                <h2 class="text-3xl font-black uppercase tracking-tight">Đặt hàng thành công!</h2>
                <p class="text-white/80 mt-2">Cảm ơn bạn đã tin tưởng SAFEALL</p>
            </div>
            
            <!-- Order Info -->
            <div class="p-8 space-y-6">
                <div class="text-center">
                    <p class="text-sm text-slate-400 font-bold uppercase tracking-widest">Mã đơn hàng</p>
                    <p class="text-3xl font-black text-primary">#${orderId}</p>
                </div>
                
                <div class="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 space-y-4">
                    <div class="flex justify-between">
                        <span class="text-slate-500 font-bold">Người nhận</span>
                        <span class="font-black text-slate-900 dark:text-white">${customerName}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-slate-500 font-bold">Sản phẩm</span>
                        <span class="font-black text-slate-900 dark:text-white">${items.length} vật dụng</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-slate-500 font-bold">Thanh toán</span>
                        <span class="font-bold text-slate-700 dark:text-slate-300">${methodLabel}</span>
                    </div>
                    <div class="flex justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
                        <span class="text-sm font-black uppercase text-slate-400">Tổng cộng</span>
                        <span class="text-2xl font-black text-primary">${total.toLocaleString('vi-VN')}đ</span>
                    </div>
                </div>
                
                <!-- Actions -->
                <div class="flex flex-col gap-3">
                    <a href="my-orders.html?phone=${orderData.customerPhone || ''}" 
                        class="flex items-center justify-center gap-2 w-full py-4 bg-secondary text-white font-black rounded-2xl hover:opacity-90 transition-all">
                        <i class="codicon codicon-sync"></i>
                        Theo dõi đơn hàng
                    </a>
                    <a href="index.html" 
                        class="flex items-center justify-center gap-2 w-full py-4 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-black rounded-2xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                        <i class="codicon codicon-home"></i>
                        Tiếp tục mua sắm
                    </a>
                </div>
                
                <p class="text-center text-xs text-slate-400">
                    Thông tin xác nhận đã được lưu lại. Bạn có thể tra cứu bằng Số điện thoại.
                </p>
            </div>
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    // Close on click
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            this.closeOrderSuccess();
        }
    });
    
    return overlay;
};

/**
 * Close order success popup
 */
window.SAFEALL_NOTIFY.closeOrderSuccess = function() {
    const popup = document.getElementById('order-success-popup');
    if (popup) {
        popup.classList.add('animate-fade-out');
        setTimeout(() => popup.remove(), 200);
    }
};

// ========== LOADING SPINNER ==========

/**
 * Show loading spinner
 * @param {string} message - Loading message
 */
window.SAFEALL_NOTIFY.loading = function(message = 'Đang xử lý...') {
    const existing = document.getElementById('loading-overlay');
    if (existing) existing.remove();
    
    const overlay = document.createElement('div');
    overlay.id = 'loading-overlay';
    overlay.className = `
        fixed inset-0 z-[300] 
        bg-white/80 dark:bg-slate-900/80
        backdrop-blur-sm
        flex items-center justify-center
        animate-fade-in
    `;
    
    overlay.innerHTML = `
        <div class="text-center">
            <div class="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
            <p class="font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest text-sm">${message}</p>
        </div>
    `;
    
    document.body.appendChild(overlay);
    return overlay;
};

/**
 * Close loading spinner
 */
window.SAFEALL_NOTIFY.closeLoading = function() {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
        overlay.classList.add('animate-fade-out');
        setTimeout(() => overlay.remove(), 200);
    }
};

console.log('[Notify] Notification system loaded');