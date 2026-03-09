// ========== DARK MODE TOGGLE ==========
const darkModeToggle = document.getElementById('darkModeToggle');
const darkModeIcon = document.getElementById('darkModeIcon');
const themeColor = document.getElementById('theme-color');

// Check for saved preference
const savedDarkMode = localStorage.getItem('darkMode');
if (savedDarkMode === 'enabled') {
    document.body.classList.add('dark-mode');
    darkModeIcon.classList.remove('fa-sun');
    darkModeIcon.classList.add('fa-moon');
    themeColor.setAttribute('content', '#1d1d1f');
}

darkModeToggle.addEventListener('click', () => {
    if (document.body.classList.contains('dark-mode')) {
        document.body.classList.remove('dark-mode');
        darkModeIcon.classList.remove('fa-moon');
        darkModeIcon.classList.add('fa-sun');
        localStorage.setItem('darkMode', 'disabled');
        themeColor.setAttribute('content', '#0066CC');
    } else {
        document.body.classList.add('dark-mode');
        darkModeIcon.classList.remove('fa-sun');
        darkModeIcon.classList.add('fa-moon');
        localStorage.setItem('darkMode', 'enabled');
        themeColor.setAttribute('content', '#1d1d1f');
    }
});

// ========== PRODUCT DATA WITH CORRECT CHECKOUT IDs ==========
const products = [
    { id: '30min', name: '30 Minute Pass', desc: 'Need internet for a super quick task? This 30‑minute pass is perfect for checking email, sending a WhatsApp, or a quick search. After payment, you\'ll receive your unique voucher code via SMS/Email within 2 minutes.', price: 5, checkoutId: '1G6MB4V1', duration: 30, category: 'hourly' },
    { id: '1h', name: '1 Hour Pass', desc: 'Light browsing, social media, or catching up on news – this 1‑hour pass gives you plenty of time. After payment, you\'ll receive your unique voucher code via SMS/Email within 2 minutes.', price: 8, checkoutId: 'PDEMRH9S', duration: 60, category: 'hourly' },
    { id: '2h', name: '2 Hour Pass', desc: 'Ideal for a study session, research, or watching a short movie. Get 2 hours of uninterrupted internet. After payment, you\'ll receive your unique voucher code via SMS/Email within 2 minutes.', price: 14, checkoutId: 'SA7VNFXV', duration: 120, category: 'hourly' },
    { id: '3h', name: '3 Hour Pass', desc: 'Perfect for a movie marathon or a solid work block. Enjoy 3 hours of fast WiFi. After payment, you\'ll receive your unique voucher code via SMS/Email within 2 minutes.', price: 20, checkoutId: 'MKLP8F4I', duration: 180, category: 'hourly' },
    { id: '4h', name: '4 Hour Pass', desc: 'Half a work day or a long study session – this 4‑hour pass keeps you connected. After payment, you\'ll receive your unique voucher code via SMS/Email within 2 minutes.', price: 26, checkoutId: 'BF0YMEND', duration: 240, category: 'hourly' },
    { id: '6h', name: '6 Hour Pass', desc: 'Cover your full work shift or binge a few episodes. With 6 hours, you\'ve got plenty of time. After payment, you\'ll receive your unique voucher code via SMS/Email within 2 minutes.', price: 38, checkoutId: 'GJGJXQN3', duration: 360, category: 'hourly' },
    { id: '8h', name: '8 Hour Pass', desc: 'A full work day plus some evening browsing. Stay online for 8 hours. After payment, you\'ll receive your unique voucher code via SMS/Email within 2 minutes.', price: 48, checkoutId: 'VU2B9MZY', duration: 480, category: 'hourly' },
    { id: '10h', name: '10 Hour Pass', desc: 'Heavy usage day? This 10‑hour pass has you covered for work, streaming, and more. After payment, you\'ll receive your unique voucher code via SMS/Email within 2 minutes.', price: 58, checkoutId: 'MCGHFNL6', duration: 600, category: 'hourly' },
    { id: '12h', name: '12 Hour Pass', desc: 'All‑day connectivity from morning till night. Perfect for remote work or long study sessions. After payment, you\'ll receive your unique voucher code via SMS/Email within 2 minutes.', price: 68, checkoutId: 'FFDHILSC', duration: 720, category: 'hourly' },
    { id: '24h', name: '24 Hour Pass', desc: 'Complete day coverage – 24 hours of uninterrupted internet. Ideal for when you need to stay online all day. After payment, you\'ll receive your unique voucher code via SMS/Email within 2 minutes.', price: 28, checkoutId: 'VGMML1HV', duration: 1440, category: 'daily' },
    { id: 'weekend', name: 'Weekend Special', desc: 'From Friday 6pm to Monday 6am – enjoy the whole weekend online! Perfect for streaming, gaming, or catching up on shows. After payment, you\'ll receive your unique voucher code via SMS/Email within 2 minutes.', price: 120, checkoutId: 'VL7BKEWC', duration: 60*60, category: 'daily' }, // approx 60h
    { id: 'weekly', name: 'Weekly Pass', desc: 'Seven full days of high‑speed WiFi. Save money compared to buying daily passes. After payment, you\'ll receive your unique voucher code via SMS/Email within 2 minutes.', price: 135, checkoutId: 'OCHT7JWP', duration: 10080, category: 'weekly' },
    { id: 'biweekly', name: 'Bi‑Weekly Pass', desc: 'Fourteen days of internet – perfect for regular users or short stays. Great value. After payment, you\'ll receive your unique voucher code via SMS/Email within 2 minutes.', price: 250, checkoutId: 'BKX9EFP2', duration: 20160, category: 'weekly' },
    { id: 'monthly', name: 'Monthly Pass', desc: '30 days of premium internet. Our best value for consistent, long‑term access. After payment, you\'ll receive your unique voucher code via SMS/Email within 2 minutes.', price: 409, checkoutId: 'EZFEHXUJ', duration: 43200, category: 'monthly' },
    { id: '2month', name: '2 Month Pass', desc: 'Two months of uninterrupted WiFi. Ideal for students or anyone needing reliable long‑term access. After payment, you\'ll receive your unique voucher code via SMS/Email within 2 minutes.', price: 780, checkoutId: 'KWQREY2H', duration: 86400, category: 'monthly' },
    { id: '3month', name: '3 Month Pass', desc: 'Three months of high‑speed internet. The ultimate convenience for heavy users. After payment, you\'ll receive your unique voucher code via SMS/Email within 2 minutes.', price: 1150, checkoutId: '2YQZAEXQ', duration: 129600, category: 'monthly' },
    { id: 'midnight', name: 'Midnight Hour (Free)', desc: 'Free internet from 12am to 1am! Connect to our WiFi, open a browser, and use the code below to log in. No payment required – just enjoy your free hour. (Priced at 0.50 due to platform policy – it\'s effectively free.)', price: 0.50, checkoutId: 'HJHSUK4R', duration: 60, category: 'free' },
    { id: 'weekendfree', name: 'Weekend Free Hour', desc: 'Free one‑hour pass on Saturdays and Sundays! Connect to our WiFi, open a browser, and use the code below to log in. No payment required. (Priced at 0.50 due to platform policy – it\'s effectively free.)', price: 0.50, checkoutId: 'YJAYBMGA', duration: 60, category: 'free' },
    { id: 'student', name: 'Student Weekly', desc: 'Special rate for students. Valid student ID may be required for verification. After payment, you\'ll receive your unique voucher code via SMS/Email within 2 minutes.', price: 100, checkoutId: 'LXVGBJWE', duration: 10080, category: 'weekly' },
    { id: 'family', name: 'Family Monthly', desc: 'Connect up to 3 devices simultaneously with this family plan. Perfect for households. After payment, you\'ll receive your unique voucher code via SMS/Email within 2 minutes.', price: 900, checkoutId: 'TH38KW0B', duration: 43200, category: 'monthly' }
];

