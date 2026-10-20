Documento de pruebas y cobertura · Level-Up Gamer

Este documento describe la estrategia de pruebas unitarias del proyecto Level-Up Gamer (React + Vite) y detalla dos de sus pruebas mas representativas. 

1. Objetivo

Verificar que la logica de negocio (formato validaciones y carrito) la capa de datos con CRUD + persistencia y los componentes de React funcionan como se espera de forma aislada repetible y automatica.

Cobertura minima solicitada: 10 pruebas unitarias. Este proyecto entrega 62 pruebas unitarias distribuidas en 14 archivos de especificacion.

2. Herramientas

Jasmine es el framework de aserciones (describe it expect espias). Karma es el runner que ejecuta los specs y reporta resultados. karma-jsdom-launcher ejecuta las pruebas en un DOM simulado (jsdom) sin necesidad de Chrome. karma-esbuild compila JSX/ESM con esbuild para que Karma pueda ejecutar los specs de React. @testing-library/react renderiza componentes y simula interaccion de usuario (render screen fireEvent).

Se eligio jsdom en lugar de un navegador real porque el equipo solo dispone de Microsoft Edge y jsdom hace la suite mas rapida y portable.

3. Como ejecutar las pruebas

npm test # una sola corrida (usada para la evaluacion) npm run test:watch # modo interactivo durante el desarrollo

Salida esperada:

TOTAL: 62 SUCCESS

karma.conf.js carga primero test/setup.js (configuracion comun) y luego todos los archivos test//*.spec.js. Antes de cada prueba se limpia localStorage para garantizar independencia entre casos.

4. Tipos de pruebas incluidas

Logica pura (unitaria): funciones sin React (formato validaciones carrito). Capa de datos / CRUD: creacion lectura actualizacion y eliminacion con persistencia. Renderizado de componentes: que el componente muestre los datos correctos. Renderizado condicional: elementos que aparecen o desaparecen segun props/estado. Interaccion de usuario: clics y escritura que disparan callbacks (fireEvent). Estado controlado: que un input refleje el valor escrito por el usuario. Guardia de rutas: que el panel de administracion no sea accesible sin el rol adecuado.

5. Resumen de cobertura

test/formato.spec.js es unitaria con 7 pruebas. Verifica formatearCLP precioConDescuento estaEnOferta normalizarTexto.

test/validaciones.spec.js es unitaria con 13 pruebas. Verifica campos requeridos largos correo institucional RUN (modulo 11) mayoria de edad numeros.

test/carrito.spec.js es unitaria con 7 pruebas. Verifica agregar actualizar quitar contar unidades y calcular total con descuentos.

test/productosStore.spec.js es de datos/CRUD con 5 pruebas. Verifica crear leer actualizar eliminar productos y listar categorias unicas.

test/Boton.spec.js es de componente con 3 pruebas. Verifica render de etiqueta onClick y clase de variante.

test/Badge.spec.js es de componente con 2 pruebas. Verifica variante expuesta en data-variante y valor por defecto.

test/Toast.spec.js es condicional con 3 pruebas. Verifica que no renderiza si visible=false muestra mensaje y cierra con onClose.

test/CampoFormulario.spec.js es de estado con 3 pruebas. Verifica error condicional y actualizacion del valor del input.

test/ProductCard.spec.js es de componente con 5 pruebas. Verifica nombre/categoria/precio badge de stock bajo oferta y onAgregar.

test/ProductGrid.spec.js es de componente con 2 pruebas. Verifica N tarjetas y estado de grilla vacia.

test/ResumenCarrito.spec.js es de componente con 2 pruebas. Verifica total y unidades formateadas y onPagar.

test/ItemCarrito.spec.js es de componente con 3 pruebas. Verifica subtotal con descuento onQuitar y onCambiarCantidad.

test/blogs.spec.js es de datos con 4 pruebas. Verifica obtenerBlog por slug null si no existe y datos completos del blog.

test/RutaAdmin.spec.js es de componente/guardia con 3 pruebas. Verifica redireccion sin sesion acceso restringido y acceso como Administrador.

Total de 62 pruebas.

6. Descripcion detallada de 2 pruebas
Prueba A — La tarjeta de producto avisa del producto al agregarlo

Archivo: test/ProductCard.spec.js Caso: "llama a onAgregar con el producto al presionar el boton" Tipo: prueba de componente + interaccion de usuario.

¿Que se quiere comprobar? Que al hacer clic en el boton “Anadir al carrito” de una tarjeta de producto el componente invoque el callback onAgregar con el objeto producto completo como argumento. Esto valida el contrato entre ProductCard y quien la usa (Home catalogo y detalle) que necesita saber exactamente que producto se agrego.

Precondiciones (Arrange). Se define un producto de ejemplo (BASE) con codigo: 'MS001' nombre categoria precio y stock. Se crea un espia con jasmine.createSpy('onAgregar') para observar la llamada. El componente se renderiza dentro de un MemoryRouter porque ProductCard usa <Link> para enlazar al detalle:

const alAgregar = jasmine.createSpy('onAgregar') render( <MemoryRouter> <ProductCard producto={BASE} onAgregar={alAgregar} /> </MemoryRouter> )

Accion (Act). Se simula el clic del usuario en el boton buscandolo por su rol y texto accesible:

fireEvent.click(screen.getByRole('button' { name: 'Anadir al carrito' }))

Resultado esperado (Assert). El espia debe haberse llamado exactamente con el producto BASE:

expect(alAgregar).toHaveBeenCalledWith(BASE)

¿Por que es relevante? Es el punto de entrada del flujo de compra: si el callback recibe el producto incorrecto (o ninguno) el carrito se llenaria con datos erroneos aunque la interfaz se vea bien. La prueba cubre de una sola vez el render del boton la accesibilidad del nombre accesible y el paso correcto de props.

Prueba B — El total del carrito aplica los descuentos del catalogo

Archivo: test/carrito.spec.js Caso: "calcula el total aplicando los descuentos del catalogo" Tipo: prueba unitaria de logica pura (sin React).

 se quiere comprobar Que calcularTotal(items productos) cruce el carrito con el catalogo aplique el descuento de cada producto y multiplique por la cantidad sumando todo correctamente.

Precondiciones (Arrange). Se prepara un catalogo con dos productos uno sin descuento y otro con 10 % y un carrito con cantidades distintas:

const catalogo = [ { codigo: 'JM001' precio: 10000 descuento: 0 } { codigo: 'MS001' precio: 10000 descuento: 10 } ] const items = [ { codigo: 'JM001' cantidad: 2 } // 10000 * 2 = 20000 { codigo: 'MS001' cantidad: 1 } // 10000 * 0.9 * 1 = 9000 ]

Accion (Act). Se invoca la funcion pura con ambos arreglos:

const total = calcularTotal(items catalogo)

Resultado esperado (Assert). El total debe ser la suma ponderada con descuentos: 20000 + 9000 = 29000.

expect(total).toBe(29000)

¿Por que es relevante? El total es la cifra que el cliente paga. Un error en el calculo (por ejemplo ignorar el descuento o la cantidad) produce cobros incorrectos. Al ser logica pura y determinista la prueba es rapida no depende del DOM ni de React y se ejecuta igual en cualquier entorno. Esta funcion calcularTotal es exactamente la que usan las paginas de carrito y checkout.

7. Conclusion

La suite combina pruebas de logica pura de datos/CRUD con persistencia y de componentes React con interaccion, Todas se ejecutan con el comando npm test y finalizan con 62 SUCCESS.