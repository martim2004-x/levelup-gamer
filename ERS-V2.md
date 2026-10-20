# Documento ERS V2 - Especificación de Requerimientos de Software

Proyecto: Level-Up Gamer - Tienda online de productos gamer
Asignatura: DSY1104 - Desarrollo de Software
Evaluación: Evaluación Parcial 2 (30%)
Versión del documento: V2 (actualizada)
Fecha: 2026

## 1. Introducción

### 1.1 Propósito

Este documento especifica los requerimientos funcionales y no funcionales del frontend de la tienda online Level-Up Gamer, desarrollado con React. Es la versión actualizada (V2) del ERS, e incorpora los nuevos flujos de navegación, el panel administrativo, la capa de datos simulada con persistencia y la estrategia de pruebas unitarias definidos para esta segunda entrega.

### 1.2 Alcance

El proyecto corresponde al frontend de una tienda de productos gamer. En esta entrega el sitio original en HTML, CSS y JavaScript fue migrado por completo a React, con:

- Componentes reutilizables con responsabilidad única.
- Vistas públicas de la tienda (catálogo, carrito, checkout, blogs, contacto, etc.).
- Vistas del panel de administración con CRUD de productos y usuarios.
- Capa de datos simulada en JavaScript con persistencia en localStorage.
- Pruebas unitarias con Jasmine y Karma.

No incluye backend real: la autenticación y la pasarela de pago son simuladas, y los datos viven en el navegador del usuario.

### 1.3 Glosario

Cliente - Persona que navega la tienda y compra productos.
Administrador - Usuario con tipoUsuario = 'Administrador', único con acceso al panel.
Vendedor - Rol de usuario intermedio, sin acceso al panel administrativo en esta entrega.
CRUD - Crear, Leer, Actualizar, Eliminar.
Store - Colección de datos con operaciones CRUD y notificación de cambios.
Seed - Datos iniciales de ejemplo que simulan la base de datos.

## 2. Requerimientos Funcionales

### 2.1 Tienda pública

RF-01 - Inicio (Home) - Mostrar hero de bienvenida, 4 productos destacados y hasta 4 productos en oferta. - Prioridad alta.

RF-02 - Catálogo de productos - Listar todos los productos con búsqueda por texto, filtro por categoría, filtro de ofertas y ordenamiento. - Prioridad alta.

RF-03 - Detalle de producto - Mostrar ficha completa de un producto (/productos/:codigo): imagen, categoría, precio, descuento, stock y descripción. - Prioridad alta.

RF-04 - Carrito de compras - Agregar productos, editar cantidades, eliminar ítems, ver total y unidades. Debe persistir entre recargas. - Prioridad alta.

RF-05 - Checkout - Formulario de datos de envío (nombre, correo, dirección, región, comuna) y confirmación de pago. - Prioridad alta.

RF-06 - Compra exitosa - Mostrar resumen de la orden (número, fecha, cliente, entrega, artículos y total) cuando el pago es aprobado, y luego vaciar el carrito. - Prioridad alta.

RF-07 - Compra fallida - Mostrar aviso de pago rechazado con su motivo y permitir reintentar. - Prioridad alta.

RF-08 - Precarga de datos - Si hay sesión iniciada, el checkout debe precargar nombre, correo y dirección automáticamente. - Prioridad alta.

RF-09 - Nosotros - Página informativa de la tienda. - Prioridad media.

RF-10 - Blogs - Listado de artículos y vista de detalle por slug, con contenido por bloques (párrafos y listas). - Prioridad media.

RF-11 - Contacto - Formulario de contacto con validaciones y mensaje de confirmación. - Prioridad media.

RF-12 - Registro - Registro de usuario con validaciones de RUN (módulo 11), mayoría de edad, correo y contraseña. - Prioridad media.

RF-13 - Login - Inicio de sesión simulado contra la base local; redirige al panel si es Administrador o al perfil si no lo es. - Prioridad alta.

RF-14 - Perfil - Ver y editar nombre, correo y dirección del usuario; cerrar sesión. - Prioridad media.

