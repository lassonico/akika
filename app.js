console.log('App.js cargado correctamente.');

const FORMSPREE_URL = 'https://formspree.io/f/mgakoryd';

// Catálogo de productos de Akika
const PRODUCTS = [
    {
        id: 'kup-1',
        name: 'Vasito cuchariable de brownie con crema',
        category: 'kupkakes',
        tag: 'Más Vendido',
        price: 14000,
        presentation: 'Vaso de 90/100g',
        description: 'Vaso de 9 Oz con trocitos de brownie de 90/100g y crema batida receta casera 100% artesanal endulzada con alulosa.',
        macros: '2g Carbs Netos • 0g Azúcar',
        image: './assets/vasito.jpg'
    },
    {
        id: 'kup-2',
        name: 'Vasito cuchariable de brownie con café Juan Valdez',
        category: 'kupkakes',
        tag: 'Nuevo',
        price: 15000,
        presentation: 'Vaso de 90/100g',
        description: 'Vaso de 9 Oz con trocitos de brownie de 90/100g y crema de café Juan Valdez receta casera 100% artesanal endulzada con alulosa.',
        macros: '2g Carbs Netos • 0g Azúcar',
        image: './assets/vasitoCafe.webp'
    },
    {
        id: 'bro-1',
        name: 'Fudgy Brownie Doble Cacao Amargo',
        category: 'brownies',
        tag: 'Favorito Keto',
        price: 12000,
        presentation: 'Unidad de 90/100g',
        description: 'Textura ultra húmeda tipo fudge por dentro y corteza crujiente por fuera. Elaborado con chocolate 70% cacao y alulosa.',
        macros: '2.2g Carbs Netos • Sin Trigo',
        image: './assets/brownie.jpg'
    },
    {
        id: 'gal-1',
        name: 'Galletas Chocochispas',
        category: 'galletas',
        tag: 'Crocantes y chocoso',
        price: 8000,
        presentation: 'Unidad',
        description: 'Galleta 100% harina de almendra con trocitos de chocolate al 70% horneaditas receta 100% casera y artesanal.',
        macros: '1.8g Carbs Netos • 0g Azúcar',
        image: './assets/galletas.jpg'
    }
];

// Estado inicial del carrito leyendo de LocalStorage
let cart = JSON.parse(localStorage.getItem('carritoAkika')) || [];
let currentFilter = 'todos';

function saveCart() {
    localStorage.setItem('carritoAkika', JSON.stringify(cart));
}

function formatCOP(amount) {
    return '$' + amount.toLocaleString('es-CO');
}

// Renderizar productos
function renderProducts() {
    const grid = document.getElementById('products-grid');
    const filtered = currentFilter === 'todos'
        ? PRODUCTS
        : PRODUCTS.filter(p => p.category === currentFilter);

    grid.innerHTML = filtered.map(product => `
        <div class="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-cacao/10 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group">
            <div>
                <div class="flex items-center justify-between mb-3">
                    <span class="bg-salvia/30 text-cacao text-[11px] font-bold px-3 py-1 rounded-full">${product.tag}</span>
                    <span class="text-xs font-semibold text-cacaoLight">${product.presentation}</span>
                </div>
                <div class="mb-4 overflow-hidden rounded-2xl border border-cacao/5 aspect-video bg-crema/70 relative">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" onerror="this.src='https://placehold.co/600x338/4C4541/FCF0DA?text=Akika'">
                </div>
                <h3 class="font-brand text-xl font-bold text-cacao">${product.name}</h3>
                <p class="text-xs text-cacaoLight mt-2 leading-relaxed">${product.description}</p>
            </div>
            <div class="mt-6 pt-4 border-t border-cacao/10">
                <div class="flex items-center justify-between mb-3">
                    <span class="text-[11px] font-bold uppercase tracking-wider text-salviaDark flex items-center gap-1">
                        <i data-lucide="leaf" class="w-3.5 h-3.5"></i> ${product.macros}
                    </span>
                    <span class="font-brand text-xl font-bold text-cacao">${formatCOP(product.price)}</span>
                </div>
                <button onclick="addToCart('${product.id}')" class="w-full bg-cacao hover:bg-cacaoLight text-crema font-semibold py-3 px-4 rounded-2xl text-sm transition-all flex items-center justify-center gap-2 shadow-sm">
                    <i data-lucide="plus-circle" class="w-4 h-4 text-miel"></i> Agregar al Pedido
                </button>
            </div>
        </div>
    `).join('');
    lucide.createIcons();
}

function filterProducts(cat) {
    currentFilter = cat;
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.className = 'filter-btn bg-cremaDark/60 hover:bg-cremaDark text-cacao px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all';
    });
    const activeBtn = document.getElementById('filter-' + cat);
    if (activeBtn) {
        activeBtn.className = 'filter-btn bg-cacao text-crema px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all shadow-sm';
    }
    renderProducts();
}

function addToCart(productId) {
    const prod = PRODUCTS.find(p => p.id === productId);
    if (!prod) return;
    const existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ id: prod.id, name: prod.name, price: prod.price, qty: 1 });
    }
    saveCart();
    updateCartUI();
}

