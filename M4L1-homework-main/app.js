/* ============================================================
   NOVABANK — LOGICA PRINCIPAL
   Modulo: M4L1 — Programacion Orientada a Objetos
   Tu misión: completar las clases y las funciones marcadas con TODO.
   No toques nada fuera de las zonas marcadas.
============================================================ */


// ==============================================================
// 🎫 TICKET 1 — CLASE: Cuenta
// Representa la cuenta bancaria del usuario.
//
// Propiedades que debe recibir el constructor (en este orden):
//   - titular      (string): nombre completo del titular
//   - numeroCuenta (string): identificador de la cuenta
//   - saldo        (number): dinero disponible al abrir la cuenta
//   - tipo         (string): "Ahorros" o "Corriente"
//   - correo       (string): correo electronico del titular
//
// Recuerda: dentro del constructor, "this" hace referencia
// al objeto que se está creando en ese momento.
// ==============================================================

class Cuenta {
  constructor(titular, numeroCuenta, saldo, tipo, correo) {

    // TODO — guarda cada parámetro como propiedad de esta instancia
    // Pista: this.titular = titular; … repite el patrón para las demás
    this.titular = titular;
    this.numeroCuenta = numeroCuenta;
    this.saldo = saldo;
    this.tipo = tipo;
    this.correo = correo;
  }
}


// ==============================================================
// 🎫 TICKET 2 — CLASE: Transaccion
// Representa un movimiento individual (deposito o retiro).
//
// Propiedades que debe recibir el constructor:
//   - tipo  (string): "Deposito" o "Retiro"
//   - monto (number): cantidad de dinero de la operacion
//
// La fecha NO la recibe por parámetro — se captura sola así:
//   this.fecha = new Date();
// ==============================================================

class Transaccion {
  constructor(tipo, monto) {

    // TODO — guarda tipo y monto con this
    // TODO — captura la fecha automáticamente con: this.fecha = new Date();
    this.tipo = tipo;
    this.monto = monto;
    this.fecha = new Date();
  }
}


// ==============================================================
// DATOS GLOBALES — ya listos, no los toques
// ==============================================================

let miCuenta = null;
let historial = [];


// ==============================================================
// 🎫 TICKET 3 — FUNCION: depositar
// Agrega dinero al saldo de la cuenta y registra el movimiento.
//
// Parámetros:
//   - cuenta (Cuenta): la instancia de cuenta a modificar
//   - monto  (number): la cantidad a depositar
// ==============================================================

function depositar(cuenta, monto) {

  // TODO — Paso 1: valida que el monto sea mayor a 0 y sea un número.
  // Si no cumple, llama a mostrarAlerta("El monto debe ser un valor positivo.", "error") y usa return.
  // Pista: isNaN(monto) te dice si un valor NO es un número.
  if (isNaN(monto) || monto <= 0) {
    mostrarAlerta("El monto debe ser un valor positivo.", "error");
    return;
  }

  // TODO — Paso 2: suma el monto al saldo de la cuenta.
  // Pista: modifica cuenta.saldo directamente.
  cuenta.saldo += monto;

  // TODO — Paso 3: crea una nueva instancia de Transaccion y guárdala en el array historial.
  // Pista: let nueva = new Transaccion("Deposito", monto);
  //        historial.push(nueva);
  let nueva = new Transaccion("Deposito", monto);
  historial.push(nueva);


  // ✅ Ya dado — actualiza la interfaz (no lo toques)
  actualizarSaldoDOM(cuenta.saldo);
  obtenerHistorial();
  mostrarAlerta("Deposito realizado con exito.", "exito");
}


// ==============================================================
// 🎫 TICKET 4 — FUNCION: retirar
// Deduce dinero del saldo de la cuenta y registra el movimiento.
//
// Parámetros:
//   - cuenta (Cuenta): la instancia de cuenta a modificar
//   - monto  (number): la cantidad a retirar
// ==============================================================

