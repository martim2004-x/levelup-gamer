# Documento de Cobertura del Testing

Proyecto: Level-Up Gamer - Tienda online de productos gamer
Asignatura: DSY1104 - Desarrollo de Software
Evaluación: Evaluación Parcial 2 (30%)
Framework de pruebas: Jasmine (assertions), Karma (runner) y jsdom (DOM simulado)
Fecha: 2026

## 1. Objetivo

Verificar de forma automática, repetible y aislada que:

- La lógica de negocio (formato de precios, validaciones y carrito) funciona correctamente.
- La capa de datos con operaciones CRUD y persistencia opera como se espera.
- Los componentes de React se renderizan con los datos correctos y reaccionan a la interacción del usuario.
- Las rutas protegidas restringen el panel de administración.

Cobertura solicitada: mínimo 10 pruebas unitarias.
Cobertura entregada: 62 pruebas unitarias distribuidas en 14 archivos de especificación.

## 2. Herramientas Utilizadas

Jasmine - Framework de aserciones: describe, it, expect y espías (jasmine.createSpy).

Karma - Runner que carga, ejecuta y reporta los specs.

karma-jsdom-launcher - Ejecuta las pruebas en un DOM simulado (jsdom), sin necesidad de navegador real.

karma-esbuild - Compila JSX y módulos ESM para que Karma pueda ejecutar los specs de React.

@testing-library/react - Renderiza componentes y simula la interacción (render, screen, fireEvent).

@testing-library/user-event - Soporte adicional para simular eventos de usuario.

jsdom - Implementación de DOM en Node.

### 2.1 Justificación de jsdom

El equipo dispone únicamente de Microsoft Edge como navegador instalado. Ejecutar Karma sobre jsdom elimina la dependencia de Chrome y hace la suite más rápida, reproducible y portable en cualquier equipo.

## 3. Configuración

Archivo: karma.conf.js

