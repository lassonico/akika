
        const AKIKA_WHATSAPP = '573247621157';

        // Catálogo de productos de Akika
        // Catálogo de productos de Akika (Actualizado)
        const PRODUCTS = [
            {
                id: 'kup-1',
                name: 'Vasito cuchariable de brownie con crema',
                category: 'kupkakes', 
                tag: 'Más Vendido',
                price: 14000,
                presentation: 'Vaso de 80/100g',
                description: 'Vaso de 10oz con trocitos de brownie de 90/100g y crema batida receta casera 100% artesanal endulzada con alulosa.',
                macros: '2g Carbs Netos • 0g Azúcar',
                image: './assets/vasito.jpg' // <-- Cambia esto por el nombre exacto de tu imagen
            },
            {
                id: 'bro-1',
                name: 'Fudgy Brownie Doble Cacao Amargo',
                category: 'brownies',
                tag: 'Favorito Keto',
                price: 12000,
                presentation: 'Unidad de 80/100g',
                description: 'Textura ultra húmeda tipo fudge por dentro y corteza crujiente por fuera. Elaborado con chocolate 80% cacao y alulosa.',
                macros: '2.2g Carbs Netos • Sin Trigo',
                image: './assets/brownie.jpg' // <-- Cambia esto por el nombre exacto de tu imagen
            },
            {
                id: 'gal-1',
                name: 'Galletas Chocochips Cacao 80%',
                category: 'galletas',
                tag: 'Crocantes y chocoso',
                price: 8000,
                presentation: 'Unidad',
                description: 'Galleta 100% harina de almendra con trocitos de chocolate al 70% horneaditas receta 100% casera y artesanal.',
                macros: '1.8g Carbs Netos • 0g Azúcar',
                image: './assets/galletas.jpg' // <-- Cambia esto por el nombre exacto de tu imagen
            }
        ];

        // Estado inicial del carrito (limpio por defecto)
        let cart = [];
        let currentFilter = 'todos';

        // Formateador de moneda
        function formatCOP(amount) {
            return '$' + amount.toLocaleString('es-CO');
        }

        // Renderizar productos con imágenes 16:9
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
                        
                        <!-- Contenedor de imagen 16:9 (aspect-video) -->
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
                    price: 52000,
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