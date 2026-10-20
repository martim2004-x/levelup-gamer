/* ============================================================
   main.js
   ------------------------------------------------------------
   Comportamiento compartido por TODAS las páginas de la tienda:
   1. Menú de navegación responsivo (hamburguesa en móvil)
   2. Carrito de compras (agregar, quitar, modificar, totales)
      persistido en localStorage según pide el anexo 1.
   3. Actualización del contador de carrito en el header.
   4. Render de tarjetas de producto reutilizable entre Home y
      Productos.

   Este archivo se carga en TODAS las páginas HTML al final del
   <body>, justo antes de cargar productos-data.js si la página
   lo necesita.
   ============================================================ */

/* -------------------- 1. MENÚ RESPONSIVO -------------------- */
function inicializarMenu() {
  const boton = document.querySelector(".navbar__toggle");
  const menu = document.querySelector(".navbar__menu");
  if (!boton || !menu) return;

  boton.addEventListener("click", () => {
    menu.classList.toggle("abierto");
    const expandido = menu.classList.contains("abierto");
    boton.setAttribute("aria-expanded", expandido);
  });
}

/* -------------------- 2. CARRITO DE COMPRAS -------------------- */
/* Guardamos el carrito como un arreglo de objetos:
   [{ codigo: "JM001", cantidad: 2 }, ...]
   guardado bajo la llave "levelup_carrito" en localStorage.
   Solo se guarda código + cantidad; el precio/nombre se recalcula
   siempre desde PRODUCTOS para evitar que el carrito quede con
   datos "viejos" si el precio cambia. */

const CARRITO_KEY = "levelup_carrito";

function leerCarrito() {
  const datos = localStorage.getItem(CARRITO_KEY);
  return datos ? JSON.parse(datos) : [];
}

function guardarCarrito(carrito) {
  localStorage.setItem(CARRITO_KEY, JSON.stringify(carrito));
  actualizarBadgeCarrito();
}

/* Suma "cantidad" unidades del producto con ese código. Si ya
   estaba en el carrito, incrementa; si no, lo agrega. */
function agregarAlCarrito(codigo, cantidad = 1) {
  const carrito = leerCarrito();
  const item = carrito.find((i) => i.codigo === codigo);

  if (item) {
    item.cantidad += cantidad;
  } else {
    carrito.push({ codigo, cantidad });
  }

  guardarCarrito(carrito);
}

function actualizarCantidadCarrito(codigo, nuevaCantidad) {
  let carrito = leerCarrito();
  if (nuevaCantidad <= 0) {
    carrito = carrito.filter((i) => i.codigo !== codigo);
  } else {
    const item = carrito.find((i) => i.codigo === codigo);
    if (item) item.cantidad = nuevaCantidad;
  }
  guardarCarrito(carrito);
}

function quitarDelCarrito(codigo) {
  const carrito = leerCarrito().filter((i) => i.codigo !== codigo);
  guardarCarrito(carrito);
}

/* Cuenta el total de UNIDADES en el carrito (no de líneas), para
   mostrar en el badge del header, ej: "Cart (3)". */
function contarUnidadesCarrito() {
  return leerCarrito().reduce((total, item) => total + item.cantidad, 0);
}

/* Actualiza el número dentro de .badge-carrito en el header, en
   todas las páginas que lo tengan. */
function actualizarBadgeCarrito() {
  const badge = document.querySelector(".badge-carrito");
  if (badge) {
    badge.textContent = contarUnidadesCarrito();
  }
}

/* -------------------- 3. RENDER DE TARJETAS DE PRODUCTO -------------------- */
/* Genera el HTML de una tarjeta de producto a partir de un objeto
   producto (ver productos-data.js). Se reutiliza en index.html
   (destacados) y productos.html (catálogo completo). */
function crearTarjetaProducto(producto) {
  const alertaStock =
    producto.stock <= producto.stockCritico
      ? `<span class="badge badge-alerta">¡Stock bajo!</span>`
      : "";

  const articulo = document.createElement("article");
  articulo.className = "tarjeta-producto";
  articulo.innerHTML = `
    <a href="detalle-producto.html?codigo=${producto.codigo}" class="tarjeta-producto__imagen">
      <img src="${producto.imagen}" alt="${producto.nombre}" loading="lazy">
    </a>
    <div class="tarjeta-producto__cuerpo">
      <span class="tarjeta-producto__categoria">${producto.categoria}</span>
      <h3 class="tarjeta-producto__nombre">
        <a href="detalle-producto.html?codigo=${producto.codigo}">${producto.nombre}</a>
      </h3>
      ${alertaStock}
      <p class="tarjeta-producto__precio">${formatearCLP(producto.precio)}</p>
    </div>
    <div class="tarjeta-producto__acciones">
      <button type="button" class="btn btn-primario btn-bloque" data-codigo="${producto.codigo}">
        Añadir al carrito
      </button>
    </div>
  `;

  // Escuchamos el clic del botón "Añadir al carrito" de ESTA tarjeta.
  const boton = articulo.querySelector("button[data-codigo]");
  boton.addEventListener("click", () => {
    agregarAlCarrito(producto.codigo, 1);
    mostrarAvisoCarrito(producto.nombre);
  });

  return articulo;
}

/* Pequeño aviso visual (toast) cuando se agrega un producto. No es
   un requisito explícito del anexo, pero mejora la usabilidad, que
   sí se pide: "mensajes... para mejorar la experiencia del usuario". */
function mostrarAvisoCarrito(nombreProducto) {
  let toast = document.querySelector(".toast-carrito");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast-carrito";
    document.body.appendChild(toast);
  }
  toast.textContent = `${nombreProducto} añadido al carrito`;
  toast.classList.add("visible");
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => toast.classList.remove("visible"), 2200);
}

/* -------------------- 4. INICIALIZACIÓN GLOBAL -------------------- */
document.addEventListener("DOMContentLoaded", () => {
  inicializarMenu();
  actualizarBadgeCarrito();
});
