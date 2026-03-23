// producto-data.js
// Muestra dinámicamente la información del producto según el slug en la URL

const productos = {
    "switch-joycon-neon": {
        categoria: "Gaming",
        titulo: "Nintendo Switch Joy-Con Neon",
        precio: 89,
        precioOld: 110,
        descuento: "-20%",
        ahorras: 21,
        descripcion: "Controles inalámbricos de alta precisión para Nintendo Switch. Incluye correa de muñeca, base de carga y guía de inicio rápido. Compatibles con todos los modos de juego.",
        imagen: "../assets/images/productos/gaming-nintendo-switch.jpg",
        galeria: [
            "../assets/images/productos/gaming-nintendo-switch.jpg"
        ],
        badge: "-20%",
        rating: 4.8,
        ratingCount: 127,
        variantes: ["Neon Rojo", "Neon Azul", "Negro", "Verde"],
        stock: 23
    },
    "poster-el-viajero": {
        categoria: "Arte",
        titulo: "Poster El Viajero 30x60cm",
        precio: 35,
        precioOld: 44,
        descuento: "-20%",
        ahorras: 9,
        descripcion: "Edición especial sin marco. Impresión de alta calidad en papel premium.",
        imagen: "../assets/images/productos/arte-poster-viajero.jpg",
        galeria: [
            "../assets/images/productos/arte-poster-viajero.jpg"
        ],
        badge: "-20%",
        rating: 4.7,
        ratingCount: 54,
        variantes: ["30x60cm"],
        stock: 12
    },
    "hoodie-contrast-color": {
        categoria: "Ropa",
        titulo: "Hoodie Contrast Color",
        precio: 120,
        precioOld: 140,
        descuento: "-15%",
        ahorras: 20,
        descripcion: "Patchwork premium talla única. Material suave y resistente.",
        imagen: "../assets/images/productos/ropa-hoodie-gurunvani.jpg",
        galeria: [
            "../assets/images/productos/ropa-hoodie-gurunvani.jpg"
        ],
        badge: "-15%",
        rating: 4.9,
        ratingCount: 31,
        variantes: ["Única"],
        stock: 7
    },
    "kit-gatillos-sarafox-f6": {
        categoria: "Gaming",
        titulo: "Kit Gatillos Sarafox F6",
        precio: 55,
        precioOld: 65,
        descuento: "-15%",
        ahorras: 10,
        descripcion: "4 botones + dedales gamer. Compatible con la mayoría de smartphones.",
        imagen: "../assets/images/productos/gaming-gatillos-belug.jpg",
        galeria: [
            "../assets/images/productos/gaming-gatillos-belug.jpg"
        ],
        badge: "NUEVO",
        rating: 4.6,
        ratingCount: 19,
        variantes: ["F6"],
        stock: 15
    },
    "iphone-13-128gb": {
        categoria: "Accesorios",
        titulo: "iPhone 13 128GB",
        precio: 1899,
        precioOld: 2099,
        descuento: "-10%",
        ahorras: 200,
        descripcion: "Midnight — SIM libre. Garantía oficial Apple.",
        imagen: "../assets/images/productos/acc-iphone13-midnight.jpg",
        galeria: [
            "../assets/images/productos/acc-iphone13-midnight.jpg"
        ],
        badge: "-10%",
        rating: 4.9,
        ratingCount: 8,
        variantes: ["128GB"],
        stock: 3
    },
    "anillo-senor-anillos": {
        categoria: "Arte",
        titulo: "Anillo El Señor de los Anillos",
        precio: 45,
        precioOld: 53,
        descuento: "-15%",
        ahorras: 8,
        descripcion: "Réplica coleccionable. Incluye caja de presentación.",
        imagen: "../assets/images/productos/arte-pintura-gato-payaso.jpg",
        galeria: [
            "../assets/images/productos/arte-pintura-gato-payaso.jpg"
        ],
        badge: "-15%",
        rating: 4.5,
        ratingCount: 22,
        variantes: ["Única"],
        stock: 10
    },
    "gorra-snapback-logo": {
        categoria: "Ropa",
        titulo: "Gorra Snapback Logo",
        precio: 39,
        precioOld: 49,
        descuento: "-20%",
        ahorras: 10,
        descripcion: "Edición exclusiva AsolStore. Ajustable, material premium.",
        imagen: "../assets/images/productos/acc-ipad-pro.jpg",
        galeria: [
            "../assets/images/productos/acc-ipad-pro.jpg"
        ],
        badge: "-20%",
        rating: 4.8,
        ratingCount: 15,
        variantes: ["Única"],
        stock: 18
    }
};

function getSlug() {
    const params = new URLSearchParams(window.location.search);
    return params.get('slug');
}

function renderProducto() {
    const slug = getSlug();
    const p = productos[slug];
    if (!p) return;
    document.getElementById('productCategory').textContent = p.categoria;
    document.getElementById('productTitle').textContent = p.titulo;
    document.getElementById('productPrice').textContent = `S/ ${p.precio.toFixed(2)}`;
    document.querySelector('.product-price-old').textContent = `S/ ${p.precioOld.toFixed(2)}`;
    document.querySelector('.product-discount-badge').textContent = `Ahorras S/ ${p.ahorras}`;
    document.getElementById('productDesc').textContent = p.descripcion;
    document.getElementById('galleryEmoji').src = p.imagen;
    document.getElementById('galleryEmoji').alt = p.titulo;
    document.getElementById('productBadge').textContent = p.badge;
    document.querySelector('.product-category-tag').textContent = p.categoria;
    document.querySelector('.product-title').textContent = p.titulo;
    document.querySelector('.product-rating .stars').textContent = '★★★★★';
    document.querySelector('.product-rating .rating-count').textContent = `${p.rating} (${p.ratingCount} reseñas)`;
    // Variantes
    const variantesDiv = document.querySelector('.variant-options');
    variantesDiv.innerHTML = p.variantes.map((v, i) => `<button class="variant-btn${i === 0 ? ' active' : ''}">${v}</button>`).join('');
    // Stock
    document.querySelector('.stock-info').textContent = `✓ En stock (${p.stock} unidades)`;
}

document.addEventListener('DOMContentLoaded', renderProducto);
