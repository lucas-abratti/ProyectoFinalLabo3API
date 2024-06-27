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
let cards = document.getElementsByClassName("box");

function getDrink(box) {
  var url = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      var drinkImg = box.querySelector(".card-img");
      drinkImg.src = data.drinks[0].strDrinkThumb;
    });
}

for (let i = 0; i < cards.length; i++) {
  getDrink(cards[i]);
}

let iconos = [];
let selecciones = [];
let movimientos = 0;
let cantidadTarjetas = 16;

let mostrarMovimientos = document.getElementById("movimientos");

generarTablero();

function cargarIconos() {
  iconos = [
    '<img src="public/memotestImg/1.jpg" alt="">',
    '<img src="public/memotestImg/2.jpg" alt="">',
    '<img src="public/memotestImg/3.jpg" alt="">',
    '<img src="public/memotestImg/4.jpg" alt="">',
    '<img src="public/memotestImg/5.jpg" alt="">',
    '<img src="public/memotestImg/6.jpg" alt="">',
    '<img src="public/memotestImg/7.jpg" alt="">',
    '<img src="public/memotestImg/8.jpg" alt="">',
  ];
}

function generarTablero() {
  movimientos = 0;
  mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;
  cargarIconos();
  selecciones = [];
  let tablero = document.getElementById("tablero");
  let tarjetas = [];
  for (let i = 0; i < cantidadTarjetas; i++) {
    tarjetas.push(`
      <div class="area-tarjeta" onclick="seleccionarTarjeta(${i})">
        <div class="tarjeta" id="tarjeta${i}">
          <div class="cara trasera" id="trasera${i}">
            ${iconos[0]}
          </div>
          <div class="cara superior">
            <img src="public/memotestImg/question-solid.svg" alt="">
          </div>
        </div>
      </div>
      `);

    if (i % 2 == 1) {
      iconos.splice(0, 1);
    }
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