RF-15 - Página 404 - Mostrar vista "no encontrado" ante rutas inexistentes. - Prioridad baja.

### 2.2 Panel de administración

RF-16 - Acceso restringido - El panel solo es accesible para cuentas con tipoUsuario = 'Administrador'. - Prioridad alta.

RF-17 - Dashboard - Mostrar métricas del negocio (totales de productos, stock, usuarios y ofertas). - Prioridad media.

RF-18 - CRUD de productos - Listar, crear, editar y eliminar productos, con validación de campos. - Prioridad alta.

RF-19 - CRUD de usuarios - Listar, crear, editar y eliminar usuarios, con validación de RUN, correo y tipo de usuario. - Prioridad alta.

RF-20 - Actualización en tiempo real - Los cambios del administrador deben reflejarse de inmediato en la tienda pública, sin recargar la página. - Prioridad alta.

### 2.3 Capa de datos

RF-21 - Datos simulados - Los datos (productos, usuarios, blogs, regiones) deben provenir de archivos JavaScript que actúen como base de datos simulada. - Prioridad alta.

RF-22 - Operaciones CRUD - Debe existir una fábrica genérica de colecciones con listar, obtener, crear, actualizar y eliminar. - Prioridad alta.

RF-23 - Persistencia - Los datos modificados deben persistir en localStorage. - Prioridad alta.

RF-24 - Notificación de cambios - Al modificar una colección, los componentes suscritos deben actualizarse automáticamente. - Prioridad alta.

## 3. Requerimientos No Funcionales

RNF-01 - Responsividad - El diseño debe adaptarse a móvil, tablet y escritorio usando el sistema de grillas de Bootstrap 5.3.

RNF-02 - Reutilización - Cada componente debe tener una única responsabilidad y recibir datos y funciones por props.

RNF-03 - Mantenibilidad - El código debe organizarse por capas (componentes, páginas, contextos, datos, utilidades).

RNF-04 - Usabilidad - Mensajes de error claros, notificaciones flotantes (Toast) y confirmaciones antes de acciones destructivas.

RNF-05 - Rendimiento - Cálculos derivados memoizados (useMemo, useCallback) y datos leídos con useSyncExternalStore.

RNF-06 - Accesibilidad básica - Uso de aria-label, role="alert", label asociado a cada campo y alt en imágenes.

RNF-07 - Compatibilidad de pruebas - Las pruebas deben ejecutarse sin depender de Google Chrome (runner sobre jsdom).

RNF-08 - Portabilidad - El proyecto debe ejecutarse con Node.js 18 o superior mediante npm install y npm run dev.

## 4. Herramientas y Stack Tecnológico

React 19 - Construcción de la interfaz mediante componentes.

Vite 8 - Servidor de desarrollo, compilación y build de producción.

React Router DOM 7 - Enrutamiento de las vistas (SPA).

Bootstrap 5.3 - Grillas responsivas, componentes y utilidades de estilo.

CSS propio - Tema oscuro de marca, tarjetas y clases propias (btn-marca, etc.).

Jasmine 5 - Framework de aserciones (describe, it, expect, espías).

Karma 6 - Runner de pruebas.

karma-jsdom-launcher 22 - Ejecuta las pruebas en un DOM simulado (sin navegador real).

karma-esbuild 2 - Compila JSX y ESM para que Karma ejecute los specs de React.

@testing-library/react 16 - Renderizado de componentes y simulación de interacción.

localStorage - Persistencia de datos, carrito y sesión (prefijo levelup_).

Justificación de jsdom: el equipo dispone únicamente de Microsoft Edge, por lo que se optó por un DOM simulado que hace la suite más rápida y portable.

## 5. Arquitectura del Sistema

### 5.1 Organización por capas

src/
- main.jsx - Punto de entrada, providers y router.
- App.jsx - Definición de rutas.
- index.css - Estilos propios.
- components/ - 14 componentes reutilizables de UI.
- pages/ - Vistas públicas.
- pages/admin/ - Vistas del panel de administración.
- context/ - Estado global (carrito, sesión, notificaciones).
- hooks/ - Hooks personalizados.
- data/ - Base de datos simulada y persistencia.
- utils/ - Funciones puras (formato, validaciones, carrito).

