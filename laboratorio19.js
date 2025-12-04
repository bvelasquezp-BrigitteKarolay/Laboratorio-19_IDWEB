/* Autora: Brigitte Karolay Velasquez Puma*/

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

/* EJERCICIO 3 */
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

/* EJERCICIO 4 */
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

/* EJERCICIO 7 */
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
      data.results.forEach(r => names.push(r.name));
      console.log("NOMBRES 20:", names);
      out.textContent = names.join("\n");
    })
    .catch(err => mostrarError(out, err.message));
});

/* EJERCICIO 8 */
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

/* EJERCICIO 9 */
document.getElementById("btn-ej9").addEventListener("click", async function () {
  const container = document.getElementById("card-ej9");
  container.innerHTML = "";
  const q = (document.getElementById("inp-ej9").value || "").trim().toLowerCase();
  if (!q) { container.textContent = "Ingrese nombre o id"; return; }
  try {
    const res = await fetch(API_BASE + encodeURIComponent(q));
    if (!res.ok) throw new Error("Pokemon no encontrado (codigo " + res.status + ")");
    const data = await res.json();

    const div = document.createElement("div");
    div.className = "card";
    const img = document.createElement("img");
    img.src = data.sprites?.front_default || "";
    img.alt = data.name;
    const title = document.createElement("div");
    title.innerHTML = "<strong>" + data.name + "</strong> (ID: " + data.id + ")";
    const dims = document.createElement("div");
    dims.textContent = "Altura: " + data.height + " - Peso: " + data.weight;
    const abilities = document.createElement("div");
    abilities.textContent = "Habilidades: " + data.abilities.map(a => a.ability.name).join(", ");
    div.appendChild(img);
    div.appendChild(title);
    div.appendChild(dims);
    div.appendChild(abilities);
    container.appendChild(div);
  } catch (err) {
    container.textContent = "ERROR: " + err.message;
  }
});

/* EJERCICIO 10 */
document.getElementById("btn-ej10").addEventListener("click", async function () {
  const container = document.getElementById("cards-1-10");
  container.innerHTML = "";
  try {
   
    const promises = [];
    for (let i = 1; i <= 10; i++) promises.push(fetch(API_BASE + i).then(r => r.json()));
    const results = await Promise.all(promises);
    results.forEach(p => {
      const c = crearCardSimple(p);
      container.appendChild(c);
    });
  } catch (err) {
    container.textContent = "ERROR: " + err.message;
  }
});

/* EJERCICIO 11 */
document.getElementById("btn-ej11").addEventListener("click", async function () {
  const out = document.getElementById("out-ej11");
  out.textContent = "CARGANDO...";
  const q = (document.getElementById("inp-ej11").value || "").trim().toLowerCase();
  if (!q) { out.textContent = "Ingrese nombre o id"; return; }
  try {
    const res = await fetch(API_BASE + encodeURIComponent(q));
    if (!res.ok) throw new Error("Pokemon no encontrado");
    const data = await res.json();
    const tipos = data.types.map(t => t.type.name);
    const texto = "Nombre: " + data.name + " | Tipos: " + tipos.join(", ");
    console.log(texto);
    out.textContent = texto;
  } catch (err) {
    mostrarError(out, err.message);
  }
});

/* EJERCICIO 12 */
document.getElementById("btn-ej12").addEventListener("click", async function () {
  const container = document.getElementById("out-ej12");
  container.innerHTML = "";
  const q = (document.getElementById("inp-ej12").value || "").trim().toLowerCase();
  if (!q) { container.textContent = "Ingrese nombre o id"; return; }
  try {
    const res = await fetch(API_BASE + encodeURIComponent(q));
    if (!res.ok) throw new Error("Pokemon no encontrado");
    const data = await res.json();
    const ul = document.createElement("ul");
   
    const wanted = ["hp", "attack", "defense", "speed", "special-attack", "special-defense"];
    data.stats.forEach(s => {
      if (wanted.includes(s.stat.name)) {
        const li = document.createElement("li");
        li.textContent = s.stat.name + ": " + s.base_stat;
        ul.appendChild(li);
      }
    });
    container.appendChild(ul);
  } catch (err) {
    container.textContent = "ERROR: " + err.message;
  }
});

/* EJERCICIO 13 */
document.getElementById("btn-ej13").addEventListener("click", async function () {
  const container = document.getElementById("out-ej13");
  container.innerHTML = "";
  const q = (document.getElementById("inp-ej13").value || "").trim().toLowerCase();
  if (!q) { container.textContent = "Ingrese nombre o id"; return; }
  try {
    const res = await fetch(API_BASE + encodeURIComponent(q));
    if (!res.ok) throw new Error("Pokemon no encontrado");
    const data = await res.json();
    const table = document.createElement("table");
    table.className = "stats";
    const thead = document.createElement("thead");
    thead.innerHTML = "<tr><th>Estadistica</th><th>Valor</th></tr>";
    table.appendChild(thead);
    const tbody = document.createElement("tbody");
    data.stats.forEach(s => {
      const tr = document.createElement("tr");
      tr.innerHTML = "<td>" + s.stat.name + "</td><td>" + s.base_stat + "</td>";
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    container.appendChild(table);
  } catch (err) {
    container.textContent = "ERROR: " + err.message;
  }
});

/* EJERCICIO 14 */
let lista12 = []; 
let pageIndex = 0; 
const PER_PAGE = 3;

document.getElementById("btn-load-12").addEventListener("click", async function () {
  const cards = document.getElementById("cards-12");
  cards.innerHTML = "";
  document.getElementById("page-info").textContent = "";
  document.getElementById("pager-area").textContent = "CARGANDO 1..12...";
  try {
    const prom = [];
    for (let i = 1; i <= 12; i++) prom.push(fetch(API_BASE + i).then(r => r.json()));
    lista12 = await Promise.all(prom);
    pageIndex = 0;
    document.getElementById("pager-area").textContent = "CARGADOS 12 POKEMON";
    renderPage12();
  } catch (err) {
    document.getElementById("pager-area").textContent = "ERROR: " + err.message;
  }
});

function renderPage12() {
  const cards = document.getElementById("cards-12");
  cards.innerHTML = "";
  if (!lista12 || lista12.length === 0) { document.getElementById("page-info").textContent = ""; return; }
  const start = pageIndex * PER_PAGE;
  const slice = lista12.slice(start, start + PER_PAGE);
  slice.forEach(p => cards.appendChild(crearCardSimple(p)));
  const pageNum = pageIndex + 1;
  const totalPages = Math.ceil(lista12.length / PER_PAGE);
  document.getElementById("page-info").textContent = "Pagina " + pageNum + " / " + totalPages;
}


document.getElementById("btn-prev").addEventListener("click", function () {
  if (!lista12 || lista12.length === 0) return;
  if (pageIndex > 0) {
    pageIndex--;
    renderPage12();
  }
});
document.getElementById("btn-next").addEventListener("click", function () {
  if (!lista12 || lista12.length === 0) return;
  const maxIndex = Math.ceil(lista12.length / PER_PAGE) - 1;
  if (pageIndex < maxIndex) {
    pageIndex++;
    renderPage12();
  }
});
