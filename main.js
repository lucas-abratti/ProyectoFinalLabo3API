const openMenu = document.querySelector(".openMenu");
const closeMenu = document.querySelector(".closeMenu");
const menu = document.querySelector(".menu");

openMenu.addEventListener("click", function () {
  menu.style.display = "flex";
});

closeMenu.addEventListener("click", function () {
  menu.style.display = "none";
});

let cards = document.getElementsByClassName("box");

window.addEventListener("load", () => {
  var url = "http://colormind.io/api/";
  var data = {
    model: "default",
    input: [[19, 19, 20], "N", "N", "N", "N"],
  };

  var http = new XMLHttpRequest();

  http.onreadystatechange = function () {
    if (http.readyState == 4 && http.status == 200) {
      var palette = JSON.parse(http.responseText).result;
      document.documentElement.style.setProperty(
        "--first-color",
        `rgb(${palette[0][0]},${palette[0][1]},${palette[0][2]})`
      );
      document.documentElement.style.setProperty(
        "--second-color",
        `rgb(${palette[1][0]},${palette[1][1]},${palette[1][2]})`
      );
      document.documentElement.style.setProperty(
        "--third-color",
        `rgb(${palette[2][0]},${palette[2][1]},${palette[2][2]})`
      );
      document.documentElement.style.setProperty(
        "--fourth-color",
        `rgb(${palette[3][0]},${palette[3][1]},${palette[3][2]})`
      );
      document.documentElement.style.setProperty(
        "--fifth-color",
        `rgb(${palette[4][0]},${palette[4][1]},${palette[4][2]})`
      );
    }
  };

  http.open("POST", url, true);
  http.send(JSON.stringify(data));

});

function getDrink(box) {
  var url = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      var drinkName = box.querySelector("h3");
      var drinkImg = box.querySelector(".card-img");
      const drinkIngredients = box.querySelector(".drink-ingredients");
      drinkName.innerText = data.drinks[0].strDrink;
      drinkImg.src = data.drinks[0].strDrinkThumb;
      console.log(data);
      for (let i = 1; i <= 15; i++) {
        if (data.drinks[0][`strIngredient${i}`] != null) {
          var ingredient = document.createElement("p");
          ingredient.innerText =
            data.drinks[0][`strIngredient${i}`] +
            " - " +
            data.drinks[0][`strMeasure${i}`];
          drinkIngredients.appendChild(ingredient);
        }
      }
    });
}

for (let i = 0; i < cards.length; i++) {
  getDrink(cards[i]);
}

function resetCards(){
  boxArea.innerHTML = "";
}

function addBlureffectToCards(cards){
  console.log("Adding blur effect");
  for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("mouseover", () => {blurOtherCards(i)})
    console.log("Adding mouseover");
    cards[i].addEventListener("mouseleave", () => {removeBlurOtherCards(i)})
    console.log("Adding mouseleave");
  }
  
  function blurOtherCards(hoveredCard){
    for (let i = 0; i < cards.length; i++) {
      if(i == hoveredCard) { continue; }
      cards[i].classList.add("blurred");
    }
  }
  
  function removeBlurOtherCards(hoveredCard){
    for (let i = 0; i < cards.length; i++) {
      if(i == hoveredCard) { continue; }
      cards[i].classList.remove("blurred");
    }
  }
}

window.addEventListener("load", () =>{
  let cards = addDrinks(10);
  addBlureffectToCards(cards);
})