### 5.2 Diagrama de capas

```
main.jsx (Providers)
        .
        v
App.jsx (Rutas)
        .
        v
pages/ ---usan---> components/
   .                    .
   v                    v
context/            data/
(estado)          (CRUD y store)
   .                    .
   v                    v
utils/ (logica pura, sin React)
```

### 5.3 Flujo de navegación

```
Home ---> Productos ---> Detalle de producto
  .
  +---> Carrito ---> Checkout ---+---> Compra exitosa
  .                              +---> Compra fallida ---> Carrito
  .
  +---> Nosotros
  +---> Blogs ---> Detalle de blog
  +---> Contacto
  +---> Login ---> Perfil
  +---> Registro
  +---> /admin (protegido) ---> Dashboard / Productos / Usuarios
                               +---> Formularios de alta y edición
```

## 6. Modelo de Datos

### 6.1 Producto

codigo - Identificador único (ej. MS001). Clave primaria.
categoria - Categoría del producto.
nombre - Nombre comercial.
precio - Precio en pesos chilenos.
stock - Unidades disponibles.
stockCritico - Umbral para mostrar alerta de stock bajo.
descuento - Porcentaje de descuento (0 a 100).
imagen - Ruta de la imagen.
descripcion - Descripción del producto.

### 6.2 Usuario

run - Identificador único. Clave primaria.
nombre - Nombre del usuario.
apellidos - Apellidos del usuario.
correo - Correo (dominios permitidos).
tipoUsuario - Administrador, Vendedor o Cliente.
region - Región de despacho.
comuna - Comuna de despacho.
direccion - Dirección de despacho.

### 6.3 Blog

slug - Identificador único para la URL.
titulo - Titular del artículo.
resumen - Bajada del artículo.
imagen - Ruta de la imagen.
imagenAlt - Texto alternativo de la imagen.
bloques - Contenido por bloques (parrafo o lista).
enlaceProducto - Producto relacionado (opcional).

### 6.4 Claves de persistencia en localStorage

levelup_productos-v2 - Colección de productos.
levelup_usuarios - Colección de usuarios.
levelup_carrito - Ítems del carrito.
levelup_sesion - Sesión activa (o ausente si no hay login).

## 7. Propuesta de Vistas y Rutas

/ - Home (destacados y ofertas) - Acceso público.
/productos - Catálogo con búsqueda y filtros - Acceso público.
/productos/:codigo - Detalle de producto - Acceso público.
/carrito - Carrito de compras - Acceso público.
/checkout - Paso de pago - Acceso público.
/compra-exitosa - Confirmación de compra - Acceso público.
/compra-fallida - Pago rechazado - Acceso público.
/nosotros - Información de la tienda - Acceso público.
/blogs - Listado de artículos - Acceso público.
/blogs/:slug - Detalle de artículo - Acceso público.
/contacto - Formulario de contacto - Acceso público.
/login - Inicio de sesión - Acceso público.
/registro - Registro de usuario - Acceso público.
/perfil - Perfil del usuario - Requiere sesión.
/admin - Dashboard administrativo - Solo Administrador.
/admin/productos - CRUD de productos - Solo Administrador.
/admin/productos/nuevo - Crear producto - Solo Administrador.
/admin/productos/:codigo/editar - Editar producto - Solo Administrador.
/admin/usuarios - CRUD de usuarios - Solo Administrador.
/admin/usuarios/nuevo - Crear usuario - Solo Administrador.
/admin/usuarios/:run/editar - Editar usuario - Solo Administrador.
Ruta no encontrada - Página 404 - Acceso público.

## 8. Componentes Reutilizables

