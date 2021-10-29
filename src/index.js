import {
  fromEvent,
  debounceTime,
  switchMap,
  mergeMap,
  tap,
  catchError,
} from "rxjs";
import { fromFetch } from "rxjs/fetch";

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

const ONE_SECOND = 1000;
const apiURL = "https://thecocktaildb.com/api/json/v1/1/search.php";

const search = fromEvent(document.getElementById("search"), "keydown").pipe(
  tap(() => displayLoading()),
  debounceTime(ONE_SECOND),
  switchMap((event) => fromFetch(`${apiURL}?s=${event.target.value}`)),
  catchError(() => displayError()),
  mergeMap((res) => res.json()),
  tap((data) => (data.drinks ? displayResults(data) : displayNotFound()))
);

document.getElementById("search").addEventListener("focus", () => {
  const subscription = search.subscribe();
  document
    .getElementById("search")
    .addEventListener("blur", () => subscription.unsubscribe());
});
