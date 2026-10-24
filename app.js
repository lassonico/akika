
        const AKIKA_WHATSAPP = '573138505017';

        // Catálogo de productos de Akika
        const PRODUCTS = [
            {
                id: 'kup-1',
                name: 'Kupkakes de Cacao Intenso & Almendra',
                category: 'kupkakes',
                tag: 'Más Vendido',
                price: 26000,
                presentation: 'Caja x 4 unidades',
                description: 'Bizcocho esponjoso 100% harina de almendra con frosting cremoso de chocolate amargo al 75% endulzado con alulosa.',
                macros: '2g Carbs Netos • 0g Azúcar',
                svgColor: '#4C4541',
                accentColor: '#F2C46A'
            },
            {
                id: 'kup-2',
                name: 'Kupkakes Vainilla Dorada & Chips',
                category: 'kupkakes',
                tag: 'Suaves y Húmedos',
                price: 26000,
                presentation: 'Caja x 4 unidades',
                description: 'Aromatizados con extracto puro de vainilla, harina de almendra blanqueada y trocitos de cacao amargo.',
                macros: '1.8g Carbs Netos • 0g Azúcar',
                svgColor: '#F2C46A',
                accentColor: '#AEAC78'
            },
            {
                id: 'bro-1',
                name: 'Fudgy Brownie Doble Cacao Amargo',
                category: 'brownies',
                tag: 'Favorito Keto',
                price: 28000,
                presentation: 'Caja x 4 cuadros grandes',
                description: 'Textura ultra húmeda tipo fudge por dentro y corteza crujiente por fuera. Elaborado con chocolate 80% cacao y alulosa.',
                macros: '2.2g Carbs Netos • Sin Trigo',
                svgColor: '#4C4541',
                accentColor: '#AEAC78'
            },
            {
                id: 'bro-2',
                name: 'Blondie de Almendra Tostada & Cacao',
                category: 'brownies',
                tag: 'Nuevo',
                price: 30000,
                presentation: 'Caja x 4 cuadros grandes',
                description: 'Versión dorada con mantequilla de almendras artesanal, alulosa caramelizada y lluvia de almendras fileteadas.',
                macros: '2g Carbs Netos • Rico en Proteína',
                svgColor: '#E5B24D',
                accentColor: '#4C4541'
            },
            {
                id: 'gal-1',
                name: 'Galletas Chocochips Cacao 80%',
                category: 'galletas',
                tag: 'Clásico Sin Culpa',
                price: 22000,
                presentation: 'Paquete x 6 unidades',
                description: 'Crujientes por fuera y suaves en el centro. Hechas con harina de almendras y trozos generosos de chocolate amargo.',
                macros: '1.5g Carbs Netos c/u • 0g Azúcar',
                svgColor: '#F2C46A',
                accentColor: '#4C4541'
            },
            {
                id: 'gal-2',
                name: 'Galletas Doble Chocolate & Sal Marina',
                category: 'galletas',
                tag: 'Amantes del Cacao',
                price: 24000,
                presentation: 'Paquete x 6 unidades',
                description: 'Masa de cacao alcalino sin azúcar, harina de almendras, alulosa y un toque sutil de escamas de sal marina.',
                macros: '1.6g Carbs Netos c/u • Keto',
                svgColor: '#4C4541',
                accentColor: '#F2C46A'
            }
        ];

        // Estado del Carrito en memoria
        let cart = [
            { id: 'bro-1', name: 'Fudgy Brownie Doble Cacao Amargo', price: 28000, qty: 1 }
        ];
        let currentFilter = 'todos';

        // Formateador de moneda
        function formatCOP(amount) {
            return '$' + amount.toLocaleString('es-CO');
        }

        // Generar ilustración SVG personalizada por categoría
        function getProductSVG(category, mainColor, accentColor) {
            if (category === 'kupkakes') {
                return `
                <svg class="w-28 h-28 mx-auto transition-transform duration-300 group-hover:scale-110" viewBox="0 0 100 100" fill="none">
                    <circle cx="50" cy="50" r="44" fill="${accentColor}" fill-opacity="0.25"/>
                    <path d="M30 58 L36 86 L64 86 L70 58 Z" fill="#AEAC78" stroke="#4C4541" stroke-width="2" stroke-linejoin="round"/>
                    <path d="M26 56 C20 42 35 34 38 34 C36 22 48 16 52 18 C58 18 66 26 62 34 C72 38 76 48 70 56 Z" fill="${mainColor}" stroke="#4C4541" stroke-width="2" stroke-linejoin="round"/>
                    <circle cx="50" cy="16" r="4" fill="#F2C46A" stroke="#4C4541" stroke-width="1.5"/>
                </svg>`;
            } else if (category === 'brownies') {
                return `
                <svg class="w-28 h-28 mx-auto transition-transform duration-300 group-hover:scale-110" viewBox="0 0 100 100" fill="none">
                    <circle cx="50" cy="50" r="44" fill="${accentColor}" fill-opacity="0.25"/>
                    <path d="M22 42 L50 28 L78 42 L78 68 L50 82 L22 68 Z" fill="${mainColor}" stroke="#4C4541" stroke-width="2" stroke-linejoin="round"/>
                    <path d="M22 42 L50 28 L78 42 L50 56 Z" fill="#6E655F" stroke="#4C4541" stroke-width="2" stroke-linejoin="round"/>
                    <ellipse cx="46" cy="40" rx="5" ry="2.5" fill="#FCF0DA"/>
                    <ellipse cx="56" cy="44" rx="4" ry="2" fill="#F2C46A"/>
                </svg>`;
            } else {
                return `
                <svg class="w-28 h-28 mx-auto transition-transform duration-300 group-hover:scale-110" viewBox="0 0 100 100" fill="none">
                    <circle cx="50" cy="50" r="44" fill="${accentColor}" fill-opacity="0.25"/>
                    <circle cx="50" cy="52" r="28" fill="${mainColor}" stroke="#4C4541" stroke-width="2"/>
                    <circle cx="40" cy="44" r="3.5" fill="#4C4541"/>
                    <circle cx="56" cy="40" r="4" fill="#4C4541"/>
                    <circle cx="60" cy="56" r="3.5" fill="#4C4541"/>
                    <circle cx="44" cy="60" r="4" fill="#4C4541"/>
                    <circle cx="36" cy="54" r="2.5" fill="#FCF0DA"/>
                    <circle cx="52" cy="50" r="2.5" fill="#FCF0DA"/>
                </svg>`;
            }
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
                        <div class="py-4 bg-crema/70 rounded-2xl mb-4 border border-cacao/5">
                            ${getProductSVG(product.category, product.svgColor, product.accentColor)}
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
                            <i data-lucide="plus-circle" class="w-4 h-4 text-miel"></i>
                            Agregar al Pedido
                        </button>
                    </div>
                </div>
            `).join('');
            lucide.createIcons();
        }

        // Filtrar por categoría
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

        // Agregar al carrito
        function addToCart(productId) {
            const prod = PRODUCTS.find(p => p.id === productId);
            if (!prod) return;

            const existing = cart.find(item => item.id === productId);
            if (existing) {
                existing.qty += 1;
            } else {
                cart.push({ id: prod.id, name: prod.name, price: prod.price, qty: 1 });
            }
            updateCartUI();
        }

        // Cambiar cantidad en el carrito
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
            updateCartUI();
        }

        // Toggle Caja Degustación
        function toggleDegustacion(checkbox) {
            if (checkbox.checked) {
                cart.push({
                    id: 'combo-degustacion',
                    name: 'Caja Degustación Akika (Mix)',
                    price: 42000,
                    qty: 1
                });
            } else {
                cart = cart.filter(item => item.id !== 'combo-degustacion');
            }
            updateCartUI();
        }

        // Actualizar UI del carrito
        function updateCartUI() {
            const container = document.getElementById('cart-items-container');
            const badge = document.getElementById('cart-badge');
            const totalEl = document.getElementById('cart-total');

            const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);
            const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

            badge.textContent = totalItems;
            totalEl.textContent = formatCOP(totalPrice);

            if (cart.length === 0) {
                container.innerHTML = `
                    <div class="bg-cacaoLight/30 border border-crema/10 rounded-2xl p-4 text-center text-xs text-crema/70">
                        Tu carrito está vacío. Agrega kupkakes, brownies o galletas desde el menú.
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
                            <button type="button" onclick="changeQty('${item.id}', -1)" class="text-crema hover:text-miel font-bold text-sm px-1.5" aria-label="Disminuir cantidad">-</button>
                            <span class="text-xs font-bold text-crema min-w-[18px] text-center">${item.qty}</span>
                            <button type="button" onclick="changeQty('${item.id}', 1)" class="text-crema hover:text-miel font-bold text-sm px-1.5" aria-label="Aumentar cantidad">+</button>
                        </div>
                    </div>
                `).join('');
            }
        }

        // Alternar menú móvil
        function toggleMobileMenu() {
            const menu = document.getElementById('mobile-menu');
    
            // Alterna entre 0 y un valor máximo que cubra el contenido
            menu.classList.toggle('max-h-0');
            menu.classList.toggle('max-h-[500px]'); 
        }

        // Ir a la sección de pedidos
        function scrollToOrder() {
            document.getElementById('pedidos').scrollIntoView({ behavior: 'smooth' });
        }

        // Procesar envío del formulario de pedido y abrir WhatsApp
        function handleOrderSubmit(e) {
            e.preventDefault();
            const name = document.getElementById('cust-name').value.trim();
            const phone = document.getElementById('cust-phone').value.trim();
            const type = document.getElementById('cust-type').value;
            const date = document.getElementById('cust-date').value;
            const notes = document.getElementById('cust-notes').value.trim() || 'Sin notas adicionales';

            const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
            const itemsList = cart.length > 0 
                ? cart.map(i => `🧁 *${i.qty}x* ${i.name} (${formatCOP(i.price * i.qty)})`).join('\n')
                : '💬 *Consulta personalizada* (sin productos seleccionados en el carrito)';

            const summary = `🌱 *¡HOLA AKIKA! NUEVO PEDIDO SIN CULPA* 🧁🍫🍪\n` +
                `_Repostería Saludable - Palermo, Huila_\n\n` +
                `👤 *Cliente:* ${name}\n` +
                `📱 *Contacto:* ${phone}\n` +
                `🛵 *Modalidad:* ${type}\n` +
                `📅 *Fecha de entrega:* ${date}\n\n` +
                `🛍️ *DETALLE DEL PEDIDO:*\n${itemsList}\n\n` +
                `💰 *Total Estimado:* ${formatCOP(totalPrice)}\n` +
                `📍 *Dirección / Notas:* ${notes}\n\n` +
                `✨ _¡Gracias por endulzar mi día de forma saludable!_ 💛`;

            const whatsappUrl = `https://wa.me/${AKIKA_WHATSAPP}?text=${encodeURIComponent(summary)}`;

            document.getElementById('modal-name').textContent = name;
            document.getElementById('modal-summary-text').textContent = summary;
            document.getElementById('btn-whatsapp-direct').href = whatsappUrl;
            document.getElementById('order-modal').classList.remove('hidden');
            lucide.createIcons();

            // Abrir WhatsApp en una nueva pestaña
            window.open(whatsappUrl, '_blank');
        }

        function closeModal() {
            document.getElementById('order-modal').classList.add('hidden');
        }

        function copyOrderText() {
            const text = document.getElementById('modal-summary-text').textContent;
            const tempInput = document.createElement('textarea');
            tempInput.value = text;
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand('copy');
            document.body.removeChild(tempInput);

            const btn = document.getElementById('btn-copy-order');
            btn.innerHTML = '<i data-lucide="check" class="w-4 h-4"></i> ¡Copiado al portapapeles!';
            lucide.createIcons();
            setTimeout(() => {
                btn.innerHTML = '<i data-lucide="copy" class="w-4 h-4"></i> Copiar Resumen del Pedido';
                lucide.createIcons();
            }, 2500);
        }

        // Inicializar fecha por defecto (mañana) y cargar íconos
        window.onload = function() {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            document.getElementById('cust-date').valueAsDate = tomorrow;

            renderProducts();
            updateCartUI();
            lucide.createIcons();
        };