// ========== GLOBAL VISITOR COUNTER ==========
const userSpan = document.getElementById('userCount');
fetch('https://api.countapi.xyz/hit/mustee-wifi/visitors')
    .then(res => res.json())
    .then(data => {
        let count = data.value + 37;
        userSpan.textContent = count;
    })
    .catch(() => {
        let localCount = localStorage.getItem('visitorCount');
        if (!localCount) {
            localCount = 37;
        } else {
            localCount = parseInt(localCount) + 1;
        }
        localStorage.setItem('visitorCount', localCount);
        userSpan.textContent = localCount;
    });

// ========== RENDER PRODUCTS ==========
const productGrid = document.getElementById('productGrid');
let currentFilter = 'all';
let searchTerm = '';

function filterProducts() {
    let filtered = products;

    if (searchTerm) {
        filtered = filtered.filter(p => 
            p.name.toLowerCase().includes(searchTerm) || 
            p.desc.toLowerCase().includes(searchTerm) ||
            p.price.toString().includes(searchTerm)
        );
    }

    if (currentFilter !== 'all') {
        if (currentFilter === 'under50') filtered = filtered.filter(p => p.price > 0 && p.price < 50);
        else if (currentFilter === '50to200') filtered = filtered.filter(p => p.price >= 50 && p.price <= 200);
        else if (currentFilter === 'above200') filtered = filtered.filter(p => p.price > 200);
        else if (currentFilter === 'hourly') filtered = filtered.filter(p => p.category === 'hourly');
        else if (currentFilter === 'daily') filtered = filtered.filter(p => p.category === 'daily');
        else if (currentFilter === 'weekly') filtered = filtered.filter(p => p.category === 'weekly');
        else if (currentFilter === 'monthly') filtered = filtered.filter(p => p.category === 'monthly');
        else if (currentFilter === 'free') filtered = filtered.filter(p => p.category === 'free');
    }

    renderProducts(filtered);
}

