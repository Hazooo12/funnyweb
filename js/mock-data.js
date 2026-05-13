/**
 * SAFEALL Mock Data
 * Dữ liệu mẫu để test và phát triển
 * 
 * Khi có backend thật:
 * 1. Đặt USE_MOCK = false
 * 2. Các API sẽ gọi endpoint thật
 */

window.SAFEALL_MOCK = window.SAFEALL_MOCK || {};

window.SAFEALL_MOCK.CONFIG = {
    // Bật/tắt mock data
    USE_MOCK: true,
    
    // Delay giả lập network (ms)
    NETWORK_DELAY: 500,
    
    // Bật/tắt log
    LOG: true
};

// ========== MOCK USERS ==========

window.SAFEALL_MOCK.USERS = [
    {
        id: 1,
        name: 'Nguyễn Văn A',
        phone: '0912345678',
        email: 'nguyenvana@email.com',
        track_pin_hash: '$2a$10$mockhash123456789',
        created_at: '2026-01-15T10:00:00Z'
    },
    {
        id: 2,
        name: 'Trần Thị B',
        phone: '0987654321',
        email: 'tranthib@email.com',
        track_pin_hash: '$2a$10$mockhash987654321',
        created_at: '2026-02-20T14:30:00Z'
    }
];

// ========== MOCK ORDERS ==========

window.SAFEALL_MOCK.ORDERS = [
    {
        id: 'sa-001',
        short_id: 'SA-001',
        user_id: 1,
        fulfillment_status: 'unfulfilled',
        payment_status: 'pending',
        payment_method: 'cod',
        subtotal: 450000,
        shipping_fee: 0,
        total: 450000,
        customer_note: '',
        created_at: '2026-04-20T10:30:00Z',
        updated_at: '2026-04-20T10:30:00Z',
        carrier_tracking_code: null,
        access_code: 'ACC001',
        full_name: 'Nguyễn Văn A',
        phone: '0912345678',
        address_line: '123 Đường Nguyễn Trãi, Quận 1, TP.HCM',
        email: 'nguyenvana@email.com',
        items: [
            { id: 1, product_id: 'p001', title: 'Bộ dụng cụ sơ cấp cứu', quantity: 2, unit_price: 150000, total_price: 300000 },
            { id: 2, product_id: 'p002', title: 'Băng keo y tế', quantity: 10, unit_price: 15000, total_price: 150000 }
        ]
    },
    {
        id: 'sa-002',
        short_id: 'SA-002',
        user_id: 1,
        fulfillment_status: 'processing',
        payment_status: 'paid',
        payment_method: 'bank_transfer',
        subtotal: 280000,
        shipping_fee: 0,
        total: 280000,
        customer_note: 'Giao giờ hành chính',
        created_at: '2026-04-18T15:45:00Z',
        updated_at: '2026-04-19T09:00:00Z',
        carrier_tracking_code: null,
        access_code: 'ACC002',
        full_name: 'Nguyễn Văn A',
        phone: '0912345678',
        address_line: '123 Đường Nguyễn Trãi, Quận 1, TP.HCM',
        email: 'nguyenvana@email.com',
        items: [
            { id: 3, product_id: 'p003', title: 'Nước rửa tay khử khuẩn', quantity: 4, unit_price: 70000, total_price: 280000 }
        ]
    },
    {
        id: 'sa-003',
        short_id: 'SA-003',
        user_id: 1,
        fulfillment_status: 'delivered',
        payment_status: 'paid',
        payment_method: 'cod',
        subtotal: 520000,
        shipping_fee: 0,
        total: 520000,
        customer_note: '',
        created_at: '2026-04-10T08:20:00Z',
        updated_at: '2026-04-15T16:00:00Z',
        carrier_tracking_code: 'VNPOST123456',
        access_code: 'ACC003',
        full_name: 'Nguyễn Văn A',
        phone: '0912345678',
        address_line: '123 Đường Nguyễn Trãi, Quận 1, TP.HCM',
        email: 'nguyenvana@email.com',
        items: [
            { id: 4, product_id: 'p004', title: 'Bình oxy y tế', quantity: 1, unit_price: 350000, total_price: 350000 },
            { id: 5, product_id: 'p005', title: 'Khẩu trang y tế', quantity: 20, unit_price: 8500, total_price: 170000 }
        ]
    },
    {
        id: 'sa-004',
        short_id: 'SA-004',
        user_id: 2,
        fulfillment_status: 'shipped',
        payment_status: 'paid',
        payment_method: 'vnpay',
        subtotal: 180000,
        shipping_fee: 0,
        total: 180000,
        customer_note: 'Giao nhanh',
        created_at: '2026-04-19T11:00:00Z',
        updated_at: '2026-04-20T14:00:00Z',
        carrier_tracking_code: 'GHN789012',
        access_code: 'ACC004',
        full_name: 'Trần Thị B',
        phone: '0987654321',
        address_line: '456 Đường Lê Lợi, Quận 3, TP.HCM',
        email: 'tranthib@email.com',
        items: [
            { id: 6, product_id: 'p006', title: 'Găng tay y tế', quantity: 10, unit_price: 18000, total_price: 180000 }
        ]
    }
];