function changeQty(productId, delta) {
    const idx = cart.findIndex(item => item.id === productId);
    if (idx === -1) return;

    cart[idx].qty += delta;
    if (cart[idx].qty <= 0) {
        if (productId === 'combo-degustacion') {
            document.getElementById('add-degustacion').checked = false;
        }
        cart.splice(idx, 1);
    }
    saveCart();
    updateCartUI();
}

function toggleDegustacion(checkbox) {
    if (checkbox.checked) {
        cart.push({ id: 'combo-degustacion', name: 'Caja Degustación Akika (Mix)', price: 52000, qty: 1 });
    } else {
        cart = cart.filter(item => item.id !== 'combo-degustacion');
    }
    updateCartUI();
}

function updateCartUI() {
    const container = document.getElementById('cart-items-container');
    const badge = document.getElementById('cart-badge');
    const totalEl = document.getElementById('cart-total');

    const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);
    // Solucionado error tipográfico en la multiplicación del total original
    const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

    badge.textContent = totalItems;
    totalEl.textContent = formatCOP(totalPrice);

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="bg-cacaoLight/30 border border-crema/10 rounded-2xl p-4 text-center text-xs text-crema/70">
                Tu carrito está vacío. Agrega vasitos, brownies o galletas desde el menú.
            </div>
        `;
    } else {
        container.innerHTML = cart.map(item => `
            <div class="bg-cacaoLight/40 border border-crema/10 rounded-2xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <div class="text-left pr-2">
                    <p class="text-xs font-bold text-crema leading-snug">${item.name}</p>
                    <p class="text-[11px] text-miel font-semibold mt-0.5">${formatCOP(item.price)} c/u • Subtotal: ${formatCOP(item.price * item.qty)}</p>
                </div>
                <div class="flex items-center justify-between sm:justify-end gap-2 bg-cacao px-3 py-1 rounded-full border border-crema/15 self-end sm:self-center shrink-0">
                    <button type="button" onclick="changeQty('${item.id}', -1)" class="text-crema hover:text-miel font-bold text-sm px-1.5">-</button>
                    <span class="text-xs font-bold text-crema min-w-[18px] text-center">${item.qty}</span>
                    <button type="button" onclick="changeQty('${item.id}', 1)" class="text-crema hover:text-miel font-bold text-sm px-1.5">+</button>
                </div>
            </div>
        `).join('');
    }
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('max-h-0');
    menu.classList.toggle('max-h-[500px]');
}

function scrollToOrder() {
    document.getElementById('pedidos').scrollIntoView({ behavior: 'smooth' });
}

// ==========================================
// CONTROL DEL MODAL DE ALERTAS
// ==========================================
function showCustomAlert(title, message, type = 'warning') {
    const modal = document.getElementById('custom-alert-modal');
    const titleEl = document.getElementById('alert-modal-title');
    const messageEl = document.getElementById('alert-modal-message');
    const iconContainer = document.getElementById('alert-modal-icon');
    const content = document.getElementById('alert-modal-content');

    titleEl.textContent = title;
    messageEl.textContent = message;

    // Estilos dinámicos según el tipo de alerta
    if (type === 'success') {
        iconContainer.className = 'w-16 h-16 rounded-full bg-[#25D366]/20 flex items-center justify-center mx-auto mb-4';
        iconContainer.innerHTML = '<i data-lucide="check-circle-2" class="w-8 h-8 text-[#25D366]"></i>';
    } else if (type === 'error') {
        iconContainer.className = 'w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4';
        iconContainer.innerHTML = '<i data-lucide="alert-triangle" class="w-8 h-8 text-red-500"></i>';
    } else { // warning o info
        iconContainer.className = 'w-16 h-16 rounded-full bg-miel/30 flex items-center justify-center mx-auto mb-4';
        iconContainer.innerHTML = '<i data-lucide="info" class="w-8 h-8 text-mielDark"></i>';
    }

    lucide.createIcons();

    modal.classList.remove('hidden');
    modal.classList.add('flex');

    // Pequeño efecto de rebote
    setTimeout(() => {
        content.classList.remove('scale-95');
        content.classList.add('scale-100');
    }, 10);
}

function closeCustomAlert() {
    const modal = document.getElementById('custom-alert-modal');
    const content = document.getElementById('alert-modal-content');

    content.classList.remove('scale-100');
    content.classList.add('scale-95');

    setTimeout(() => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }, 200); // Esperar que termine la animación
}

// Copiar número de cuenta al portapapeles
function copyAccountNumber() {
    navigator.clipboard.writeText("3138505017").then(() => {
        showCustomAlert("Número de cuenta copiado: 3138505017");
    }).catch(() => {
        showCustomAlert("Hubo un error al copiar el número.");
    });
}

// Envío del formulario vía AJAX a Formspree
async function handleOrderSubmit(e) {
    e.preventDefault();

    // 1. Validaciones
    if (cart.length === 0) {
        showCustomAlert('Tu carrito está vacío. Agrega algunos postres antes de hacer tu pedido.');
        return;
    }

    const rawPhone = document.getElementById('cust-phone').value.trim();
    const phone = rawPhone.replace(/\s|-/g, '');
    const phoneRegex = /^3\d{9}$/;

    if (!phoneRegex.test(phone)) {
        showCustomAlert('Por favor, ingresa un número de celular válido.');
        document.getElementById('cust-phone').focus();
        return;
    }

    const payment = document.getElementById('cust-payment').value;
    if (!payment) {
        showCustomAlert('Por favor, selecciona una forma de pago.');
        document.getElementById('cust-payment').focus();
        return;
    }

    const notes = document.getElementById('cust-notes').value.trim();
    if (notes === '') {
        showCustomAlert('Por favor, ingresa tu dirección, barrio o punto de referencia.');
        document.getElementById('cust-notes').focus();
        return;
    }

    // 2. Recolectar datos
    const name = document.getElementById('cust-name').value.trim();
    const type = document.getElementById('cust-type').value;
    const date = document.getElementById('cust-date').value;

    const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
    const itemsList = cart.map(i => `• ${i.qty}x ${i.name} (${formatCOP(i.price * i.qty)})`).join('\n');

    const summary = `NUEVO PEDIDO DE: ${name}\n` +
        `Teléfono: ${phone}\n` +
        `Modalidad: ${type}\n` +
        `Fecha de entrega: ${date}\n` +
        `Forma de pago: ${payment}\n` +
        `Dirección/Notas: ${notes}\n\n` +
        `--- DETALLE DEL PEDIDO ---\n${itemsList}\n\n` +
        `TOTAL ESTIMADO: ${formatCOP(totalPrice)}`;

    // Construir la data a enviar a Formspree
    const formData = new FormData();
    formData.append("Nombre", name);
    formData.append("Telefono", phone);
    formData.append("Detalle_Pedido", summary);

    // 3. Mostrar Modal Cargando
    document.getElementById('modal-state-loading').classList.remove('hidden');
    document.getElementById('modal-state-loading').classList.add('flex');
    document.getElementById('modal-state-success').classList.add('hidden');
    document.getElementById('modal-state-success').classList.remove('flex');
    document.getElementById('order-modal').classList.remove('hidden');

    const btnSubmit = document.getElementById('btn-submit-order');
    btnSubmit.disabled = true;
    lucide.createIcons();

    // 4. Enviar usando Fetch de forma silenciosa (Evita redirección a Formspree)

    try {
        const response = await fetch(FORMSPREE_URL, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            // Evento de Conversión para Meta Pixel
            if (typeof fbq !== 'undefined') {
                fbq('track', 'Purchase', {
                    value: totalPrice,
                    currency: 'COP',
                    content_name: 'Pedido Akika',
                    num_items: cart.length
                });
            }

            // SETTIMEOUT: Forzamos 2.5 segundos de espera visual para que el spinner se vea
            setTimeout(() => {
                document.getElementById('modal-state-loading').classList.add('hidden');
                document.getElementById('modal-state-loading').classList.remove('flex');
                document.getElementById('modal-state-success').classList.remove('hidden');
                document.getElementById('modal-state-success').classList.add('flex');
            }, 4500);

        } else {
            showCustomAlert("Hubo un problema al enviar tu pedido. Intenta nuevamente o contáctanos al WhatsApp.");
            closeModal();
            btnSubmit.disabled = false;
        }
    } catch (error) {
        showCustomAlert("Error de conexión. Revisa tu internet y vuelve a intentar.");
        closeModal();
        btnSubmit.disabled = false;
    }
}

// Acción final: Cerrar modal, limpiar carrito y volver al inicio
function closeAndResetOrder() {
    // 1. Limpiar carrito
    cart = [];
    saveCart();
    updateCartUI();

    // 2. Limpiar formulario
    const comboCheckbox = document.getElementById('add-degustacion');
    if (comboCheckbox) comboCheckbox.checked = false;
    document.getElementById('order-form').reset();

    // 3. Resetear fecha a mañana y esconder div de pago
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    document.getElementById('cust-date').valueAsDate = tomorrow;
    document.getElementById('payment-details').classList.add('hidden');

    // 4. Cerrar modal y subir
    closeModal();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function closeModal() {
    document.getElementById('order-modal').classList.add('hidden');
}

// Inicializar al cargar la página
window.onload = function () {
    // 1. Fecha por defecto (Mañana)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    document.getElementById('cust-date').valueAsDate = tomorrow;

    // 2. Renderizados
    renderProducts();
    updateCartUI();
    lucide.createIcons();

    // 3. Lógica para desplegar el número de cuenta al elegir forma de pago
    const paymentSelect = document.getElementById('cust-payment');
    const paymentDetails = document.getElementById('payment-details');

    if (paymentSelect) {
        paymentSelect.addEventListener('change', function () {
            const val = this.value;
            if (val === 'Nequi' || val === 'Daviplata' || val === 'Llave') {
                paymentDetails.classList.remove('hidden');
            } else {
                paymentDetails.classList.add('hidden');
            }
        });
    }
};