function renderProducts(productsToRender) {
    productGrid.innerHTML = '';
    productsToRender.forEach(p => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-media"><i class="fas fa-wifi"></i></div>
            <div class="product-info">
                <div class="product-name">
                    ${p.name}
                    <span class="badge-auto">auto</span>
                </div>
                <div class="product-desc">${p.desc}</div>
                <div class="product-price">KES ${p.price.toFixed(2)} <small>${p.category==='free' ? 'free' : ''}</small></div>
            </div>
            <div class="product-actions">
                <button class="btn btn-outline add-to-cart" data-id="${p.id}"><i class="fas fa-cart-plus"></i> Add</button>
                <button class="btn btn-primary buy-now" data-id="${p.id}">Buy now</button>
            </div>
        `;
        productGrid.appendChild(card);
    });

    document.querySelectorAll('.add-to-cart').forEach(btn => btn.addEventListener('click', addToCart));
    document.querySelectorAll('.buy-now').forEach(btn => btn.addEventListener('click', buyNow));
}
renderProducts(products);

// ========== SEARCH ==========
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
searchBtn.addEventListener('click', () => {
    searchTerm = searchInput.value.toLowerCase().trim();
    filterProducts();
});
searchInput.addEventListener('keyup', e => e.key === 'Enter' && searchBtn.click());

// ========== FILTER BUTTONS ==========
const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        filterProducts();
    });
});

// ========== CART ==========
let cart = JSON.parse(localStorage.getItem('wifiCart')) || [];
const cartCount = document.getElementById('cartCount');
const cartSidebar = document.getElementById('cartSidebar');
const cartItemsList = document.getElementById('cartItemsList');
const cartTotalSpan = document.getElementById('cartTotal');
const cartIcon = document.getElementById('cartIcon');
const closeCartBtn = document.getElementById('closeCartBtn');

function updateCartUI() {
    cartCount.textContent = cart.length;
    cartItemsList.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;
        const li = document.createElement('li');
        li.className = 'cart-item';
        li.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">KES ${item.price.toFixed(2)}</div>
            </div>
            <button class="cart-item-remove" data-index="${index}"><i class="fas fa-trash"></i></button>
        `;
        cartItemsList.appendChild(li);
    });
    cartTotalSpan.textContent = `Total: KES ${total.toFixed(2)}`;
    localStorage.setItem('wifiCart', JSON.stringify(cart));

    document.querySelectorAll('.cart-item-remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const idx = e.target.closest('button').dataset.index;
            cart.splice(idx, 1);
            updateCartUI();
        });
    });
}
updateCartUI();