// ========== MOCK API FUNCTIONS ==========

/**
 * Mock API: Tạo đơn hàng
 */
window.SAFEALL_MOCK.createOrder = async function(data) {
    await this._delay();
    
    const newOrder = {
        id: 'sa-' + Math.random().toString(36).substr(2, 6),
        short_id: 'SA-' + Math.random().toString(36).substr(2, 6).toUpperCase(),
        user_id: 1,
        fulfillment_status: 'unfulfilled',
        payment_status: 'pending',
        payment_method: data.paymentMethod || 'cod',
        subtotal: data.subtotal,
        shipping_fee: data.shippingFee || 0,
        total: data.total,
        customer_note: data.note || '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        carrier_tracking_code: null,
        access_code: 'ACC' + Math.random().toString(36).substr(2, 4).toUpperCase(),
        full_name: data.customer.name,
        phone: data.customer.phone,
        address_line: data.customer.address,
        email: data.customer.email || null,
        items: data.items.map((item, idx) => ({
            id: idx + 1,
            product_id: item.id,
            title: item.title,
            quantity: item.qty,
            unit_price: item.price,
            total_price: item.price * item.qty
        }))
    };
    
    this.ORDERS.unshift(newOrder);
    
    if (this.CONFIG.LOG) {
        console.log('[Mock] Created order:', newOrder.short_id);
    }
    
    return { success: true, orderId: newOrder.short_id };
};

/**
 * Mock API: Lấy đơn theo SĐT (nhanh)
 */
window.SAFEALL_MOCK.trackOrderQuick = async function(phone) {
    await this._delay();
    
    const normalizedPhone = phone.replace(/\D/g, '');
    const orders = this.ORDERS.filter(o => o.phone.includes(normalizedPhone));
    
    if (this.CONFIG.LOG) {
        console.log('[Mock] Quick search:', phone, 'found:', orders.length);
    }
    
    return {
        success: true,
        orders: orders.map(o => ({
            short_id: o.short_id,
            fulfillment_status: o.fulfillment_status,
            payment_status: o.payment_status,
            created_at: o.created_at,
            total: o.total
        }))
    };
};

/**
 * Mock API: Lấy đơn theo SĐT + PIN (chi tiết)
 */
window.SAFEALL_MOCK.trackOrderDetail = async function(phone, pin) {
    await this._delay();
    
    const normalizedPhone = phone.replace(/\D/g, '');
    const orders = this.ORDERS.filter(o => o.phone.includes(normalizedPhone));
    
    // Mock PIN verification (accept any 6-digit)
    if (!pin || pin.length !== 6) {
        return { success: false, message: 'Mã PIN không chính xác.' };
    }
    
    if (this.CONFIG.LOG) {
        console.log('[Mock] Detail search:', phone, 'found:', orders.length);
    }
    
    return {
        success: true,
        orders: orders
    };
};

/**
 * Mock API: Lấy chi tiết 1 đơn
 */
window.SAFEALL_MOCK.getOrder = async function(shortId) {
    await this._delay();
    
    const order = this.ORDERS.find(o => o.short_id === shortId);
    
    if (!order) {
        return { success: false, message: 'Không tìm thấy đơn hàng.' };
    }
    
    if (this.CONFIG.LOG) {
        console.log('[Mock] Get order:', shortId);
    }
    
    return {
        success: true,
        order: order
    };
};

/**
 * Mock API: Cập nhật trạng thái đơn
 */
window.SAFEALL_MOCK.updateOrderStatus = async function(payload) {
    await this._delay();
    
    const { id, paymentStatus, fulfillmentStatus, carrierTrackingCode } = payload;
    const order = this.ORDERS.find(o => o.short_id === id);
    
    if (!order) {
        return { success: false, message: 'Không tìm thấy đơn hàng.' };
    }
    
    if (paymentStatus) order.payment_status = paymentStatus;
    if (fulfillmentStatus) order.fulfillment_status = fulfillmentStatus;
    if (carrierTrackingCode) order.carrier_tracking_code = carrierTrackingCode;
    order.updated_at = new Date().toISOString();
    
    if (this.CONFIG.LOG) {
        console.log('[Mock] Updated order:', id, payload);
    }
    
    return { success: true, message: 'Cập nhật thành công.' };
};

/**
 * Delay helper
 */
window.SAFEALL_MOCK._delay = function() {
    return new Promise(resolve => setTimeout(resolve, this.CONFIG.NETWORK_DELAY));
};

/**
 * Reset mock data
 */
window.SAFEALL_MOCK.reset = function() {
    this.ORDERS = [...window.SAFEALL_MOCK.ORDERS];
    console.log('[Mock] Data reset');
};

console.log('[Mock] Mock data system loaded');