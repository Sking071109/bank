# Home Challenge — NovaBank
**LevelUp Code Bootcamp · Misión 13 · M4L1**

---

## Tu misión

El frontend de NovaBank ya está terminado: el diseño, la navegación,
las tarjetas, el historial — todo funciona visualmente.

Lo que falta eres tú.

Abre `app.js` y busca los cuatro tickets marcados con 🎫.
Ahí está toda tu misión. El resto del archivo no lo toques.

---

## ¿Qué debes completar?

### 🎫 Ticket 1 — Clase `Cuenta`
Completa el constructor para que guarde las cinco propiedades
del titular usando `this`.

### 🎫 Ticket 2 — Clase `Transaccion`
Completa el constructor para que guarde el tipo y el monto,
y capture la fecha automáticamente con `new Date()`.

### 🎫 Ticket 3 — Función `depositar()`
Implementa la lógica paso a paso siguiendo los TODOs:
validar el monto, actualizar el saldo y registrar la transacción.

### 🎫 Ticket 4 — Función `retirar()`
Igual que depositar, pero con una validación extra:
verificar que haya saldo suficiente antes de operar.

---

## Cómo saber si lo hiciste bien

1. Al llenar el formulario de inicio y hacer clic en **Crear cuenta**,
   tu nombre, correo y saldo deben aparecer en el dashboard.
2. Al depositar un monto válido, el saldo sube y aparece una tarjeta
   verde en el historial.
3. Al retirar más de lo que tienes, aparece el mensaje de error
   y el saldo no cambia.
4. El historial muestra los movimientos del más reciente al más antiguo.

Si los cuatro puntos funcionan, los cuatro tickets están resueltos.

---

## Entrega

1. Repositorio en GitHub con los tres archivos (`index.html`, `style.css`, `app.js`).
2. Proyecto desplegado en GitHub Pages o Vercel.
3. README actualizado con tu nombre y una línea explicando
   qué fue lo más difícil de implementar.

---

## Completado por

**Samuel** — Lo que más cuesta al principio es entender cómo `this` hace referencia al objeto que estás creando. Una vez que lo asimila, todo lo demás fluye mucho más natural.

---

> 💡 **Hexa dice:** "Resuelve los tickets en orden.
> Si la Clase `Cuenta` no está bien, nada de lo demás va a funcionar —
> es la base sobre la que se construye todo lo demás."