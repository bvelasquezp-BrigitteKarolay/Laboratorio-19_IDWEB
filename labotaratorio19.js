const API_BASE = "https://pokeapi.co/api/v2/pokemon/";

function crearCardSimple(poke) {
  const div = document.createElement("div");
  div.className = "card";
  const img = document.createElement("img");
  img.src = poke.sprites?.front_default || "";
  img.alt = poke.name || "";
  const name = document.createElement("div");
  name.textContent = poke.name + " (ID: " + poke.id + ")";
  div.appendChild(img);
  div.appendChild(name);
  return div;
}

function mostrarError(elem, msg) {
  if (!elem) return;
  elem.textContent = "ERROR: " + msg;
}

/* EJERCICIO 3*/
document.getElementById("btn-ej3").addEventListener("click", function () {
  const out = document.getElementById("out-ej3");
  out.textContent = "CARGANDO...";
  const id = Number(document.getElementById("inp-ej3").value);
  if (!id || id < 1) { out.textContent = "Ingrese un ID valido (numero entero > 0)"; return; }
  fetch(API_BASE + id)
    .then(res => {
      if (!res.ok) throw new Error("Pokemon no encontrado (codigo " + res.status + ")");
      return res.json();
    })
    .then(data => {
      console.log("NAME:", data.name);
      out.textContent = "NAME: " + data.name;
    })
    .catch(err => mostrarError(out, err.message));
});

/* EJERCICIO 4*/
document.getElementById("btn-ej4").addEventListener("click", function () {
  const out = document.getElementById("out-ej4");
  out.textContent = "CARGANDO...";
  fetch(API_BASE + "pikachu")
    .then(res => {
      if (!res.ok) throw new Error("Error HTTP: " + res.status);
      return res.json();
    })
    .then(data => {
      const texto = "Altura: " + data.height + " - Peso: " + data.weight;
      console.log(texto);
      out.textContent = texto;
    })
    .catch(err => mostrarError(out, err.message));
});

/* EJERCICIO 5 */
document.getElementById("btn-ej5").addEventListener("click", async function () {
  const out = document.getElementById("out-ej5");
  out.textContent = "CARGANDO...";
  try {
    const res = await fetch(API_BASE + "pikachu");
    if (!res.ok) throw new Error("Error HTTP: " + res.status);
    const data = await res.json();
    const texto = "Altura: " + data.height + " - Peso: " + data.weight;
    console.log(texto);
    out.textContent = texto;
  } catch (err) {
    mostrarError(out, err.message);
  }
});

/* EJERCICIO 6 */
document.getElementById("btn-ej6").addEventListener("click", function () {
  const out = document.getElementById("out-ej6");
  out.textContent = "CARGANDO...";
  fetch(API_BASE + "charizard")
    .then(res => {
      if (!res.ok) throw new Error("Error HTTP: " + res.status);
      return res.json();
    })
    .then(data => {
      const url = data.sprites?.front_default || "No disponible";
      console.log("URL sprite:", url);
      out.textContent = url;
    })
    .catch(err => mostrarError(out, err.message));
});

/* EJERCICIO 7*/
document.getElementById("btn-ej7").addEventListener("click", function () {
  const out = document.getElementById("out-ej7");
  out.textContent = "CARGANDO...";
  fetch("https://pokeapi.co/api/v2/pokemon?limit=20")
    .then(res => {
      if (!res.ok) throw new Error("Error HTTP: " + res.status);
      return res.json();
    })
    .then(data => {
      const names = [];
      // forEach pedido por enunciado
      data.results.forEach(r => names.push(r.name));
      console.log("NOMBRES 20:", names);
      out.textContent = names.join("\n");
    })
    .catch(err => mostrarError(out, err.message));
});

/* EJERCICIO 8*/
document.getElementById("btn-ej8").addEventListener("click", async function () {
  const out = document.getElementById("out-ej8");
  out.textContent = "CARGANDO...";
  try {
    const id = Math.floor(Math.random() * 898) + 1;
    const res = await fetch(API_BASE + id);
    if (!res.ok) throw new Error("Error HTTP: " + res.status);
    const data = await res.json();
    const texto = "Aleatorio ID " + data.id + " - " + data.name;
    console.log(texto);
    out.textContent = texto;
  } catch (err) {
    mostrarError(out, err.message);
  }
});

