/* ============================================================
   validaciones.js
   ------------------------------------------------------------
   Funciones de validación reutilizables para TODOS los
   formularios del sitio (registro, login, contacto, producto,
   usuario admin).

   Filosofía de diseño de este archivo:
   - Cada función de validación "atómica" (validarRequerido,
     validarLargo, validarCorreo, etc.) recibe un valor y devuelve
     un mensaje de error (string) o "" si está todo bien.
   - Cada formulario arma su propia función "validarFormularioX"
     combinando estas piezas atómicas, y usa un helper común
     (mostrarError / limpiarError) para pintar el mensaje en el
     campo correspondiente.
   - La validación ocurre en TIEMPO REAL (evento "input"/"blur" en
     cada campo) y también al enviar (evento "submit"), tal como
     pide el anexo: "validar formularios en tiempo real".
   ============================================================ */

/* -------------------- VALIDADORES ATÓMICOS -------------------- */

function validarRequerido(valor) {
  return valor.trim() === "" ? "Este campo es obligatorio." : "";
}

function validarLargoMaximo(valor, max) {
  return valor.length > max ? `Máximo ${max} caracteres.` : "";
}

function validarLargoMinimo(valor, min) {
  return valor.length < min ? `Mínimo ${min} caracteres.` : "";
}

function validarRangoLargo(valor, min, max) {
  if (valor.length < min || valor.length > max) {
    return `Debe tener entre ${min} y ${max} caracteres.`;
  }
  return "";
}

/* Solo acepta correos @duoc.cl, @profesor.duoc.cl o @gmail.com,
   tal como especifica el anexo 1 en todas las secciones de
   validación de correo. */
function validarCorreoInstitucional(valor) {
  const regex = /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;
  if (!regex.test(valor)) {
    return "Usa un correo @duoc.cl, @profesor.duoc.cl o @gmail.com.";
  }
  return "";
}

/* Valida formato general de un correo (para casos donde no se
   exige dominio institucional, si se llegara a necesitar). */
function validarFormatoCorreo(valor) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(valor) ? "" : "Ingresa un correo con formato válido.";
}

/* Valida que el usuario sea mayor de edad (18 años), requisito
   funcional de Level-Up Gamer (Forma B: "solo usuarios mayores de
   18 años"). Recibe la fecha como string "YYYY-MM-DD" (formato
   nativo de <input type="date">). */
function validarMayorDeEdad(fechaNacimiento) {
  if (!fechaNacimiento) return ""; // el campo es opcional según el anexo 1
  const hoy = new Date();
  const nacimiento = new Date(fechaNacimiento);
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const noHaCumplidoEsteAno =
    hoy.getMonth() < nacimiento.getMonth() ||
    (hoy.getMonth() === nacimiento.getMonth() && hoy.getDate() < nacimiento.getDate());
  if (noHaCumplidoEsteAno) edad--;

  return edad < 18 ? "Debes ser mayor de 18 años para registrarte." : "";
}

/* Valida el RUN chileno sin puntos ni guion (ej: 19011022K),
   incluyendo el dígito verificador con el algoritmo módulo 11.
   Regla del anexo 1: "Sin puntos ni guion", "Min: 7", "Max: 9". */
function validarRun(valor) {
  const run = valor.trim().toUpperCase();

  if (run.length < 7 || run.length > 9) {
    return "El RUN debe tener entre 7 y 9 caracteres, sin puntos ni guion.";
  }

  const cuerpo = run.slice(0, -1);
  const dv = run.slice(-1);

  if (!/^\d+$/.test(cuerpo)) {
    return "El cuerpo del RUN debe contener solo números.";
  }

  // Algoritmo de cálculo de dígito verificador (módulo 11)
  let suma = 0;
  let multiplicador = 2;
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo[i], 10) * multiplicador;
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
  }
  const resto = 11 - (suma % 11);
  let dvEsperado;
  if (resto === 11) dvEsperado = "0";
  else if (resto === 10) dvEsperado = "K";
  else dvEsperado = String(resto);

  if (dv !== dvEsperado) {
    return "El RUN ingresado no es válido (dígito verificador incorrecto).";
  }

  return "";
}

/* Valida un número dentro de un rango, con soporte opcional para
   exigir solo enteros (usado en stock, stock crítico). */
function validarNumero(valor, { min = null, max = null, soloEnteros = false } = {}) {
  if (valor === "") return "Este campo es obligatorio.";

  const numero = Number(valor);
  if (Number.isNaN(numero)) return "Debe ser un valor numérico.";

  if (soloEnteros && !Number.isInteger(numero)) {
    return "Debe ser un número entero.";
  }
  if (min !== null && numero < min) return `El valor mínimo permitido es ${min}.`;
  if (max !== null && numero > max) return `El valor máximo permitido es ${max}.`;

  return "";
}

/* -------------------- HELPERS DE UI -------------------- */

/* Muestra un mensaje de error bajo un campo. Se espera que el
   campo esté envuelto en un contenedor con clase "campo" que
   incluya un elemento .campo__mensaje para el texto. */
function mostrarError(input, mensaje) {
  const contenedor = input.closest(".campo");
  if (!contenedor) return;
  const spanMensaje = contenedor.querySelector(".campo__mensaje");

  contenedor.classList.add("campo--error");
  contenedor.classList.remove("campo--ok");
  if (spanMensaje) {
    spanMensaje.textContent = mensaje;
    spanMensaje.className = "campo__mensaje campo__mensaje--error";
  }
}

function mostrarExito(input, mensaje = "") {
  const contenedor = input.closest(".campo");
  if (!contenedor) return;
  const spanMensaje = contenedor.querySelector(".campo__mensaje");

  contenedor.classList.remove("campo--error");
  contenedor.classList.add("campo--ok");
  if (spanMensaje) {
    spanMensaje.textContent = mensaje;
    spanMensaje.className = "campo__mensaje campo__mensaje--ok";
  }
}

/* Ejecuta una función validadora sobre un input y actualiza la UI
   en consecuencia. Devuelve true si el campo es válido.
   "validador" es una función que recibe el valor y devuelve "" o
   un mensaje de error. */
function validarCampo(input, validador) {
  const mensaje = validador(input.value);
  if (mensaje) {
    mostrarError(input, mensaje);
    return false;
  }
  mostrarExito(input);
  return true;
}

/* Engancha la validación en tiempo real: se valida mientras el
   usuario escribe (input) y también al perder el foco (blur), que
   es el patrón estándar de UX para no "regañar" al usuario apenas
   toca el campo, pero sí mientras corrige. */
function validarEnTiempoReal(input, validador) {
  const evaluar = () => validarCampo(input, validador);
  input.addEventListener("input", evaluar);
  input.addEventListener("blur", evaluar);
}