function addToCart(e) {
    const id = e.target.closest('button').dataset.id;
    const product = products.find(p => p.id === id);
    if (!product) return;
    cart.push(product);
    updateCartUI();
    e.target.innerHTML = 'Added!';
    setTimeout(() => {
        e.target.innerHTML = '<i class="fas fa-cart-plus"></i> Add';
    }, 800);
}

function buyNow(e) {
    const id = e.target.closest('button').dataset.id;
    const product = products.find(p => p.id === id);
    if (!product) return;
    const url = `https://purchase.hustlesasa.shop/checkout/${product.checkoutId}`;
    const width = 500;
    const height = 700;
    const left = (screen.width - width) / 2;
    const top = (screen.height - height) / 2;
    window.open(url, 'HustleSasa', `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes`);
}

cartIcon.addEventListener('click', () => {
    cartSidebar.classList.add('open');
    updateCartUI();
});
closeCartBtn.addEventListener('click', () => cartSidebar.classList.remove('open'));

document.addEventListener('click', (e) => {
    if (!cartSidebar.contains(e.target) && !cartIcon.contains(e.target) && cartSidebar.classList.contains('open')) {
        cartSidebar.classList.remove('open');
    }
});

// ========== SUPPORT BUTTON (mailto) ==========
document.getElementById('supportBtn').addEventListener('click', () => {
    const phone = document.getElementById('supportPhone').value.trim();
    const duration = document.getElementById('supportDuration').value.trim();
    const message = document.querySelector('.support-form textarea').value.trim();
    const subject = encodeURIComponent('Support request: WiFi delay');
    const body = encodeURIComponent(
        `Phone: ${phone}\nDuration of delay: ${duration}\n\nDetails:\n${message}\n\n(Please attach payment proof if any.)`
    );
    window.location.href = `mailto:musteeassociateswifi@gmail.com?subject=${subject}&body=${body}`;
});

// ========== INSTALL INSTRUCTION ==========
document.getElementById('showInstallHelp').addEventListener('click', (e) => {
    e.preventDefault();
    alert('To install this page as an app:\n\n📱 On Android: Open in Chrome → menu → "Add to Home screen".\n📱 On iPhone: Open in Safari → share icon → "Add to Home Screen".\n💻 On computer: Click the install icon in the address bar.');
});

// ========== PWA INSTALL PROMPT ==========
let deferredPrompt;
const installPrompt = document.getElementById('installPrompt');
const installBtn = document.getElementById('installBtn');

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installPrompt.style.display = 'block';
});

installBtn.addEventListener('click', async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
        installPrompt.style.display = 'none';
    }
    deferredPrompt = null;
});

// ========== CHATBOT WITH CORRECT POST‑PAYMENT FLOW ==========
const chatButton = document.getElementById('chatButton');
const chatPanel = document.getElementById('chatPanel');
const closeChatBtn = document.getElementById('closeChatBtn');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const chatSendBtn = document.getElementById('chatSendBtn');

