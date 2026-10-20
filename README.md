level up gamer

migracion completa de la tienda level up gamer que originalmente era html css y javascript plano a una aplicacion react con vite. es responsiva con bootstrap 5 y esta organizada en componentes reutilizables. tiene una capa de datos simulada con crud y persistencia y pruebas unitarias con jasmine y karma.

1 stack tecnologico

react 19 para la interfaz vite 8 como servidor de desarrollo y build react router 7 para las rutas bootstrap 5.3 con tema oscuro mas css propio jasmine y karma para las pruebas usando karma-jsdom-launcher y karma-esbuild testing library react para probar componentes localStorage para guardar los datos con el prefijo levelup_

no se necesita google chrome porque karma corre sobre jsdom.

2 como ejecutar el proyecto

necesitas node 18 o superior.

npm install para instalar dependencias npm run dev para el servidor de desarrollo en el puerto 5173 de localhost npm run build para generar la version de produccion en dist npm run preview para ver la version compilada npm test para correr las pruebas una vez npm run test:watch para las pruebas en modo interactivo

3 estructura del proyecto

carpeta levelup-gamer con lo siguiente

index.html es el html raiz que monta root y carga main.jsx vite.config.mjs es la configuracion de vite karma.conf.js es la configuracion de las pruebas public tiene el favicon y las imagenes de productos en svg src tiene main.jsx como punto de entrada con providers y router src tiene App.jsx con la definicion de rutas src tiene index.css con el tema oscuro propio src components tiene los 14 componentes reutilizables src pages tiene las vistas publicas y dentro admin las del panel de administracion src context tiene el estado global de carrito sesion y notificaciones src hooks tiene el hook useAgregarProducto src data tiene la base de datos simulada y la persistencia src utils tiene funciones puras de formato validaciones y carrito test tiene las pruebas unitarias _legacy tiene el sitio original en html css y js como respaldo y no se usa

el sitio original quedo guardado en _legacy como referencia y la aplicacion activa es 100 % react.

4 componentes

son 14 en total y estan en src components

1 Navbar es la barra de navegacion responsiva con contador del carrito y sesion 2 Footer es el pie de pagina con enlaces rapidos 3 Boton es un boton reutilizable con variantes primario secundario peligro y neutro 4 Badge es una etiqueta pequena para oferta stock bajo y roles 5 CampoFormulario es un campo de formulario input textarea o select con label ayuda y error 6 Toast es una notificacion flotante condicional 7 ProductCard es la tarjeta de producto con precio ofertas stock y anadir al carrito 8 ProductGrid es la grilla responsiva de tarjetas con estado vacio 9 ItemCarrito es la fila del carrito con cantidad subtotal y quitar 10 ResumenCarrito es el panel de resumen con unidades total pago y vaciar 11 AdminLayout es el layout del panel de administracion 12 TablaAdmin es una tabla generica para el crud del administrador 13 CompraResultado es la vista de compra exitosa o fallida 14 RutaAdmin es la guardia que restringe el panel a cuentas de administrador

5 paginas y rutas

las rutas estan definidas en src App.jsx

la raiz es el home con destacados y ofertas productos es el catalogo con buscador filtros y ordenamiento productos con codigo es el detalle de un producto nosotros muestra mision vision e impacto comunitario blogs es el listado de noticias y articulos blogs con slug es el detalle de un articulo contacto es el formulario para enviar un mensaje a la tienda carrito es el carrito de compras checkout es el formulario de pago compra-exitosa muestra la compra aprobada compra-fallida muestra la compra rechazada login es el inicio de sesion y redirige al panel si la cuenta es administrador registro es el registro de usuario con validaciones perfil es el perfil del usuario admin es el dashboard del administrador y esta protegida admin productos es el crud de productos para listar crear editar y eliminar y esta protegida admin usuarios es el crud de usuarios y esta protegida

acceso al panel de administracion

el panel admin esta protegido por el componente RutaAdmin.

sin sesion redirige a login con un aviso de que se requiere una cuenta de administrador con sesion pero sin rol de administrador muestra acceso restringido con rol de administrador permite el acceso

solo se entra con una cuenta cuyo tipoUsuario sea Administrador.

6 capa de datos

persistencia.js lee y escribe en localStorage y tiene un bus de eventos para avisar los cambios coleccion.js tiene la fabrica crearColeccion que genera las operaciones crud listar obtener crear actualizar y eliminar sobre un arreglo persistido productos.js usuarios.js y regiones.js son las colecciones concretas con datos semilla que simulan una base de datos blogs.js tiene los articulos del blog con contenido por bloques y lo usan las vistas de blogs los componentes leen los datos en tiempo real con useSyncExternalStore asi que la interfaz se actualiza al instante despues de un crud del administrador

el carrito y la sesion tambien se guardan con las claves levelup_carrito y levelup_sesion.