function retirar(cuenta, monto) {

  // TODO — Paso 1: valida que el monto sea mayor a 0 y sea un número.
  // (mismo patrón que en depositar)
  if (isNaN(monto) || monto <= 0) {
    mostrarAlerta("El monto debe ser un valor positivo.", "error");
    return;
  }

  // TODO — Paso 2: valida que el saldo de la cuenta sea suficiente.
  // Si monto > cuenta.saldo, llama a mostrarAlerta("Saldo insuficiente para realizar el retiro.", "error") y usa return.
  if (monto > cuenta.saldo) {
    mostrarAlerta("Saldo insuficiente para realizar el retiro.", "error");
    return;
  }

  // TODO — Paso 3: resta el monto del saldo de la cuenta.
  cuenta.saldo -= monto;

  // TODO — Paso 4: crea una nueva instancia de Transaccion con tipo "Retiro" y guárdala en historial.
  let nueva = new Transaccion("Retiro", monto);
  historial.push(nueva);


  // ✅ Ya dado — actualiza la interfaz (no lo toques)
  actualizarSaldoDOM(cuenta.saldo);
  obtenerHistorial();
  mostrarAlerta("Retiro realizado con exito.", "exito");
}


// ==============================================================
// ✅ TODO LO DE ABAJO YA ESTÁ RESUELTO — no lo modifiques
// ==============================================================

function obtenerHistorial() {
  const contenedor    = document.getElementById("historial-container");
  const estadoVacio   = document.getElementById("empty-state");
  const contadorBadge = document.getElementById("transaction-count");

  if (historial.length === 0) {
    estadoVacio.style.display = "flex";
    contadorBadge.textContent = "0 movimientos";
    return;
  }

  estadoVacio.style.display = "none";

  let total = historial.length;
  contadorBadge.textContent = total === 1 ? "1 movimiento" : total + " movimientos";

  contenedor.innerHTML = "";

  for (let i = historial.length - 1; i >= 0; i--) {
    let t = historial[i];

    let esDeposito = t.tipo === "Deposito";
    let claseCSS   = esDeposito ? "deposito" : "retiro";
    let iconoClass = esDeposito ? "bi-arrow-down-circle-fill" : "bi-arrow-up-circle-fill";
    let signo      = esDeposito ? "+" : "-";

    let fechaFormateada = t.fecha.toLocaleString("es-ES", {
      day:    "2-digit",
      month:  "short",
      year:   "numeric",
      hour:   "2-digit",
      minute: "2-digit"
    });

    let montoFormateado = formatearMoneda(t.monto);

    let tarjeta = document.createElement("div");
    tarjeta.className = "transaction-card";
    tarjeta.innerHTML = `
      <div class="transaction-icon ${claseCSS}">
        <i class="bi ${iconoClass}"></i>
      </div>
      <div class="transaction-info">
        <div class="transaction-type">${t.tipo}</div>
        <div class="transaction-date">
          <i class="bi bi-calendar3 me-1"></i>${fechaFormateada}
        </div>
      </div>
      <div class="transaction-amount ${claseCSS}">
        ${signo}${montoFormateado}
      </div>
    `;

    contenedor.appendChild(tarjeta);
  }
}

function renderizarCuenta(cuenta) {
  let palabras  = cuenta.titular.trim().split(" ");
  let iniciales = palabras.length >= 2
    ? palabras[0][0] + palabras[1][0]
    : palabras[0][0];

  document.getElementById("user-avatar").textContent    = iniciales.toUpperCase();
  document.getElementById("user-name").textContent      = cuenta.titular;
  document.getElementById("user-email").textContent     = cuenta.correo;
  document.getElementById("titular-cuenta").textContent = cuenta.titular.toUpperCase();
  document.getElementById("numero-cuenta").textContent  = cuenta.numeroCuenta;
  document.getElementById("tipo-cuenta").textContent    = cuenta.tipo;
  document.getElementById("saldo-cuenta").textContent   = formatearMoneda(cuenta.saldo);
}

function actualizarSaldoDOM(nuevoSaldo) {
  let elementoSaldo = document.getElementById("saldo-cuenta");
  elementoSaldo.textContent = formatearMoneda(nuevoSaldo);
  elementoSaldo.classList.remove("updated");
  void elementoSaldo.offsetWidth;
  elementoSaldo.classList.add("updated");
}

