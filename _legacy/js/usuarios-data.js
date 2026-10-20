/* ============================================================
   usuarios-data.js
   ------------------------------------------------------------
   Arreglo de usuarios de EJEMPLO para poblar el listado del panel
   de administrador (vista "Usuarios"). Al igual que
   productos-data.js, esto es un dato "hardcodeado" en JS propio
   de una entrega solo-frontend; en la evaluación con backend esto
   vendrá desde la base de datos.

   Los roles ("Administrador", "Vendedor", "Cliente") corresponden
   a los "Roles asociados al sistema" definidos en el anexo 1.
   ============================================================ */

const USUARIOS = [
  {
    run: "191234567",
    nombre: "Bastián",
    apellidos: "Riquelme Soto",
    correo: "bastian.riquelme@duoc.cl",
    tipoUsuario: "Administrador",
    region: "Región Metropolitana de Santiago",
    comuna: "Santiago",
  },
  {
    run: "178889990",
    nombre: "Camila",
    apellidos: "Fuentes Araya",
    correo: "camila.fuentes@gmail.com",
    tipoUsuario: "Vendedor",
    region: "Región de Valparaíso",
    comuna: "Viña del Mar",
  },
  {
    run: "205556667",
    nombre: "Matías",
    apellidos: "González Pardo",
    correo: "matias.gonzalez@profesor.duoc.cl",
    tipoUsuario: "Cliente",
    region: "Región del Biobío",
    comuna: "Concepción",
  },
];

function buscarUsuarioPorRun(run) {
  return USUARIOS.find((u) => u.run === run);
}
