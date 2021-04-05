// ELEMENTS
const btn = document.getElementById("getAJokeBtn");
const joke = document.getElementById("joke");
const img = document.querySelector("img");
img.src = "https://assets.chucknorris.host/img/avatar/chuck-norris.png";

// document.addEventListener("DOMContentLoaded", getJokeAPI);
btn.addEventListener("click", getJokeAPI);

// Get Joke API
function getJokeAPI() {
  const ajax = new XMLHttpRequest();
  ajax.open("GET", "https://api.chucknorris.io/jokes/random", true);

  ajax.onload = function () {
    if (this.status === 200) {
      const data = JSON.parse(this.responseText);
      console.log(data);
      joke.textContent = data.value;
    }
  };
  ajax.onerror = () => {
    console.log("there was an error");
  };

  ajax.send();
}