- Framework declarado: jasmine.
- Orden de carga: primero test/setup.js, luego todos los archivos test/*.spec.js.
- Preprocesador: esbuild (bundle, formato IIFE, jsx automatic, loader .js a jsx).
- Navegador: jsdom.
- Ejecución: singleRun true, concurrency 1, jasmine random false (orden determinista).

Archivo: test/setup.js

```
globalThis.IS_REACT_ACT_ENVIRONMENT = true   // entorno controlado por act()
beforeEach(() => window.localStorage.clear()) // aislamiento entre pruebas
```

Antes de cada prueba se limpia localStorage, lo que garantiza que ningún caso dependa de datos dejados por otro.

## 4. Cómo Ejecutar las Pruebas

```
npm install          # la primera vez
npm test             # una sola corrida (usada para la evaluación)
npm run test:watch   # modo interactivo durante el desarrollo
```

Salida esperada:

```
Executed 62 of 62 SUCCESS
TOTAL: 62 SUCCESS
```

## 5. Tipos de Pruebas Incluidas

Lógica pura (unitaria) - Funciones sin React y deterministas. Ejemplo: formato.spec.js, validaciones.spec.js, carrito.spec.js.

Capa de datos y CRUD - Crear, leer, actualizar y eliminar con persistencia. Ejemplo: productosStore.spec.js, blogs.spec.js.

Renderizado correcto - Que el componente muestre los datos recibidos. Ejemplo: ProductCard.spec.js.

Renderizado de listas - Que se renderice un elemento por cada dato del conjunto. Ejemplo: ProductGrid.spec.js.

Renderizado condicional - Que un elemento aparezca o se oculte según la condición. Ejemplo: CampoFormulario.spec.js, Toast.spec.js.

Propiedades (props) - Que el componente reciba y use sus props (etiqueta y onClick). Ejemplo: Boton.spec.js.

Estado (state) - Que el estado del formulario cambie al escribir. Ejemplo: CampoFormulario.spec.js, ItemCarrito.spec.js.

Eventos - Simular clics y escritura y comprobar la reacción. Ejemplo: Boton.spec.js, ProductCard.spec.js.

Guardia de rutas - Que el panel no sea accesible sin el rol adecuado. Ejemplo: RutaAdmin.spec.js.

## 6. Inventario de Pruebas por Archivo

1. formato.spec.js - Unitaria (lógica pura) - 7 pruebas - Cubre formatearCLP, precioConDescuento, estaEnOferta y normalizarTexto.

2. validaciones.spec.js - Unitaria (lógica pura) - 13 pruebas - Cubre requerido, largos, rango de largo, correo institucional, RUN (módulo 11), mayoría de edad y números.

3. carrito.spec.js - Unitaria (lógica pura) - 7 pruebas - Cubre agregar, aumentar, fijar cantidad, eliminar al llegar a cero, quitar por código, contar unidades y calcular total con descuentos.

4. productosStore.spec.js - Datos y CRUD - 5 pruebas - Cubre crear, leer, actualizar y eliminar productos, y categorías únicas.

5. blogs.spec.js - Datos - 4 pruebas - Cubre búsqueda por slug, caso inexistente y completitud de los datos.

6. Boton.spec.js - Componente, props y eventos - 3 pruebas - Cubre etiqueta recibida como children, onClick y clase de variante.

7. Badge.spec.js - Componente - 2 pruebas - Cubre variante expuesta en data-variante y valor por defecto.

8. CampoFormulario.spec.js - Condicional y estado - 3 pruebas - Cubre error condicional y reflejo del valor escrito.

9. Toast.spec.js - Condicional y eventos - 3 pruebas - Cubre que no renderiza si visible es false, muestra el mensaje y ejecuta onClose.

10. ProductCard.spec.js - Componente y eventos - 5 pruebas - Cubre nombre, categoría y precio, badge de stock bajo, badge de oferta y onAgregar.

11. ProductGrid.spec.js - Renderizado de listas - 2 pruebas - Cubre una tarjeta por producto y mensaje de grilla vacía.

12. ItemCarrito.spec.js - Componente y estado - 3 pruebas - Cubre subtotal con descuento, onQuitar y onCambiarCantidad.

13. ResumenCarrito.spec.js - Componente y eventos - 2 pruebas - Cubre total y unidades formateadas, y onPagar.

14. RutaAdmin.spec.js - Guardia de rutas - 3 pruebas - Cubre redirección sin sesión, acceso restringido sin rol y acceso como Administrador.

Total: 62 pruebas.

## 7. Trazabilidad con la Rúbrica

La rúbrica propone cuatro tipos de pruebas; todos están cubiertos.

Pruebas de renderizado, renderizado correcto - Tarea pedida: componentes de lista que renderizan todos los elementos - Prueba que lo cumple: ProductGrid.spec.js, caso "renderiza una tarjeta por cada producto recibido".

Pruebas de renderizado, renderizado condicional - Tarea pedida: el mensaje de error solo se muestra si hay error - Prueba que lo cumple: CampoFormulario.spec.js, casos "no muestra el mensaje de error cuando no hay error" y "muestra el mensaje de error cuando se entrega uno".

Pruebas de propiedades (props) - Tarea pedida: un botón recibe etiqueta y onClick - Prueba que lo cumple: Boton.spec.js, casos "muestra la etiqueta recibida como children" y "ejecuta onClick al hacer clic".

Pruebas de estado (state) - Tarea pedida: el estado del formulario cambia al escribir - Prueba que lo cumple: CampoFormulario.spec.js, caso "refleja en el input el valor escrito por el usuario".

Pruebas de eventos - Tarea pedida: simular clic y comprobar reacción - Prueba que lo cumple: ProductCard.spec.js, caso "llama a onAgregar con el producto al presionar el botón".

## 8. Descripción Detallada de Dos Pruebas Representativas

### Prueba A - La tarjeta de producto entrega el producto al agregarlo

Archivo: test/ProductCard.spec.js
Caso: "llama a onAgregar con el producto al presionar el botón"
Tipo: prueba de componente e interacción de usuario.

Qué se quiere comprobar: que al hacer clic en el botón "Añadir al carrito" de una tarjeta, el componente invoque el callback onAgregar con el objeto producto completo. Esto valida el contrato entre ProductCard y quien la usa (Home, catálogo y detalle), que necesita saber exactamente qué producto se agregó.

Precondiciones (Arrange): se define un producto de ejemplo (BASE) con código, nombre, categoría, precio y stock. Se crea un espía con jasmine.createSpy('onAgregar'). El componente se renderiza dentro de un MemoryRouter porque ProductCard usa Link para enlazar al detalle.

```
const alAgregar = jasmine.createSpy('onAgregar')
render(
  <MemoryRouter>
    <ProductCard producto={BASE} onAgregar={alAgregar} />
  </MemoryRouter>,
)
```

Acción (Act): se simula el clic del usuario buscando el botón por su rol y nombre accesible.

```
fireEvent.click(screen.getByRole('button', { name: 'Añadir al carrito' }))
```

Resultado esperado (Assert): el espía debe haberse llamado exactamente con el producto BASE.

```
expect(alAgregar).toHaveBeenCalledWith(BASE)
```

Por qué es relevante: es el punto de entrada del flujo de compra. Si el callback recibe el producto incorrecto (o ninguno), el carrito se llenaría con datos erróneos aunque la interfaz se vea bien. La prueba cubre el render del botón, la accesibilidad del nombre y el paso correcto de props.

### Prueba B - El total del carrito aplica los descuentos del catálogo

Archivo: test/carrito.spec.js
Caso: "calcula el total aplicando los descuentos del catálogo"
Tipo: prueba unitaria de lógica pura (sin React).

Qué se quiere comprobar: que calcularTotal(items, productos) cruce el carrito con el catálogo, aplique el descuento de cada producto y multiplique por la cantidad, sumando todo correctamente.

Precondiciones (Arrange): un catálogo con dos productos (uno sin descuento y otro con 10 %) y un carrito con cantidades distintas.

```
const catalogo = [
  { codigo: 'JM001', precio: 10000, descuento: 0 },
  { codigo: 'MS001', precio: 10000, descuento: 10 },
]
const items = [
  { codigo: 'JM001', cantidad: 2 }, // 10000 * 2 = 20000
  { codigo: 'MS001', cantidad: 1 }, // 10000 * 0.9 * 1 = 9000
]
```

Acción (Act): se invoca la función pura con ambos arreglos.

```
const total = calcularTotal(items, catalogo)
```

Resultado esperado (Assert): el total debe ser la suma ponderada con descuentos, 20000 + 9000 = 29000.

```
expect(total).toBe(29000)
```

Por qué es relevante: el total es la cifra que el cliente paga. Un error en el cálculo (por ejemplo, ignorar el descuento o la cantidad) produce cobros incorrectos. Al ser lógica pura y determinista, la prueba es rápida, no depende del DOM ni de React y se ejecuta igual en cualquier entorno. Esta función calcularTotal es exactamente la que usan las páginas de carrito y checkout.

## 9. Análisis de Cobertura

### 9.1 Cobertura por capa

Utilidades puras (utils/) - Archivos cubiertos: formato.js, validaciones.js, carrito.js - Estado: cubiertas.

Capa de datos (data/) - Archivos cubiertos: productos.js, blogs.js (CRUD y consultas) - Estado: cubiertas.

Componentes (components/) - Archivos cubiertos: Boton, Badge, CampoFormulario, Toast, ProductCard, ProductGrid, ItemCarrito, ResumenCarrito y RutaAdmin - Estado: cubiertas.

Páginas (pages/) - Verificadas indirectamente a través de sus componentes y utilidades - Estado: parcial.

Contextos (context/) - Probados indirectamente mediante RutaAdmin y componentes - Estado: parcial.

### 9.2 Qué queda fuera del alcance actual

- Pruebas end-to-end del flujo completo de compra (Home, Carrito, Checkout, Compra exitosa).
- Pruebas de integración de los contextos CarritoContext y SesionContext de forma aislada.
- Medición formal de cobertura de líneas (por ejemplo, con Istanbul o nyc), que no está incluida en la configuración de Karma.

### 9.3 Fortalezas de la suite

- 62 pruebas, muy por encima del mínimo de 10 solicitado.
- Cubre los cuatro tipos exigidos por la rúbrica (renderizado, condicional, props, estado y eventos).
- Pruebas de lógica pura rápidas y deterministas.
- Suite independiente del navegador instalado (jsdom) y con localStorage limpio entre casos.
- Verificación real del CRUD y de la guardia de rutas.

## 10. Conclusión

La suite combina pruebas de lógica pura, de datos con CRUD y persistencia, y de componentes React con interacción de usuario, superando ampliamente el mínimo solicitado. Todas se ejecutan con un único comando (npm test) y finalizan con TOTAL: 62 SUCCESS, entregando evidencia objetiva del correcto funcionamiento del frontend de Level-Up Gamer.
