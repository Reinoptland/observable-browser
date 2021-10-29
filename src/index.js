function displayError() {
  const results = document.getElementById("results");
  results.innerText = "Oh no, something went wrong!";
}

function displayNotFound() {
  const results = document.getElementById("results");
  results.innerText = "no results, sorry!";
}

function displayLoading() {
  const results = document.getElementById("results");
  results.innerText = "loading";
}

function displayResults(data) {
  const results = document.getElementById("results");
  results.innerHTML = "";
  data.drinks.forEach((drink) => {
    const drinkElement = document.createElement("div");
    drinkElement.innerText = drink.strDrink;
    results.appendChild(drinkElement);
  });
}

const apiURL = "https://thecocktaildb.com/api/json/v1/1/search.php";

document.getElementById("search").addEventListener("keydown", async (event) => {
  displayLoading();
  try {
    const res = await fetch(`${apiURL}?s=${event.target.value}`);
    const data = await res.json();

    if (data.drinks) {
      displayResults(data);
    } else {
      displayNotFound();
    }
  } catch (err) {
    displayError();
  }
});
