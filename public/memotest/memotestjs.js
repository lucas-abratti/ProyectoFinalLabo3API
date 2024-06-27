const openMenu = document.querySelector(".openMenu");
const closeMenu = document.querySelector(".closeMenu");
const menu = document.querySelector(".menu");

openMenu.addEventListener("click", function () {
  menu.style.display = "flex";
});

closeMenu.addEventListener("click", function () {
  menu.style.display = "none";
});

//API
let iconos = [];
let selecciones = [];
let movimientos = 0;
let cantidadTarjetas = 16;

let mostrarMovimientos = document.getElementById("movimientos");

generarTablero();

async function cargarIconos(){
  for(let i = 0; i < 8; i++){
    var url = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
    
    await fetch(url).then((response) => response.json())
    .then((data) => {
      let icono = `<img src="${data.drinks[0].strDrinkThumb}" alt="">`;
      console.log(icono);
      iconos.push(icono);
    });
  }
  return true;
}

async function generarTablero() {
  movimientos = 0;
  iconos = [];
  mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;
  await cargarIconos();
  selecciones = [];
  let tablero = document.getElementById("tablero");
  let tarjetas = [];
  for (let i = 0; i < 16; i++) {
    let index = i < iconos.length ? i : i - iconos.length
    console.log(index);
    tarjetas.push(`
      <div class="area-tarjeta" onclick="seleccionarTarjeta(${i})">
        <div class="tarjeta" id="tarjeta${i}">
          <div class="cara trasera" id="trasera${i}">
            ${iconos[index]}
          </div>
          <div class="cara superior">
            <img src="/public/memotestImg/question-solid.svg" alt="">
          </div>
        </div>
      </div>
    `);
  }
  tarjetas.sort(() => Math.random() - 0.5);
  tablero.innerHTML = tarjetas.join(" ");
}

function seleccionarTarjeta(i) {
  let tarjeta = document.getElementById("tarjeta" + i);
  if (tarjeta.style.transform != "rotateY(180deg)") {
    tarjeta.style.transform = "rotateY(180deg)";
    selecciones.push(i);
  }
  if (selecciones.length == 2) {
    movimientos++;
    mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;
    deseleccionar(selecciones);
    selecciones = [];
  }
}

function deseleccionar(selecciones) {
  setTimeout(() => {
    let trasera1 = document.getElementById("trasera" + selecciones[0]);
    let trasera2 = document.getElementById("trasera" + selecciones[1]);
    if (trasera1.innerHTML != trasera2.innerHTML) {
      let tarjeta1 = document.getElementById("tarjeta" + selecciones[0]);
      let tarjeta2 = document.getElementById("tarjeta" + selecciones[1]);
      tarjeta1.style.transform = "rotateY(0deg)";
      tarjeta2.style.transform = "rotateY(0deg)";
    } else {
      trasera1.style.background = "plum";
      trasera2.style.background = "plum";
    }

    if (verificarFin()) {
      swal.fire({
        title: `Felicitaciones has ganado!`,
        text: `Movimientos necesarios: ${movimientos}`,
        icon: `success`,
      });
    }
  }, 1000);
}

function verificarFin() {
  for (let i = 0; i < cantidadTarjetas; i++) {
    let trasera = document.getElementById("trasera" + i);
    if (trasera.style.background != "plum") {
      return false;
    }
  }
  return true;
}
