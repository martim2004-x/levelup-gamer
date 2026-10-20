// src/data/regiones.js
// Regiones y comunas de Chile. Migrado desde js/regiones.js.
export const REGIONES = [
  { nombre: 'Region de Arica y Parinacota', comunas: ['Arica', 'Camarones', 'Putre', 'General Lagos'] },
  { nombre: 'Region de Tarapaca', comunas: ['Iquique', 'Alto Hospicio', 'Pozo Almonte', 'Camiña'] },
  { nombre: 'Region de Antofagasta', comunas: ['Antofagasta', 'Calama', 'Tocopilla', 'Mejillones'] },
  { nombre: 'Region de Atacama', comunas: ['Copiapo', 'Vallenar', 'Chañaral', 'Caldera'] },
  { nombre: 'Region de Coquimbo', comunas: ['La Serena', 'Coquimbo', 'Ovalle', 'Illapel'] },
  { nombre: 'Region de Valparaiso', comunas: ['Valparaiso', 'Viña del Mar', 'Quilpue', 'San Antonio'] },
  {
    nombre: 'Region Metropolitana de Santiago',
    comunas: ['Santiago', 'Providencia', 'Las Condes', 'Maipu', 'Puente Alto', 'La Florida', 'Ñuñoa'],
  },
  {
    nombre: "Region del Libertador Gral. Bernardo O'Higgins",
    comunas: ['Rancagua', 'San Fernando', 'Rengo', 'Santa Cruz'],
  },
  { nombre: 'Region del Maule', comunas: ['Talca', 'Curico', 'Linares', 'Longavi', 'Constitucion'] },
  { nombre: 'Region de Ñuble', comunas: ['Chillan', 'Chillan Viejo', 'San Carlos', 'Bulnes'] },
  { nombre: 'Region del Biobio', comunas: ['Concepcion', 'Talcahuano', 'Los Angeles', 'Chiguayante'] },
  { nombre: 'Region de la Araucania', comunas: ['Temuco', 'Padre Las Casas', 'Villarrica', 'Angol'] },
  { nombre: 'Region de Los Rios', comunas: ['Valdivia', 'La Union', 'Rio Bueno', 'Panguipulli'] },
  { nombre: 'Region de Los Lagos', comunas: ['Puerto Montt', 'Puerto Varas', 'Osorno', 'Castro'] },
  { nombre: 'Region de Aysen', comunas: ['Coyhaique', 'Aysen', 'Chile Chico'] },
  {
    nombre: 'Region de Magallanes y la Antartica Chilena',
    comunas: ['Punta Arenas', 'Puerto Natales', 'Porvenir'],
  },
]

/** Devuelve las comunas de una region por su nombre. */
export function obtenerComunas(regionNombre) {
  const region = REGIONES.find((r) => r.nombre === regionNombre)
  return region ? region.comunas : []
}
