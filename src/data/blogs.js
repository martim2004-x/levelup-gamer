// src/data/blogs.js
// Fuente de datos simulada de los articulos del blog (migrada desde
export const BLOGS = [
  {
    slug: 'primer-torneo-lan-chile',
    titulo: 'Caso Curioso #1: El primer torneo LAN de Chile',
    resumen:
      'Descubre como nacio la escena competitiva de videojuegos en Chile y que relacion tiene con el programa de puntos LevelUp de nuestra tienda.',
    imagen: '/img/blog/blog1.jpg',
    imagenAlt: 'Torneo LAN gamer',
    bloques: [
      {
        tipo: 'parrafo',
        texto:
          'A comienzos de la decada de los 2000, un grupo de jugadores de Santiago organizo lo que muchos consideran el primer torneo LAN masivo del pais: decenas de computadores conectados por cable en un gimnasio techado, torneos de Counter-Strike y Warcraft III corriendo en paralelo, y filas de jugadores esperando su turno para competir.',
      },
      {
        tipo: 'parrafo',
        texto:
          'Ese evento sento las bases de lo que hoy conocemos como la escena esports chilena. Con el tiempo, estos encuentros pasaron de gimnasios improvisados a centros de eventos con miles de asistentes, transmision en vivo y patrocinadores internacionales.',
      },
      {
        tipo: 'parrafo',
        texto:
          'En Level-Up Gamer creemos que esta historia importa: por eso destinamos parte de nuestras ganancias a patrocinar torneos locales, y nuestro programa de puntos LevelUp premia a quienes participan activamente en la comunidad gamer, ya sea jugando, organizando eventos o simplemente compartiendo la pasion por los videojuegos.',
      },
    ],
  },
  {
    slug: 'elegir-primera-silla-gamer',
    titulo: 'Caso Curioso #2: Como elegir tu primera silla gamer',
    resumen:
      'Una guia rapida con los factores clave (ergonomia, materiales, ajuste) para elegir la silla gamer correcta segun tu setup y presupuesto.',
    imagen: '/img/blog/blog2.jpg',
    imagenAlt: 'Silla gamer',
    bloques: [
      {
        tipo: 'parrafo',
        texto:
          'Una silla gamer no es solo estetica: pasar varias horas sentado sin el soporte adecuado puede afectar tu postura y tu rendimiento en el juego. Aqui van los factores clave que consideramos antes de recomendarte un modelo:',
      },
      {
        tipo: 'lista',
        items: [
          { fuerte: 'Soporte lumbar:', texto: ' ajustable, no solo un cojin suelto.' },
          { fuerte: 'Material del tapiz:', texto: ' cuero sintetico (mas fresco al tacto) vs. tela (mas transpirable).' },
          { fuerte: 'Reclinacion:', texto: ' al menos 135° para sesiones largas o pausas de descanso.' },
          { fuerte: 'Altura ajustable y reposabrazos 4D:', texto: ' se adaptan a tu escritorio y postura de brazos.' },
          { fuerte: 'Peso maximo soportado:', texto: ' revisa la ficha tecnica antes de comprar.' },
        ],
      },
      {
        tipo: 'parrafo',
        texto:
          'Nuestra Silla Gamer Secretlab Titan cumple con los cinco puntos anteriores, por eso es una de las mas recomendadas en nuestro catalogo para sesiones de juego prolongadas.',
      },
    ],
    enlaceProducto: { codigo: 'SG001', texto: 'Ver Silla Secretlab Titan' },
  },
]

/** Busca un articulo del blog por su slug. Devuelve null si no existe. */
export function obtenerBlog(slug) {
  return BLOGS.find((blog) => blog.slug === slug) ?? null
}
