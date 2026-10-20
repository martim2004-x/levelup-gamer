/* ============================================================
   productos-data.js
   ------------------------------------------------------------
   Arreglo de productos de Level-Up Gamer (dato "hardcodeado" en
   JS, tal como pide el anexo: "Crear un arreglo de productos" /
   "Mostrar los productos del arreglo").

   Más adelante (entrega con backend) esto se reemplazaría por
   datos desde una base de datos, pero la FORMA de consumirlo desde
   las vistas (recorrer el arreglo y pintar tarjetas) no cambia.

   Cada producto sigue el detalle de la Forma B (código, categoría,
   nombre, precio, descripción) y le agregamos "stock" y
   "stockCritico" porque el anexo 1 pide esos campos para el
   mantenedor de administrador.
   ============================================================ */

const PRODUCTOS = [
  {
    codigo: "JM001",
    categoria: "Juegos de Mesa",
    nombre: "Catan",
    precio: 29990,
    stock: 25,
    stockCritico: 5,
    imagen: "img/productos/catan.svg",
    descripcion:
      "Un clásico juego de estrategia donde los jugadores compiten por colonizar y expandirse en la isla de Catan. Ideal para 3-4 jugadores y perfecto para noches de juego en familia o con amigos.",
  },
  {
    codigo: "JM002",
    categoria: "Juegos de Mesa",
    nombre: "Carcassonne",
    precio: 24990,
    stock: 18,
    stockCritico: 5,
    imagen: "img/productos/carcassonne.svg",
    descripcion:
      "Un juego de colocación de fichas donde los jugadores construyen el paisaje alrededor de la fortaleza medieval de Carcassonne. Ideal para 2-5 jugadores y fácil de aprender.",
  },
  {
    codigo: "AC001",
    categoria: "Accesorios",
    nombre: "Controlador Inalámbrico Xbox Series X",
    precio: 59990,
    stock: 40,
    stockCritico: 8,
    imagen: "img/productos/control-xbox.svg",
    descripcion:
      "Ofrece una experiencia de juego cómoda con botones mapeables y una respuesta táctil mejorada. Compatible con consolas Xbox y PC.",
  },
  {
    codigo: "AC002",
    categoria: "Accesorios",
    nombre: "Auriculares Gamer HyperX Cloud II",
    precio: 79990,
    stock: 30,
    stockCritico: 6,
    imagen: "img/productos/hyperx-cloud2.svg",
    descripcion:
      "Proporcionan un sonido envolvente de calidad con un micrófono desmontable y almohadillas de espuma viscoelástica para mayor comodidad durante largas sesiones de juego.",
  },
  {
    codigo: "CO001",
    categoria: "Consolas",
    nombre: "PlayStation 5",
    precio: 549990,
    stock: 12,
    stockCritico: 3,
    imagen: "img/productos/ps5.svg",
    descripcion:
      "La consola de última generación de Sony, que ofrece gráficos impresionantes y tiempos de carga ultrarrápidos para una experiencia de juego inmersiva.",
  },
  {
    codigo: "CG001",
    categoria: "Computadores Gamers",
    nombre: "PC Gamer ASUS ROG Strix",
    precio: 1299990,
    stock: 6,
    stockCritico: 2,
    imagen: "img/productos/pc-asus-rog.svg",
    descripcion:
      "Un potente equipo diseñado para los gamers más exigentes, equipado con los últimos componentes para ofrecer un rendimiento excepcional en cualquier juego.",
  },
  {
    codigo: "SG001",
    categoria: "Sillas Gamers",
    nombre: "Silla Gamer Secretlab Titan",
    precio: 349990,
    stock: 10,
    stockCritico: 3,
    imagen: "img/productos/silla-secretlab.svg",
    descripcion:
      "Diseñada para el máximo confort, esta silla ofrece un soporte ergonómico y personalización ajustable para sesiones de juego prolongadas.",
  },
  {
    codigo: "MS001",
    categoria: "Mouse",
    nombre: "Mouse Gamer Logitech G502 HERO",
    precio: 49990,
    stock: 35,
    stockCritico: 8,
    imagen: "img/productos/mouse-g502.svg",
    descripcion:
      "Con sensor de alta precisión y botones personalizables, este mouse es ideal para gamers que buscan un control preciso y personalización.",
  },
  {
    codigo: "MP001",
    categoria: "Mousepad",
    nombre: "Mousepad Razer Goliathus Extended Chroma",
    precio: 29990,
    stock: 22,
    stockCritico: 5,
    imagen: "img/productos/mousepad-razer.svg",
    descripcion:
      "Ofrece un área de juego amplia con iluminación RGB personalizable, asegurando una superficie suave y uniforme para el movimiento del mouse.",
  },
  {
    codigo: "PP001",
    categoria: "Poleras Personalizadas",
    nombre: "Polera Gamer Personalizada 'Level-Up'",
    precio: 14990,
    stock: 50,
    stockCritico: 10,
    imagen: "img/productos/polera-levelup.svg",
    descripcion:
      "Una camiseta cómoda y estilizada, con la posibilidad de personalizarla con tu gamer tag o diseño favorito.",
  },
];

/* Utilidad compartida: formatea un número como precio en pesos chilenos.
   La usamos en todas las vistas para no repetir la lógica de formato
   (ejemplo: 29990 -> "$29.990"). */
function formatearCLP(valor) {
  return valor.toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  });
}

/* Busca un producto por su código. Se usa en detalle-producto.html
   para saber qué producto mostrar según el parámetro de la URL. */
function buscarProductoPorCodigo(codigo) {
  return PRODUCTOS.find((p) => p.codigo === codigo);
}
