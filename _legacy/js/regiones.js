/* ============================================================
   regiones.js
   ------------------------------------------------------------
   Arreglo de JS complementario al entregable, tal como pide el
   anexo 1: "Mostrar las regiones que están en un arreglo de JS
   complementario a este entregable. Al momento de cambiar una
   región, también cambiaría la búsqueda de las comunas."

   Estructura: un arreglo de regiones, cada una con su propio
   arreglo de comunas. Se usa en registro.html y en
   admin/usuario-form.html para poblar los <select> en cascada
   (región -> comuna) de forma dinámica con JavaScript.

   Se incluyen las regiones mencionadas en el mockup (Figura 4)
   más el resto de las regiones de Chile, para que el select sea
   realista y completo.
   ============================================================ */

const REGIONES = [
  {
    nombre: "Región de Arica y Parinacota",
    comunas: ["Arica", "Camarones", "Putre", "General Lagos"],
  },
  {
    nombre: "Región de Tarapacá",
    comunas: ["Iquique", "Alto Hospicio", "Pozo Almonte", "Camiña"],
  },
  {
    nombre: "Región de Antofagasta",
    comunas: ["Antofagasta", "Calama", "Tocopilla", "Mejillones"],
  },
  {
    nombre: "Región de Atacama",
    comunas: ["Copiapó", "Vallenar", "Chañaral", "Caldera"],
  },
  {
    nombre: "Región de Coquimbo",
    comunas: ["La Serena", "Coquimbo", "Ovalle", "Illapel"],
  },
  {
    nombre: "Región de Valparaíso",
    comunas: ["Valparaíso", "Viña del Mar", "Quilpué", "San Antonio"],
  },
  {
    nombre: "Región Metropolitana de Santiago",
    comunas: [
      "Santiago",
      "Providencia",
      "Las Condes",
      "Maipú",
      "Puente Alto",
      "La Florida",
      "Ñuñoa",
    ],
  },
  {
    nombre: "Región del Libertador Gral. Bernardo O'Higgins",
    comunas: ["Rancagua", "San Fernando", "Rengo", "Santa Cruz"],
  },
  {
    nombre: "Región del Maule",
    comunas: ["Talca", "Curicó", "Linares", "Longaví", "Constitución"],
  },
  {
    nombre: "Región de Ñuble",
    comunas: ["Chillán", "Chillán Viejo", "San Carlos", "Bulnes"],
  },
  {
    nombre: "Región del Biobío",
    comunas: ["Concepción", "Talcahuano", "Los Ángeles", "Chiguayante"],
  },
  {
    nombre: "Región de la Araucanía",
    comunas: ["Temuco", "Padre Las Casas", "Villarrica", "Angol"],
  },
  {
    nombre: "Región de Los Ríos",
    comunas: ["Valdivia", "La Unión", "Río Bueno", "Panguipulli"],
  },
  {
    nombre: "Región de Los Lagos",
    comunas: ["Puerto Montt", "Puerto Varas", "Osorno", "Castro"],
  },
  {
    nombre: "Región de Aysén",
    comunas: ["Coyhaique", "Aysén", "Chile Chico"],
  },
  {
    nombre: "Región de Magallanes y la Antártica Chilena",
    comunas: ["Punta Arenas", "Puerto Natales", "Porvenir"],
  },
];

/* Rellena un <select> de regiones a partir del arreglo REGIONES. */
function poblarSelectRegiones(selectRegion) {
  REGIONES.forEach((region, indice) => {
    const opcion = document.createElement("option");
    opcion.value = indice; // usamos el índice para poder buscar sus comunas rápido
    opcion.textContent = region.nombre;
    selectRegion.appendChild(opcion);
  });
}

/* Dado el <select> de región y el <select> de comuna, deja el de
   comuna sincronizado con la región elegida. Se llama una vez al
   cargar la página y cada vez que el usuario cambia de región. */
function actualizarComunas(selectRegion, selectComuna) {
  const indiceRegion = selectRegion.value;

  // Limpiamos las opciones actuales del select de comuna
  selectComuna.innerHTML =
    '<option value="" disabled selected>-- Seleccione la comuna --</option>';

  if (indiceRegion === "") {
    selectComuna.disabled = true;
    return;
  }

  const region = REGIONES[indiceRegion];
  region.comunas.forEach((comuna) => {
    const opcion = document.createElement("option");
    opcion.value = comuna;
    opcion.textContent = comuna;
    selectComuna.appendChild(opcion);
  });
  selectComuna.disabled = false;
}
