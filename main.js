const openMenu = document.querySelector('.openMenu');
const closeMenu = document.querySelector('.closeMenu');
const menu = document.querySelector('.menu');

const boxArea = document.querySelector('.box-area');
const drinksBtn = document.querySelector('#refresDrinksBtn');
const addDrinksBtn = document.querySelector('#addDrinksTot');
const removeDrinksBtn = document.querySelector('#removeDrinksTot');

let amountOfDrinks = 10;

openMenu.addEventListener("click", function() {
  menu.style.display = 'flex';
});

closeMenu.addEventListener("click", function() {
  menu.style.display = 'none';
});

drinksBtn.addEventListener("click", () => {
  resetCards();
  addBlureffectToCards(addDrinks(amountOfDrinks));
});

addDrinksBtn.addEventListener("click", () => {
  if(amountOfDrinks < 20){
    amountOfDrinks += 1;
  }
  drinksBtn.innerText = `Get ${amountOfDrinks} random drinks`;
});

removeDrinksBtn.addEventListener("click", () => {
  if(amountOfDrinks > 1){
    amountOfDrinks -= 1;
  }
  drinksBtn.innerText = `Get ${amountOfDrinks} random drinks`;
});

window.addEventListener("load", () =>{
  console.log("Fetching colors");

  let url = "http://colormind.io/api/";
  let data = {
    model : "default",
    input : [[ 19, 19, 20 ],"N","N","N","N"]
  }
  let http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    if(http.readyState == 4 && http.status == 200) {
      let palette = JSON.parse(http.responseText).result;
      document.documentElement.style.setProperty("--first-color", `rgb(${palette[0][0]},${palette[0][1]},${palette[0][2]})`);
      document.documentElement.style.setProperty("--second-color", `rgb(${palette[1][0]},${palette[1][1]},${palette[1][2]})`);
      document.documentElement.style.setProperty("--third-color", `rgb(${palette[2][0]},${palette[2][1]},${palette[2][2]})`);
      document.documentElement.style.setProperty("--fourth-color", `rgb(${palette[3][0]},${palette[3][1]},${palette[3][2]})`);
      document.documentElement.style.setProperty("--fifth-color", `rgb(${palette[4][0]},${palette[4][1]},${palette[4][2]})`);
      console.log("Colors fetched");
    }
  };

  http.open("POST", url, true);
  http.send(JSON.stringify(data));

});

function getDrink(box) {
  let url = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
  fetch(url)
  .then(response => response.json())
  .then(data =>{
    let drinkName = box.querySelector('h3');
    let drinkImg = box.querySelector('.card-img');
    const drinkIngredients = box.querySelector('.drink-ingredients');
    drinkName.innerText = data.drinks[0].strDrink;
    drinkImg.src = data.drinks[0].strDrinkThumb;
    for (let i = 1; i <= 15; i++) {
      if (data.drinks[0][`strIngredient${i}`] != null) {
        let ingredient = document.createElement('p');
        let amount = data.drinks[0][`strMeasure${i}`];
        ingredient.innerText = data.drinks[0][`strIngredient${i}`];
        if(amount != null){
          ingredient.innerText += " - " + data.drinks[0][`strMeasure${i}`]
        }
        drinkIngredients.appendChild(ingredient);
      }
    }
  })
}

function addDrinks(nDrinks){
  let cards = [];
  for(var i = 0; i < nDrinks; i++){
    let card = document.createElement("div");
    card.classList.add("box");
    card.innerHTML = `
    <img class="card-img" src="public/negroni.jpg" alt="imagen del Cocktail" />
    <div class="overlay">
    <h3></h3>
    <p class="drink-ingredients"></p>
    </div>`;
    cards.push(card);
    boxArea.appendChild(card);
    getDrink(cards[i]);
  }
  return cards;
}

function resetCards(){
  boxArea.innerHTML = "";
}

function addBlureffectToCards(cards){
  console.log("Adding blur effect");
  for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("mouseover", () => {blurOtherCards(i)})
    cards[i].addEventListener("mouseleave", () => {removeBlurOtherCards(i)})
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