1. Navbar - Barra de navegación responsiva con contador del carrito y sesión.
2. Footer - Pie de página con enlaces rápidos.
3. Boton - Botón reutilizable con variantes (primario, secundario, peligro, neutro).
4. Badge - Etiqueta pequeña para ofertas, stock bajo y roles.
5. CampoFormulario - Campo de formulario (input, textarea o select) con label, ayuda y error.
6. Toast - Notificación flotante condicional.
7. ProductCard - Tarjeta de producto con precio, oferta, stock y acción de agregar.
8. ProductGrid - Grilla responsiva de tarjetas con estado vacío.
9. ItemCarrito - Fila del carrito con cantidad, subtotal y quitar.
10. ResumenCarrito - Panel de resumen con unidades, total y acción de pago.
11. AdminLayout - Estructura del panel (barra lateral y contenido).
12. TablaAdmin - Tabla genérica para el CRUD administrativo.
13. CompraResultado - Vista compartida de compra exitosa o fallida.
14. RutaAdmin - Guardia que restringe el panel a administradores.

## 9. Reglas de Validación

Campo requerido - No puede estar vacío (sin contar espacios).
Largo máximo y mínimo - Respeta el límite configurado por campo.
Rango de largo - Exige un mínimo y un máximo.
Correo institucional - Dominios permitidos: @duoc.cl, @profesor.duoc.cl, @gmail.com, @hotmail.com.
RUN chileno - Algoritmo módulo 11 (dígito verificador).
Mayoría de edad - Al menos 18 años; rechaza fechas futuras.
Contraseña - Entre 4 y 10 caracteres.
Números - Rango permitido y opción de exigir enteros.

## 10. Estrategia de Pruebas

Se utiliza Jasmine como framework de aserciones y Karma como runner, ejecutando los specs sobre jsdom. La suite cubre:

1. Pruebas de renderizado - componentes que muestran los datos recibidos y componentes de lista que renderizan todos los elementos.
2. Renderizado condicional - elementos que aparecen o se ocultan según props y estado (por ejemplo, el mensaje de error).
3. Pruebas de propiedades (props) - verificación de que los componentes reciben y usan las props (etiqueta y onClick de un botón).
4. Pruebas de estado - la lógica de cambio de estado (un input controlado que refleja lo escrito).
5. Pruebas de eventos - simulación de clics y escritura que disparan callbacks.
6. Pruebas de lógica pura y datos/CRUD - formato, validaciones, carrito y operaciones CRUD.

Resultado actual: 62 pruebas unitarias distribuidas en 14 archivos de especificación, con TOTAL: 62 SUCCESS.

El detalle completo se encuentra en el documento "Documento de cobertura del testing" (TESTING.md).

## 11. Instalación y Ejecución

Requisitos: Node.js 18 o superior.

```
npm install      # Instala las dependencias
npm run dev      # Servidor de desarrollo en http://localhost:5173
npm run build    # Genera la versión de producción en dist/
npm run preview  # Sirve la versión compilada
npm test         # Ejecuta las pruebas unitarias (Jasmine + Karma)
```

Cuenta de administrador de prueba: bastian.riquelme@duoc.cl

## 12. Recursos Gráficos

Las imágenes de producto, portada, secciones y blog provienen de Wikimedia Commons y Wikipedia, cuyo contenido es de licencia libre y reutilizable citando la fuente.

Imágenes de productos - 11 archivos - public/img/productos/
Imagen de portada (Home) - 1 archivo - public/img/general/hero-home.jpg
Imagen de Nosotros - 1 archivo - public/img/general/nosotros.jpg
Imágenes de blog - 2 archivos - public/img/blog/
Logotipo - 1 archivo - public/img/general/logo.png

## 13. Control de Versiones y Entrega

Migración - El sitio original en HTML, CSS y JS se conserva en _legacy/ como respaldo y referencia. La aplicación activa es 100 % React.
Repositorio - Enlace GitHub público del proyecto frontend.
Entrega - Proyecto comprimido, documento ERS V2 y documento de cobertura del testing.

## 14. Historial de Cambios

V1 - Sitio estático en HTML, CSS y JavaScript.
V2 - Migración completa a React y Vite; componentes reutilizables; capa de datos con CRUD y persistencia; nuevas vistas (detalle de producto, checkout, compra exitosa y fallida, panel de administración); pruebas unitarias con Jasmine y Karma; diseño responsivo con Bootstrap.
