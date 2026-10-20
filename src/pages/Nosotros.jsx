// src/pages/Nosotros.jsx
// Pagina "Sobre Level-Up Gamer" (quienes somos, mision, vision e impacto
export default function Nosotros() {
  const valores = [
    {
      titulo: 'Mision',
      texto:
        'Proporcionar productos de alta calidad para gamers en todo Chile, ofreciendo una experiencia de compra unica y personalizada, con un enfoque en la satisfaccion del cliente y el crecimiento de la comunidad gamer.',
    },
    {
      titulo: 'Vision',
      texto:
        'Ser la tienda online lider en productos para gamers en Chile, reconocida por su innovacion, servicio al cliente excepcional, y un programa de fidelizacion basado en gamificacion que recompense a nuestros clientes mas fieles.',
    },
    {
      titulo: 'Impacto comunitario',
      texto:
        'Cada compra apoya a la comunidad gamer local: parte de nuestras ganancias se destina a patrocinar torneos y eventos de videojuegos a lo largo de Chile.',
    },
  ]

  return (
    <section className="my-4">
      <h1 className="h2 mb-4">Sobre Level-Up Gamer</h1>

      <div className="card panel-filtros mb-4">
        <div className="row g-0 align-items-center">
          <div className="col-12 col-lg-5">
            <img
              src="/img/general/nosotros.jpg"
              alt="Equipo de Level-Up Gamer"
              className="img-fluid rounded-start"
            />
          </div>
          <div className="col-12 col-lg-7">
            <div className="card-body">
              <h2 className="h4">¿Quienes somos?</h2>
              <p className="text-secondary mb-0">
                Level-Up Gamer es una tienda online dedicada a satisfacer las necesidades de los entusiastas de
                los videojuegos en Chile. Lanzada hace dos anos como respuesta a la creciente demanda durante la
                pandemia, ofrecemos una amplia gama de productos para gamers, desde consolas y accesorios hasta
                computadores y sillas especializadas. Aunque no contamos con una ubicacion fisica, realizamos
                despachos a todo el pais.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4 mb-4">
        {valores.map((valor) => (
          <div className="col-12 col-md-4" key={valor.titulo}>
            <div className="card h-100 panel-filtros border-top border-3 border-primary">
              <div className="card-body">
                <h3 className="h5 texto-acento">{valor.titulo}</h3>
                <p className="text-secondary mb-0">{valor.texto}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <section>
        <h2 className="h4">Nuestro equipo</h2>
        <p className="text-secondary">
          Somos un equipo de desarrolladores y amantes de los videojuegos, comprometidos con construir la mejor
          experiencia de compra gamer de Chile: desde soporte tecnico especializado hasta recomendaciones
          personalizadas segun tu historial de compras.
        </p>
      </section>
    </section>
  )
}