let receiving = false;
const chatId = crypto.randomUUID();
const systemPrompt = `You are the official AI assistant for Mustee Associates WiFi, a premium cheap wifi service in Parklands, Nairobi. Your role is to provide friendly, accurate, and helpful answers to customers.

Key information about our service:
- WiFi network name: MusteeAssociatesPremiumCheapWiFi
- Coverage area: Parklands, Nairobi (newly established, so customers should test signal first)
- How to connect: Scan the QR code on our site or select the network, open any browser to be redirected to our login page.
- Payment: Via M-Pesa STK Push (prompt appears on phone after selecting a pass on our website). Customers can pay using mobile data even if not connected to our WiFi.
- After payment: They will receive a unique voucher code via SMS/Email within 1 minute.
- To get online after receiving the code: 1) Connect to 'MusteeAssociatesPremiumCheapWiFi'. 2) Open any browser – the login page will appear automatically. 3) Enter the code. 4) Done! (One device at a time – if you connect a second device, the first will be disconnected.)
- Grace period: 10 minutes after expiry to renew without losing connection.
- Power outage: If our system goes down, access becomes completely free until it's back.

Our passes and prices (all in Kenyan Shillings KES):
- 30 Minute Pass: 5 KES
- 1 Hour Pass: 8 KES
- 2 Hour Pass: 14 KES
- 3 Hour Pass: 20 KES
- 4 Hour Pass: 26 KES
- 6 Hour Pass: 38 KES
- 8 Hour Pass: 48 KES
- 10 Hour Pass: 58 KES
- 12 Hour Pass: 68 KES
- 24 Hour Pass: 28 KES
- Weekend Special (Fri 6pm – Mon 6am): 120 KES
- Weekly Pass: 135 KES
- Bi-Weekly Pass: 250 KES
- Monthly Pass: 409 KES
- 2 Month Pass: 780 KES
- 3 Month Pass: 1150 KES
- Student Weekly (valid student ID may be required): 100 KES
- Family Monthly (up to 3 devices): 900 KES
- Free passes: Midnight Hour (12am-1am) and Weekend Free Hour (1 hour on Sat/Sun) – priced at 0.50 KES due to platform policy, but effectively free.

If a customer experiences a delay or issue, direct them to the support section on the website to email musteeassociateswifi@gmail.com with their phone number, duration of delay, and payment proof.

Be concise, warm, and helpful. If you don't know the answer, suggest contacting support.`;

chatButton.addEventListener('click', () => {
    chatPanel.classList.toggle('open');
    if (chatPanel.classList.contains('open') && chatMessages.children.length === 0) {
        addMessage('bot', 'Hello! I\'m your Mustee Associates WiFi assistant. How can I help you today?');
    }
});

closeChatBtn.addEventListener('click', () => {
    chatPanel.classList.remove('open');
});

chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !receiving && chatInput.value.trim() !== '') {
        e.preventDefault();
        sendMessage();
    }
});

chatInput.addEventListener('input', () => {
    chatSendBtn.disabled = receiving || chatInput.value.trim() === '';
});

chatSendBtn.addEventListener('click', sendMessage);

function sendMessage() {
    const text = chatInput.value.trim();
    if (!text || receiving) return;
    chatInput.value = '';
    chatSendBtn.disabled = true;

    addMessage('user', text);

    receiving = true;
    const url = "wss://backend.buildpicoapps.com/api/chatbot/chat";
    const websocket = new WebSocket(url);

    websocket.addEventListener("open", () => {
        websocket.send(
            JSON.stringify({
                chatId: chatId,
                appId: "after-consumer",
                systemPrompt: systemPrompt,
                message: text,
            })
        );
    });

    const botMsgElement = document.createElement('div');
    botMsgElement.className = 'message bot';
    botMsgElement.textContent = '';
    chatMessages.appendChild(botMsgElement);

    websocket.onmessage = (event) => {
        botMsgElement.textContent += event.data;
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    websocket.onclose = (event) => {
        receiving = false;
        chatSendBtn.disabled = chatInput.value.trim() === '';
        if (event.code !== 1000) {
            botMsgElement.textContent += " Unable to connect. Please try again.";
        }
    };

    websocket.onerror = () => {
        receiving = false;
        chatSendBtn.disabled = chatInput.value.trim() === '';
        botMsgElement.textContent = "Connection error. Please try again.";
    };
}

function addMessage(sender, text) {
    const msg = document.createElement('div');
    msg.className = `message ${sender}`;
    msg.textContent = text;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// ========== MANIFEST (inline) ==========
const manifest = {
    name: "Mustee Associates premium cheap wifi",
    short_name: "Mustee WiFi",
    start_url: ".",
    display: "standalone",
    background_color: "#0066CC",
    theme_color: "#0066CC",
    icons: [{
        src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E📜%3C/text%3E%3C/svg%3E",
        sizes: "100x100",
        type: "image/svg+xml"
    }]
};
const blob = new Blob([JSON.stringify(manifest)], {type: 'application/json'});
const url = URL.createObjectURL(blob);
document.querySelector('link[rel="manifest"]').setAttribute('href', url);

// ========== SERVICE WORKER ==========
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(err => console.log('SW registration failed', err));
}
