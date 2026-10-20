// src/data/productos.js
// Fuente de datos simulada de PRODUCTOS + CRUD + hook de React.
import { useSyncExternalStore } from 'react'
import { crearColeccion } from './coleccion'

/** Datos iniciales de la "base de datos" de productos. */
export const PRODUCTOS_SEMILLA = [
  {
    codigo: 'JM001',
    categoria: 'Juegos de Mesa',
    nombre: 'Catan',
    precio: 29990,
    stock: 25,
    stockCritico: 5,
    descuento: 20,
    imagen: '/img/productos/catan.jpg',
    descripcion:
      'Un clasico juego de estrategia donde los jugadores compiten por colonizar y expandirse en la isla de Catan. Ideal para 3-4 jugadores.',
  },
  {
    codigo: 'JM002',
    categoria: 'Juegos de Mesa',
    nombre: 'Carcassonne',
    precio: 24990,
    stock: 18,
    stockCritico: 5,
    descuento: 0,
    imagen: '/img/productos/carcassonne.jpg',
    descripcion:
      'Juego de colocacion de fichas donde se construye el paisaje alrededor de la fortaleza medieval de Carcassonne.',
  },
  {
    codigo: 'AC001',
    categoria: 'Accesorios',
    nombre: 'Controlador Inalambrico Xbox Series X',
    precio: 59990,
    stock: 40,
    stockCritico: 8,
    descuento: 0,
    imagen: '/img/productos/control-xbox.jpg',
    descripcion:
      'Experiencia de juego comoda con botones mapeables y respuesta tactil mejorada. Compatible con consolas Xbox y PC.',
  },
  {
    codigo: 'AC002',
    categoria: 'Accesorios',
    nombre: 'Auriculares Gamer HyperX Cloud II',
    precio: 79990,
    stock: 30,
    stockCritico: 6,
    descuento: 10,
    imagen: '/img/productos/hyperx-cloud2.jpg',
    descripcion:
      'Sonido envolvente de calidad con microfono desmontable y almohadillas de espuma viscoelastica.',
  },
  {
    codigo: 'CO001',
    categoria: 'Consolas',
    nombre: 'PlayStation 5',
    precio: 549990,
    stock: 12,
    stockCritico: 3,
    descuento: 0,
    imagen: '/img/productos/ps5.png',
    descripcion:
      'La consola de ultima generacion de Sony, con graficos impresionantes y tiempos de carga ultrarrapidos.',
  },
  {
    codigo: 'CG001',
    categoria: 'Computadores Gamers',
    nombre: 'PC Gamer ASUS ROG Strix',
    precio: 1299990,
    stock: 6,
    stockCritico: 2,
    descuento: 15,
    imagen: '/img/productos/pc-asus-rog.png',
    descripcion:
      'Equipo potente para los gamers mas exigentes, con los ultimos componentes para un rendimiento excepcional.',
  },
  {
    codigo: 'SG001',
    categoria: 'Sillas Gamers',
    nombre: 'Silla Gamer Secretlab Titan',
    precio: 349990,
    stock: 2,
    stockCritico: 3,
    descuento: 5,
    imagen: '/img/productos/silla-secretlab.jpg',
    descripcion:
      'Soporte ergonomico y personalizacion ajustable para sesiones de juego prolongadas.',
  },
  {
    codigo: 'MS001',
    categoria: 'Mouse',
    nombre: 'Mouse Gamer Logitech G502 HERO',
    precio: 49990,
    stock: 35,
    stockCritico: 8,
    descuento: 0,
    imagen: '/img/productos/mouse-g502.jpg',
    descripcion:
      'Sensor de alta precision y botones personalizables, ideal para gamers que buscan control preciso.',
  },
  {
    codigo: 'MP001',
    categoria: 'Mousepad',
    nombre: 'Mousepad Razer Goliathus Extended Chroma',
    precio: 29990,
    stock: 22,
    stockCritico: 5,
    descuento: 0,
    imagen: '/img/productos/mousepad-razer.jpg',
    descripcion:
      'Area de juego amplia con iluminacion RGB personalizable y superficie suave y uniforme.',
  },
  {
    codigo: 'PP001',
    categoria: 'Poleras Personalizadas',
    nombre: "Polera Gamer Personalizada 'Level-Up'",
    precio: 14990,
    stock: 50,
    stockCritico: 10,
    descuento: 25,
    imagen: '/img/productos/polera-levelup.jpg',
    descripcion:
      'Camiseta comoda y estilizada, personalizable con tu gamer tag o diseno favorito.',
  },
  {
    codigo: 'TK001',
    categoria: 'Teclados',
    nombre: 'Teclado Mecanico Gamer Corsair K95 RGB Platinum',
    precio: 45990,
    stock: 15,
    stockCritico: 4,
    descuento: 0,
    imagen: '/img/productos/teclado.jpg',
    descripcion:
      'Teclado mecanico de alta calidad, ideal para gamers que buscan un desempenio excepcional.',
  },
]

/** Categorias de producto disponibles en el formulario de administracion. */
export const CATEGORIAS = [
  'Juegos de Mesa',
  'Accesorios',
  'Consolas',
  'Computadores Gamers',
  'Sillas Gamers',
  'Mouse',
  'Mousepad',
  'Poleras Personalizadas',
  'Polerones Gamers Personalizados',
  'Teclados',
  'Servicio Tecnico',
]

// CRUD de productos (Crear / Leer / Actualizar / Eliminar)
// Nota: la clave cambia a "productos-v2" para que los navegadores que ya
// guardaron el seed anterior (con placeholders) recarguen los datos con las
// fotos reales nuevas.
export const productosStore = crearColeccion({
  clave: 'productos-v2',
  semilla: PRODUCTOS_SEMILLA,
  claveId: 'codigo',
})

/** Devuelve la lista de categorias unicas presentes en los productos. */
export function listarCategorias() {
  return [...new Set(productosStore.listar().map((p) => p.categoria))]
}

/** Busca un producto por su codigo. */
export function buscarProductoPorCodigo(codigo) {
  return productosStore.obtener(codigo)
}

/** Hook de React, la lista de productos se mantiene sincronizada en vivo. */
export function useProductos() {
  return useSyncExternalStore(productosStore.suscribir, productosStore.snapshot, productosStore.snapshot)
}