function mostrarAlerta(mensaje, tipo) {
  let contenedor = document.getElementById("alerta-container");
  let claseCSS   = tipo === "exito" ? "alert-success-custom" : "alert-danger-custom";
  let icono      = tipo === "exito" ? "bi-check-circle-fill" : "bi-exclamation-triangle-fill";

  contenedor.innerHTML = `
    <div class="alert-custom ${claseCSS} p-3">
      <i class="bi ${icono} me-2"></i>${mensaje}
    </div>
  `;

  setTimeout(function () {
    contenedor.innerHTML = "";
  }, 3000);
}

function formatearMoneda(valor) {
  return "$" + valor.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function ejecutarDeposito() {
  let input = document.getElementById("monto-deposito");
  let monto = parseFloat(input.value);
  depositar(miCuenta, monto);
  input.value = "";
}

function ejecutarRetiro() {
  let input = document.getElementById("monto-retiro");
  let monto = parseFloat(input.value);
  retirar(miCuenta, monto);
  input.value = "";
}

function cambiarMonto(idInput, delta) {
  let input      = document.getElementById(idInput);
  let valorActual = parseFloat(input.value) || 0;
  let nuevoValor  = valorActual + delta;
  input.value = nuevoValor < 0 ? 0 : nuevoValor;
}

function iniciarSesion(evento) {
  evento.preventDefault();

  let titular = document.getElementById("input-titular").value.trim();
  let correo  = document.getElementById("input-correo").value.trim();
  let numero  = document.getElementById("input-numero").value.trim();
  let saldo   = parseFloat(document.getElementById("input-saldo").value);
  let tipo    = document.querySelector("input[name='tipo-cuenta']:checked").value;

  let hayErrores = false;
  limpiarErroresLogin();

  if (titular === "") {
    mostrarErrorLogin("input-titular", "error-titular", "El nombre del titular es obligatorio.");
    hayErrores = true;
  }
  if (correo === "" || !correo.includes("@")) {
    mostrarErrorLogin("input-correo", "error-correo", "Ingresa un correo electronico valido.");
    hayErrores = true;
  }
  if (numero === "") {
    mostrarErrorLogin("input-numero", "error-numero", "El numero de cuenta es obligatorio.");
    hayErrores = true;
  }
  if (isNaN(saldo) || saldo < 0) {
    mostrarErrorLogin("input-saldo", "error-saldo", "El saldo inicial debe ser un numero positivo.");
    hayErrores = true;
  }

  if (hayErrores) return;

  // Aquí es donde tu Clase Cuenta entra en acción:
  // "new" llama al constructor y "this" asigna cada propiedad.
  miCuenta = new Cuenta(titular, numero, saldo, tipo, correo);

  let pantallaLogin = document.getElementById("pantalla-login");
  pantallaLogin.classList.add("fade-out");

  setTimeout(function () {
    pantallaLogin.style.display = "none";
    document.getElementById("app-navbar").style.display = "block";
    document.getElementById("app-main").style.display   = "block";
    document.getElementById("app-footer").style.display = "block";
    renderizarCuenta(miCuenta);
    obtenerHistorial();
  }, 480);
}

function cerrarSesion() {
  miCuenta = null;
  historial.length = 0;

  document.getElementById("app-navbar").style.display = "none";
  document.getElementById("app-main").style.display   = "none";
  document.getElementById("app-footer").style.display = "none";

  document.getElementById("form-login").reset();
  limpiarErroresLogin();

  let pantallaLogin = document.getElementById("pantalla-login");
  pantallaLogin.classList.remove("fade-out");
  pantallaLogin.style.display = "flex";
}

function mostrarErrorLogin(idInput, idMensaje, texto) {
  document.getElementById(idInput).classList.add("input-error");
  document.getElementById(idMensaje).textContent = texto;
}

function limpiarErroresLogin() {
  let inputs  = ["input-titular", "input-correo", "input-numero", "input-saldo"];
  let errores = ["error-titular", "error-correo", "error-numero", "error-saldo"];

  for (let i = 0; i < inputs.length; i++) {
    document.getElementById(inputs[i]).classList.remove("input-error");
    document.getElementById(errores[i]).textContent = "";
  }
}

document.getElementById("form-login").addEventListener("submit", iniciarSesion);